export const JS_ENGINE_ITEMS = [
  {
    id: 'js1',
    label: 'Master the event loop deeply',
    note: 'Call stack, microtask queue, macrotask queue — not just "it\'s async"',
  },
  {
    id: 'js2',
    label: 'Understand Proxy and Reflect',
    note: 'Vue 3 reactivity is built entirely on these. Read MDN + play with traps.',
  },
  {
    id: 'js3',
    label: 'WeakMap and WeakRef use cases',
    note: 'Required for understanding how Vue tracks dependencies without leaks',
  },
  {
    id: 'js4',
    label: 'V8 basics: hidden classes, JIT',
    note: 'Optional but gives you instinct for performance-sensitive code',
  },
]

export const REACTIVITY = [
  {
    id: 'v1',
    label: 'Read packages/reactivity/src/effect.ts',
    note: 'Start here. Understand track(), trigger(), ReactiveEffect class.',
  },
  {
    id: 'v2',
    label: 'Read reactive.ts and ref.ts',
    note: 'See how Proxy handlers delegate to track/trigger. Map it mentally.',
  },
  {
    id: 'v3',
    label: 'Reproduce reactivity in 100 lines',
    note: 'Build a tiny version yourself — this cements it like nothing else.',
  },
  {
    id: 'v4',
    label: 'Understand computed + watchEffect internals',
    note: 'Lazy evaluation, dirty flags, scheduling — all in scheduler.ts',
  },
]
export const OSS_VITE = [
  {
    id: 'vt1',
    label: 'Read Rollup plugin interface docs fully',
    note: 'Vite plugins are a superset. resolveId, load, transform are your core hooks.',
  },
  {
    id: 'vt2',
    label: 'Read @vitejs/plugin-vue source (~600 lines)',
    note: 'This is the best-commented small plugin in the ecosystem.',
  },
  {
    id: 'vt3',
    label: 'Build a small Vite plugin yourself',
    note: 'Something real: auto-import, env injection, custom transform. Anything.',
  },
  {
    id: 'vt4',
    label: 'Understand HMR protocol and boundaries',
    note: 'Read vite/src/client/client.ts and how modules invalidate upward.',
  },
]

export const OSS_VUE = [
  {
    id: 'ts1',
    label: 'Conditional types and infer keyword',
    note: 'These appear constantly in Vue/Vite internals. No shortcuts here.',
  },
  {
    id: 'ts2',
    label: 'Template literal types',
    note: 'How Vue types things like "onUpdate" + "ModelValue" dynamically.',
  },
  {
    id: 'ts3',
    label: 'Read @vue/runtime-core type definitions',
    note: "Don't just read — ask yourself why each type is shaped that way.",
  },
  {
    id: 'ts4',
    label: 'Mapped types and distributive conditionals',
    note: 'The last piece. Lets you build types that reason over unions.',
  },
]

export const OSS_CONTRIBUTION = [
  {
    id: 'oss1',
    label: "Study Anthony Fu's smaller libraries",
    note: '@antfu/utils, unplugin — see how a core maintainer thinks at this scale.',
  },
  {
    id: 'oss2',
    label: "Reproduce a bug from Vite's issue tracker",
    note: "Don't fix yet — just reproduce. Learn the codebase through real problems.",
  },
  {
    id: 'oss3',
    label: 'Make a docs or reproduction PR',
    note: 'First PR should be small and unambiguous. Docs, repro cases, typos.',
  },
  {
    id: 'oss4',
    label: 'Submit a real bug fix to vitejs/vite',
    note: 'By now you know enough. Pick a help-wanted issue, submit, absorb feedback.',
  },
]
