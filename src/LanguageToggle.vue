<template>
  <div class="lang-toggle" :class="{ inverted }" role="group" :aria-label="t('nav.language')">
    <template v-for="(code, index) in SUPPORTED_LOCALES" :key="code">
      <span v-if="index > 0" class="lang-divider" aria-hidden="true">|</span>
      <button
        type="button"
        class="lang-option"
        :class="{ active: locale === code }"
        :aria-pressed="locale === code"
        :title="LANGUAGE_NAMES[code]"
        @click="setLocale(code)"
      >
        {{ code.toUpperCase() }}
      </button>
    </template>
  </div>
</template>

<script setup>
import { locale, setLocale, t, SUPPORTED_LOCALES } from './i18n.js'

defineProps({
  // White text for the transparent navbar over the hero photo
  inverted: { type: Boolean, default: false }
})

const LANGUAGE_NAMES = { pt: 'Português', en: 'English' }
</script>

<style scoped>
.lang-toggle {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 0.35rem;
  font-family: 'Roboto Mono', 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  color: #2c3e50;
  transition: color 0.3s ease;
}

.lang-option {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  letter-spacing: inherit;
  color: inherit;
  opacity: 0.45;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.lang-option:hover,
.lang-option.active {
  opacity: 1;
}

.lang-option.active {
  cursor: default;
}

.lang-option:focus-visible {
  outline: 1px solid currentColor;
  outline-offset: 2px;
}

.lang-divider {
  opacity: 0.3;
}

.inverted {
  color: #fff;
}

@media (max-width: 768px) {
  .lang-toggle {
    order: 1;
    margin-right: 0.75rem;
  }
}
</style>
