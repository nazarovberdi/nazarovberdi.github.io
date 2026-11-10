/**
 * Pixel toggle: blocks sweep out from `origin` until the screen is covered in
 * `color`, `onCovered` swaps what is underneath, then the blocks clear in the
 * same order. One canvas, so a few hundred blocks cost a single paint a frame.
 */
const PHASE_MS = 340

export function pixelSweep(
  origin: { x: number; y: number },
  color: string,
  onCovered: () => void,
): Promise<void> {
  const width = window.innerWidth
  const height = window.innerHeight
  const cell = width >= 768 ? 72 : 44
  const cols = Math.ceil(width / cell)
  const rows = Math.ceil(height / cell)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText = 'position:fixed;inset:0;z-index:100;pointer-events:none;width:100vw;height:100vh'
  document.body.append(canvas)
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = color

  // Each block's turn, 0..1: mostly its distance from the origin, plus jitter so
  // the edge of the sweep breaks up into pixels instead of a clean line.
  const maxDistance = Math.hypot(Math.max(origin.x, width - origin.x), Math.max(origin.y, height - origin.y))
  const turns: number[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const distance = Math.hypot(c * cell + cell / 2 - origin.x, r * cell + cell / 2 - origin.y)
      turns.push(Math.min(1, (distance / maxDistance) * 0.72 + Math.random() * 0.28))
    }
  }

  const draw = (visible: (turn: number) => boolean) => {
    ctx.clearRect(0, 0, width, height)
    turns.forEach((turn, i) => {
      if (visible(turn)) ctx.fillRect((i % cols) * cell, Math.floor(i / cols) * cell, cell, cell)
    })
  }

  return new Promise((resolve) => {
    const start = performance.now()
    let covered = false
    const frame = (now: number) => {
      const progress = (now - start) / PHASE_MS
      if (progress < 1) {
        draw((turn) => turn <= progress)
      } else if (!covered) {
        covered = true
        ctx.fillRect(0, 0, width, height)
        onCovered()
      } else if (progress < 2) {
        draw((turn) => turn > progress - 1)
      } else {
        canvas.remove()
        return resolve()
      }
      requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  })
}
