<template>
  <section id="about" data-section="about" class="section about">
    <header class="section-head">
      <p class="section-label">02 — About</p>
      <h2 v-reveal class="section-title line-mask font-display">
        <span class="line"><span>Four years of</span></span>
        <span class="line" style="--line: 1"><span>shipping to <em class="accent-serif">production</em>.</span></span>
      </h2>
    </header>

    <div class="about-grid">
      <figure v-reveal class="about-portrait mask-reveal">
        <img
          src="/images/berdi.jpg"
          alt="Portrait of Berdi Nazarov"
          width="1060"
          height="855"
          loading="lazy"
          decoding="async"
        />
        <figcaption class="meta-label">Ashgabat, Turkmenistan</figcaption>
      </figure>

      <div v-reveal class="about-copy reveal-group">
        <p class="about-lead reveal-item" style="--i: 0">
          I'm Berdi, a frontend engineer working mostly in Vue, React and TypeScript. At MilliGoshant I build the
          frontend of Turkmenistan Railways' freight tariff system with a small team, on a Go backend.
        </p>
        <p class="about-body reveal-item" style="--i: 1">
          Its Vue apps calculate freight charges for local and transit shipments and bill the services stations
          provide. I'm the main developer of the station-fees app, from printed bills to the overcharge and
          undercharge corrections that follow them, and I built most of the spreadsheet-style workspace where
          operators calculate a shipment's charges wagon by wagon.
        </p>
        <p class="about-body reveal-item" style="--i: 2">
          On my own time I ship products end to end, like Lyne, an EPUB reader on Google Play, and Bileje, a paid
          invitation app.
        </p>

        <p class="about-role reveal-item" style="--i: 3">
          <span class="meta-label">Now</span>
          <span>Frontend developer at MilliGoshant</span>
          <span class="meta-label">Dec 2022 – now</span>
        </p>

        <dl class="skills reveal-item" style="--i: 4">
          <div v-for="group in skillGroups" :key="group.label" class="skills-row">
            <dt class="meta-label">{{ group.label }}</dt>
            <dd>{{ group.skills.join(', ') }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { skillGroups } from '../data'
</script>
