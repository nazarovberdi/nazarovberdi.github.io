<template>
  <header
    class="mb-[4.5rem] flex items-center justify-between gap-4 animate-fade-up [animation-delay:50ms] max-sm:flex-col max-sm:items-start"
  >
    <div class="flex items-center gap-3">
      <div class="pill flex size-9 items-center justify-center font-serif text-[16px]">NB</div>
      <div>
        <p class="eyebrow text-[11px] uppercase tracking-[0.12em]">Nazarov Berdi</p>
        <p class="body-muted text-[11px]">Software Engineer</p>
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-end gap-3 max-sm:justify-start">
      <span class="pill px-[10px] py-1 text-[11px] uppercase tracking-[0.08em] body-muted">
        Status: Available
      </span>
      <a
        href="https://github.com/nazarovberdi"
        target="_blank"
        rel="noopener"
        class="body-muted text-[12px] tracking-[0.04em] transition-colors duration-150 hover:text-[var(--page-text)]"
        >GitHub</a
      >
    </div>
  </header>
</template>
