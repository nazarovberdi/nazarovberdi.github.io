/**
 * Paint reveal for the hero name. CSS sketches the name as an outline before the
 * app starts (see `.paint-name` in main.css); this paints it in by hand: a quick
 * orange underpainting, loose brush strokes, then a palette knife for the last
 * gaps. Strokes land at random, always aimed at what is still bare.
 *
 * A canvas sits behind each line, inside the span the Line mask raises, so the
 * paint rises with the text. Once the letters are covered, `onSettle` lets the
 * real text fill in over the paint, and the canvases are removed.
 */

interface Options {
  /** An element inside a line whose letters are painted in the accent colour. */
  accentSelector?: string
  /** Called once, when the real text should take over (also on early stop). */
  onSettle: () => void
}

interface Stroke {
  born: number
  color: string
  counts: boolean
  marked?: boolean
  done?: boolean
  /** Drawn on every frame until done, then committed to the paint. */
  draw?: (ctx: CanvasRenderingContext2D) => void
  step: (now: number) => void
}

interface Line {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  sx: number
  sy: number
}

const UNDERPAINT_MS = 650
const UNDERPAINT_EVERY_MS = 22
const STROKE_EVERY_MS = 34
const MAX_MS = 3600
const SETTLE_MS = 520
/** Share of the letters left bare when the painter switches from brush to knife. */
const KNIFE_FROM = 0.4
/** Share left bare when the painting counts as finished. */
const DONE_AT = 0.035

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)
const easeOut = (t: number) => 1 - (1 - t) ** 3

function surface(w: number, h: number) {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  return { canvas, ctx: canvas.getContext('2d')! }
}

export function paintName(root: HTMLElement, { accentSelector, onSettle }: Options): () => void {
  let settled = false
  const settle = () => {
    if (settled) return
    settled = true
    onSettle()
  }

  const spans = [...root.querySelectorAll<HTMLElement>(':scope > .line > span')]
  if (!spans.length || root.getBoundingClientRect().bottom < 0) {
    settle()
    return () => {}
  }

  const dpr = Math.min(2, window.devicePixelRatio || 1)
  const style = getComputedStyle(root)
  const fontSize = parseFloat(style.fontSize)
  const fs = fontSize * dpr
  const font = `${style.fontWeight} ${fs}px ${style.fontFamily}`
  const letterSpacing = `${(parseFloat(style.letterSpacing) || 0) * dpr}px`
  const bleed = Math.ceil(fontSize * 0.2)
  const W = Math.round((root.offsetWidth + 2 * bleed) * dpr)
  const H = Math.round((root.offsetHeight + 2 * bleed) * dpr)

  const page = getComputedStyle(document.documentElement)
  const colors = {
    ink: page.getPropertyValue('--page-text').trim(),
    underpaint: page.getPropertyValue('--accent').trim(),
    accent: page.getPropertyValue('--accent-bright').trim(),
  }

  // Masks in the shared space (the h1 plus bleed): every letter, the accent
  // letters, and the rest.
  const full = surface(W, H)
  const ink = surface(W, H)
  const accent = surface(W, H)
  let hasAccent = false
  for (const s of [full, ink, accent]) {
    s.ctx.font = font
    s.ctx.letterSpacing = letterSpacing
    s.ctx.fillStyle = '#fff'
  }

  const lines: Line[] = spans.map((span) => {
    const probe = document.createElement('span')
    probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'
    span.append(probe)
    const baseline = probe.offsetTop
    probe.remove()

    const text = span.textContent ?? ''
    const x = (bleed + span.offsetLeft) * dpr
    const y = (bleed + span.offsetTop + baseline) * dpr
    full.ctx.fillText(text, x, y)
    ink.ctx.fillText(text, x, y)

    const accentEl = accentSelector ? span.querySelector(accentSelector) : null
    if (accentEl) {
      hasAccent = true
      const before = document.createRange()
      before.setStart(span, 0)
      before.setEndBefore(accentEl)
      const prefix = before.toString()
      accent.ctx.fillText(prefix + accentEl.textContent, x, y)
      accent.ctx.globalCompositeOperation = 'destination-out'
      accent.ctx.fillText(prefix, x, y)
      accent.ctx.globalCompositeOperation = 'source-over'
    }

    const cw = span.offsetWidth + 2 * bleed
    const ch = span.offsetHeight + 2 * bleed
    const { canvas, ctx } = surface(Math.round(cw * dpr), Math.round(ch * dpr))
    canvas.setAttribute('aria-hidden', 'true')
    canvas.className = 'paint-canvas'
    canvas.style.cssText = `left:${-bleed}px;top:${-bleed}px;width:${cw}px;height:${ch}px`
    span.append(canvas)
    return {
      canvas,
      ctx,
      sx: Math.round(span.offsetLeft * dpr),
      sy: Math.round(span.offsetTop * dpr),
    }
  })

  ink.ctx.globalCompositeOperation = 'destination-out'
  ink.ctx.drawImage(accent.canvas, 0, 0)

  // Coverage grid: which cells are letter, and how much paint each has taken.
  const g = Math.max(4, fs * 0.05)
  const cols = Math.ceil(W / g)
  const rows = Math.ceil(H / g)
  const cov = new Float32Array(cols * rows)
  const cells: number[] = []
  const alpha = full.ctx.getImageData(0, 0, W, H).data
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = Math.min(W - 1, Math.floor((c + 0.5) * g))
      const y = Math.min(H - 1, Math.floor((r + 0.5) * g))
      if (alpha[(y * W + x) * 4 + 3]! > 100) cells.push(r * cols + c)
    }
  }
  let open = cells

  const mark = (x: number, y: number, radius: number, amount: number) => {
    const c0 = Math.max(0, Math.floor((x - radius) / g))
    const c1 = Math.min(cols - 1, Math.floor((x + radius) / g))
    const r0 = Math.max(0, Math.floor((y - radius) / g))
    const r1 = Math.min(rows - 1, Math.floor((y + radius) / g))
    for (let c = c0; c <= c1; c++) {
      for (let r = r0; r <= r1; r++) {
        if (Math.hypot((c + 0.5) * g - x, (r + 0.5) * g - y) <= radius) cov[r * cols + c]! += amount
      }
    }
  }

  const paint = surface(W, H)
  const layer = surface(W, H)
  const layerAccent = surface(W, H)

  /** A round bristle brush along a curve, drawn into the paint as it travels. */
  function brush(cx: number, cy: number): Stroke {
    const angle = rand(0, Math.PI * 2)
    const len = fs * rand(0.3, 0.75)
    const width = fs * rand(0.09, 0.17)
    const bend = rand(-0.35, 0.35) * len
    const dur = rand(150, 260)
    const ux = Math.cos(angle)
    const uy = Math.sin(angle)
    const p0x = cx - (ux * len) / 2,
      p0y = cy - (uy * len) / 2
    const p2x = cx + (ux * len) / 2,
      p2y = cy + (uy * len) / 2
    const p1x = cx - uy * bend,
      p1y = cy + ux * bend
    const at = (t: number) => {
      const a = (1 - t) ** 2,
        b = 2 * (1 - t) * t,
        c = t * t
      const dx = 2 * (1 - t) * (p1x - p0x) + 2 * t * (p2x - p1x)
      const dy = 2 * (1 - t) * (p1y - p0y) + 2 * t * (p2y - p1y)
      const n = Math.hypot(dx, dy) || 1
      return [a * p0x + b * p1x + c * p2x, a * p0y + b * p1y + c * p2y, -dy / n, dx / n] as const
    }
    const count = 12
    const bristles = Array.from({ length: count }, (_, k) => {
      const u = (k / (count - 1)) * 2 - 1
      const edge = Math.abs(u)
      return {
        off: (u * width) / 2 + rand(-1, 1) * width * 0.04,
        t0: rand(0, 0.1) + edge * rand(0, 0.2),
        t1: 1 - rand(0, 0.08) - edge * rand(0, 0.28),
        alpha: (Math.random() < 0.1 ? 0.12 : rand(0.6, 0.95)) * (1 - edge * 0.35),
        lineWidth: (width / count) * rand(1.3, 2.3),
        phase: rand(0, 6),
        freq: rand(4, 10),
      }
    })
    let prev = 0
    return {
      born: 0,
      color: '',
      counts: false,
      step(now) {
        if (this.counts && !this.marked) {
          this.marked = true
          for (let t = 0; t <= 1; t += 0.08) {
            const [x, y] = at(t)
            mark(x, y, width * 0.42, 0.8)
          }
        }
        const k = easeInOut(Math.min(1, (now - this.born) / dur))
        const ctx = paint.ctx
        ctx.strokeStyle = this.color
        ctx.lineCap = 'butt'
        for (const b of bristles) {
          const from = Math.max(prev, b.t0)
          const to = Math.min(k, b.t1)
          if (to <= from) continue
          // The brush runs dry towards the end of the stroke.
          ctx.globalAlpha = b.alpha * (1 - 0.35 * ((from + to) / 2))
          ctx.lineWidth = b.lineWidth
          ctx.beginPath()
          for (let t = from; ; t = Math.min(to, t + 0.02)) {
            const [x, y, nx, ny] = at(t)
            const off = b.off + Math.sin(t * b.freq + b.phase) * width * 0.03
            if (t === from) ctx.moveTo(x + nx * off, y + ny * off)
            else ctx.lineTo(x + nx * off, y + ny * off)
            if (t >= to) break
          }
          ctx.stroke()
        }
        ctx.globalAlpha = 1
        prev = k
        this.done = k >= 1
      },
    }
  }

  /** A palette-knife slab: sweeps in, then sets with a ridge and scrapes the paint below. */
  function knife(cx: number, cy: number): Stroke {
    const angle = rand(0, Math.PI * 2)
    const len = fs * rand(0.3, 0.6)
    const width = fs * rand(0.12, 0.22)
    const skew = rand(-0.25, 0.25) * width
    const dur = rand(170, 250)
    const ux = Math.cos(angle),
      uy = Math.sin(angle)
    const nx = -uy,
      ny = ux
    const hw = width / 2
    let k = 0
    const slab = (ctx: CanvasRenderingContext2D, progress: number, color: string) => {
      const s0 = -len / 2
      const s1 = s0 + len * progress
      const pt = (s: number, w: number) => [cx + ux * s + nx * w, cy + uy * s + ny * w] as const
      const corners = [pt(s0, -hw), pt(s0, hw), pt(s1 + skew, hw), pt(s1 - skew, -hw)]
      ctx.fillStyle = ctx.strokeStyle = color
      ctx.globalAlpha = 0.9
      ctx.beginPath()
      corners.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
      ctx.closePath()
      ctx.fill()
      // The ridge of paint the blade pushes ahead of it.
      ctx.globalAlpha = 1
      ctx.lineWidth = width * 0.07
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(...corners[2]!)
      ctx.lineTo(...corners[3]!)
      ctx.stroke()
    }
    return {
      born: 0,
      color: '',
      counts: false,
      draw(ctx) {
        slab(ctx, k, this.color)
      },
      step(now) {
        if (this.counts && !this.marked) {
          this.marked = true
          for (let t = -0.5; t <= 0.5; t += 0.1)
            mark(cx + ux * len * t, cy + uy * len * t, hw * 0.9, 0.85)
        }
        k = easeOut(Math.min(1, (now - this.born) / dur))
        if (k < 1) return
        const ctx = paint.ctx
        slab(ctx, 1, this.color)
        ctx.globalCompositeOperation = 'destination-out'
        ctx.lineCap = 'round'
        const scrapes = 3 + Math.floor(Math.random() * 4)
        for (let i = 0; i < scrapes; i++) {
          const off = rand(-hw * 0.85, hw * 0.85)
          const a = rand(-0.45, -0.1),
            b = rand(0.1, 0.45)
          ctx.globalAlpha = rand(0.2, 0.5)
          ctx.lineWidth = rand(0.6, 2.2) * dpr
          ctx.beginPath()
          ctx.moveTo(cx + ux * len * a + nx * off, cy + uy * len * a + ny * off)
          ctx.lineTo(cx + ux * len * b + nx * off, cy + uy * len * b + ny * off)
          ctx.stroke()
        }
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1
        this.done = true
      },
    }
  }

  function spawn(now: number, underpainting: boolean) {
    if (!underpainting) open = cells.filter((i) => cov[i]! < 0.9)
    const pool = open.length ? open : cells
    const i = pool[Math.floor(Math.random() * pool.length)]!
    const x = ((i % cols) + Math.random()) * g
    const y = (Math.floor(i / cols) + Math.random()) * g
    const stroke =
      !underpainting && open.length / cells.length <= KNIFE_FROM ? knife(x, y) : brush(x, y)
    stroke.color = underpainting ? colors.underpaint : colors.ink
    stroke.counts = !underpainting
    stroke.born = now
    stroke.step(now)
    active.push(stroke)
  }

  function render() {
    const L = layer.ctx
    L.globalCompositeOperation = 'source-over'
    L.clearRect(0, 0, W, H)
    L.drawImage(paint.canvas, 0, 0)
    for (const s of active) s.draw?.(L)
    if (hasAccent) {
      // The accent letters take the same paint, recoloured.
      const A = layerAccent.ctx
      A.globalCompositeOperation = 'source-over'
      A.clearRect(0, 0, W, H)
      A.drawImage(layer.canvas, 0, 0)
      A.globalCompositeOperation = 'destination-in'
      A.drawImage(accent.canvas, 0, 0)
      A.globalCompositeOperation = 'source-in'
      A.fillStyle = colors.accent
      A.fillRect(0, 0, W, H)
    }
    L.globalCompositeOperation = 'destination-in'
    L.drawImage(ink.canvas, 0, 0)
    for (const line of lines) {
      const { canvas, ctx, sx, sy } = line
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(
        layer.canvas,
        sx,
        sy,
        canvas.width,
        canvas.height,
        0,
        0,
        canvas.width,
        canvas.height,
      )
      if (hasAccent) {
        ctx.drawImage(
          layerAccent.canvas,
          sx,
          sy,
          canvas.width,
          canvas.height,
          0,
          0,
          canvas.width,
          canvas.height,
        )
      }
    }
  }

  let active: Stroke[] = []
  const start = performance.now()
  let next = start + 120
  let settleAt = 0
  let raf = 0

  function tick(now: number) {
    const elapsed = now - start
    const underpainting = elapsed < UNDERPAINT_MS
    // After a hidden tab, don't flood the canvas with the strokes it missed.
    if (now - next > 200) next = now
    while (!settleAt && now >= next) {
      spawn(now, underpainting)
      next += (underpainting ? UNDERPAINT_EVERY_MS : STROKE_EVERY_MS) * rand(0.6, 1.4)
    }
    for (const s of active) s.step(now)
    active = active.filter((s) => !s.done)
    render()

    if (!settleAt && (open.length / cells.length < DONE_AT || elapsed > MAX_MS)) {
      settleAt = now
      settle()
    }
    if (settleAt && now - settleAt > SETTLE_MS && !active.length) {
      stop()
      return
    }
    raf = requestAnimationFrame(tick)
  }

  // A new width or theme would leave the paint misplaced or off-colour: finish now.
  const startWidth = window.innerWidth
  const onResize = () => {
    if (Math.abs(window.innerWidth - startWidth) > 1) stop()
  }
  const themeObserver = new MutationObserver(() => stop())

  function stop() {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', onResize)
    themeObserver.disconnect()
    for (const line of lines) line.canvas.remove()
    settle()
  }

  window.addEventListener('resize', onResize)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  raf = requestAnimationFrame(tick)
  return stop
}
