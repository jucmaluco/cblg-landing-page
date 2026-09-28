<template>
  <div class="v2">
    <!-- Header -->
    <header class="v2-header" :class="{ 'is-solid': scrolled && !menuOpen }">
      <div class="v2-container v2-header__inner">
        <a href="#top" class="v2-brand" aria-label="CBLG Advogados" @click.prevent="go('top')">
          <img src="/logo-25-anos-white.png" alt="CBLG Advogados">
        </a>
        <nav class="v2-nav">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="v2-nav__link"
            @click.prevent="go(item.id)"
          >{{ t(item.label) }}</a>
        </nav>
        <div class="v2-header__actions">
          <LanguageToggle inverted />
          <button
            type="button"
            class="v2-burger"
            :class="{ 'is-open': menuOpen }"
            :aria-expanded="menuOpen"
            :aria-label="t('nav.openMenu')"
            @click="menuOpen = !menuOpen"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>

    <Transition name="v2-fade">
      <div v-if="menuOpen" class="v2-menu">
        <nav class="v2-container v2-menu__nav">
          <a
            v-for="(item, index) in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="v2-menu__link"
            :style="{ '--i': index }"
            @click.prevent="go(item.id)"
          >
            <span>{{ pad(index + 1) }}</span>
            {{ t(item.label) }}
          </a>
        </nav>
        <div class="v2-container v2-menu__foot">
          <span v-for="office in offices" :key="office.city">{{ office.city }}</span>
        </div>
      </div>
    </Transition>

    <main>
      <!-- Hero -->
      <section id="top" class="v2-hero">
        <div class="v2-container v2-hero__grid">
          <div class="v2-hero__content">
            <p class="v2-kicker">Castello Branco, Lobosco &amp; Gama</p>
            <h1 class="v2-hero__title">
              {{ t('rd.hero.lead') }} <em>{{ t('rd.hero.em') }}</em> {{ t('rd.hero.tail') }}
            </h1>
            <p class="v2-hero__tagline">{{ t('footer.tagline') }}</p>
            <div class="v2-hero__actions">
              <a href="#contato" class="v2-btn" @click.prevent="go('contato')">{{ t('hero.cta') }}</a>
              <a href="#equipe" class="v2-textlink" @click.prevent="go('equipe')">{{ t('rd.meetTeam') }}</a>
            </div>
          </div>

          <figure class="v2-hero__figure">
            <div class="v2-hero__frame">
              <img src="/Planet2.jpeg" :alt="t('rd.buildingAlt')">
            </div>
            <figcaption class="v2-hero__seal" aria-hidden="true">
              <span class="v2-hero__seal-num">25</span>
              <span class="v2-hero__seal-word">{{ t('rd.years').split(' ')[0] }}</span>
            </figcaption>
          </figure>
        </div>

        <div class="v2-container v2-hero__foot">
          <ul class="v2-hero__cities">
            <li v-for="office in offices" :key="office.city">{{ office.city }}</li>
          </ul>
          <a :href="telHref(offices[0].phone)" class="v2-hero__phone">{{ offices[0].phone }}</a>
        </div>
      </section>

      <!-- 01 Sobre -->
      <section id="sobre" class="v2-section v2-about">
        <div class="v2-container">
          <p class="v2-label" v-reveal><span>01</span>{{ t('footer.about') }}</p>
          <p class="v2-about__statement" v-reveal>{{ t('about.lead') }}</p>

          <div class="v2-about__grid">
            <figure class="v2-about__figure" v-reveal>
              <img src="/foto_mesa.png" :alt="t('rd.meetingAlt')" loading="lazy">
            </figure>
            <div class="v2-about__text">
              <p class="v2-body" v-reveal>{{ t('about.body') }}</p>
              <dl class="v2-facts">
                <div v-for="fact in facts" :key="fact.label" class="v2-fact" v-reveal>
                  <dt>{{ fact.value }}</dt>
                  <dd>{{ t(fact.label) }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <!-- 02 Equipe -->
      <section id="equipe" class="v2-section v2-team">
        <div class="v2-container v2-team__head">
          <div>
            <p class="v2-label" v-reveal><span>02</span>{{ t('footer.team') }}</p>
            <h2 class="v2-h2" v-reveal>{{ t('footer.team') }}</h2>
          </div>
          <div class="v2-arrows">
            <button type="button" class="v2-arrow" :aria-label="t('rd.previous')" :disabled="trackAtStart" @click="slide(-1)">
              <i class="fas fa-arrow-left-long"></i>
            </button>
            <button type="button" class="v2-arrow" :aria-label="t('rd.next')" :disabled="trackAtEnd" @click="slide(1)">
              <i class="fas fa-arrow-right-long"></i>
            </button>
          </div>
        </div>

        <ul ref="trackRef" class="v2-team__track" @scroll.passive="updateTrack">
          <li v-for="(member, index) in team" :key="member.nome" class="v2-team__item">
            <button type="button" class="v2-member" @click="activeMember = member">
              <span class="v2-member__photo">
                <img :src="member.foto" :alt="member.nome" loading="lazy">
              </span>
              <span class="v2-member__index">{{ pad(index + 1) }}</span>
              <span class="v2-member__name">{{ member.nome }}</span>
              <span class="v2-member__cta">{{ t('rd.viewProfile') }}</span>
            </button>
          </li>
        </ul>

        <div class="v2-container">
          <div class="v2-progress" aria-hidden="true">
            <span :style="{ width: `${trackThumb * 100}%`, transform: `translateX(${trackProgress * (1 / trackThumb - 1) * 100}%)` }"></span>
          </div>
        </div>
      </section>

      <!-- 03 Áreas de atuação -->
      <section id="areas" class="v2-section v2-areas">
        <div class="v2-container">
          <p class="v2-label" v-reveal><span>03</span>{{ t('footer.areas') }}</p>
          <h2 class="v2-h2" v-reveal>{{ t('footer.areas') }}</h2>

          <div class="v2-areas__grid">
            <ol class="v2-areas__list">
              <li
                v-for="(area, index) in practiceAreas"
                :key="area.titulo"
                class="v2-area"
                :class="{ 'is-active': activeArea === index }"
              >
                <button
                  type="button"
                  class="v2-area__btn"
                  :aria-expanded="activeArea === index"
                  @click="activeArea = index"
                  @mouseenter="hoverArea(index)"
                  @focus="activeArea = index"
                >
                  <span class="v2-area__num">{{ pad(index + 1) }}</span>
                  <span class="v2-area__title">{{ titleCase(localized(area, 'titulo')) }}</span>
                </button>
                <div class="v2-area__inline">
                  <p v-for="(paragraph, i) in paragraphs(localized(area, 'descricao'))" :key="i">{{ paragraph }}</p>
                </div>
              </li>
            </ol>

            <div class="v2-areas__panel">
              <Transition name="v2-swap" mode="out-in">
                <article :key="`${activeArea}-${locale}`" class="v2-areas__detail">
                  <span class="v2-areas__detail-num">{{ pad(activeArea + 1) }}</span>
                  <h3 class="v2-areas__detail-title">{{ titleCase(localized(practiceAreas[activeArea], 'titulo')) }}</h3>
                  <p
                    v-for="(paragraph, i) in paragraphs(localized(practiceAreas[activeArea], 'descricao'))"
                    :key="i"
                  >{{ paragraph }}</p>
                </article>
              </Transition>
            </div>
          </div>
        </div>
      </section>

      <!-- 04 Notícias -->
      <section id="noticias" class="v2-section v2-news">
        <div class="v2-container">
          <div class="v2-news__head">
            <div>
              <p class="v2-label" v-reveal><span>04</span>{{ t('rd.news') }}</p>
              <h2 class="v2-h2" v-reveal>{{ t('rd.news') }}</h2>
            </div>
            <a href="/blog" class="v2-textlink" v-reveal>{{ t('rd.viewAll') }}</a>
          </div>

          <div v-if="postsLoading" class="v2-news__grid" aria-busy="true">
            <div class="v2-skeleton v2-skeleton--feature"></div>
            <div class="v2-news__side">
              <div class="v2-skeleton"></div>
              <div class="v2-skeleton"></div>
            </div>
          </div>
          <p v-else-if="postsError" class="v2-body">{{ t('blog.error') }}</p>
          <p v-else-if="!posts.length" class="v2-body">{{ t('blog.empty') }}</p>
          <div v-else class="v2-news__grid">
            <button type="button" class="v2-post v2-post--feature" v-reveal @click="activePost = posts[0]">
              <span class="v2-post__img">
                <img v-if="posts[0].coverLarge" :src="posts[0].coverLarge" :alt="posts[0].title" loading="lazy">
              </span>
              <span class="v2-post__meta">{{ posts[0].author }} <i></i> {{ formatDate(posts[0].publishedAt) }}</span>
              <span class="v2-post__title">{{ posts[0].title }}</span>
              <span class="v2-post__excerpt">{{ posts[0].excerpt }}</span>
            </button>
            <div class="v2-news__side">
              <button
                v-for="(post, index) in posts.slice(1)"
                :key="post.id"
                type="button"
                class="v2-post v2-post--row"
                v-reveal
                :style="{ '--delay': `${(index + 1) * 100}ms` }"
                @click="activePost = post"
              >
                <span class="v2-post__img">
                  <img v-if="post.cover" :src="post.cover" :alt="post.title" loading="lazy">
                </span>
                <span class="v2-post__text">
                  <span class="v2-post__meta">{{ post.author }} <i></i> {{ formatDate(post.publishedAt) }}</span>
                  <span class="v2-post__title">{{ post.title }}</span>
                  <span class="v2-post__more">{{ t('blog.readMore') }}</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 05 Contato -->
      <section id="contato" class="v2-section v2-contact">
        <div class="v2-container">
          <p class="v2-label" v-reveal><span>05</span>{{ t('rd.contact') }}</p>
          <h2 class="v2-h2 v2-contact__title" v-reveal>{{ t('hero.cta') }}</h2>
          <ul class="v2-offices">
            <li
              v-for="(office, index) in offices"
              :key="office.city"
              class="v2-office"
              v-reveal
              :style="{ '--delay': `${index * 110}ms` }"
            >
              <p class="v2-office__label">{{ t(office.key) }}</p>
              <h3 class="v2-office__city">{{ office.city }}</h3>
              <address class="v2-office__address">
                <span v-for="line in office.lines" :key="line">{{ line }}</span>
              </address>
              <a :href="telHref(office.phone)" class="v2-office__phone">{{ office.phone }}</a>
              <a :href="mapsUrl(office)" target="_blank" rel="noopener" class="v2-textlink v2-textlink--small">{{ t('rd.map') }}</a>
            </li>
          </ul>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="v2-footer">
      <div class="v2-container v2-footer__top">
        <img src="/logo-25-anos-white.png" alt="CBLG Advogados" class="v2-footer__logo">
        <p class="v2-footer__tagline">{{ t('footer.tagline') }}</p>
      </div>
      <div class="v2-container v2-footer__grid">
        <div class="v2-footer__col">
          <h4>{{ t('footer.quickLinks') }}</h4>
          <a
            v-for="item in navItems.slice(0, 3)"
            :key="item.id"
            :href="`#${item.id}`"
            @click.prevent="go(item.id)"
          >{{ t(item.label) }}</a>
          <a href="/blog">{{ t('footer.blog') }}</a>
        </div>
        <div class="v2-footer__col">
          <h4>{{ t('footer.legal') }}</h4>
          <a href="/privacy-policy">{{ t('footer.privacy') }}</a>
        </div>
        <div class="v2-footer__col">
          <h4>{{ t('footer.social') }}</h4>
          <div class="v2-footer__social">
            <a :href="socialLinks.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            <a :href="socialLinks.instagram" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div class="v2-container v2-footer__bottom">
        <p>&copy; 2025 Castello Branco, Lobosco &amp; Gama Advogados. {{ t('footer.rights') }}</p>
      </div>
    </footer>

    <!-- Team member profile -->
    <Transition name="v2-profile">
      <div
        v-if="activeMember"
        class="v2-profile"
        role="dialog"
        aria-modal="true"
        :aria-label="activeMember.nome"
      >
        <div class="v2-profile__photo">
          <img :src="activeMember.foto" :alt="activeMember.nome">
        </div>
        <article class="v2-profile__content">
          <button type="button" class="v2-close" @click="activeMember = null">{{ t('rd.close') }}</button>
          <p class="v2-kicker">CBLG Advogados</p>
          <h3 class="v2-profile__name">{{ activeMember.nome }}</h3>
          <div class="v2-profile__links">
            <a v-if="activeMember.email" :href="`mailto:${activeMember.email}`">{{ activeMember.email }}</a>
            <a v-if="activeMember.linkedin" :href="activeMember.linkedin" target="_blank" rel="noopener">
              <i class="fab fa-linkedin-in"></i> LinkedIn
            </a>
          </div>
          <div class="v2-profile__body">
            <h4>{{ t('team.about') }}</h4>
            <p v-for="(paragraph, i) in paragraphs(localized(activeMember, 'bio'))" :key="i">{{ paragraph }}</p>
            <h4>{{ t('team.education') }}</h4>
            <ul>
              <li v-for="(item, i) in localized(activeMember, 'formacao')" :key="i">{{ item }}</li>
            </ul>
          </div>
        </article>
      </div>
    </Transition>

    <!-- News reader -->
    <Transition name="v2-fade">
      <div
        v-if="activePost"
        class="v2-reader"
        role="dialog"
        aria-modal="true"
        :aria-label="activePost.title"
        @click.self="activePost = null"
      >
        <article class="v2-reader__panel">
          <button type="button" class="v2-close" @click="activePost = null">{{ t('rd.close') }}</button>
          <p class="v2-post__meta">{{ activePost.author }} <i></i> {{ formatDate(activePost.publishedAt) }}</p>
          <h3 class="v2-reader__title">{{ activePost.title }}</h3>
          <img v-if="activePost.coverLarge" :src="activePost.coverLarge" :alt="activePost.title" class="v2-reader__img">
          <div class="v2-reader__body">
            <p v-for="(paragraph, i) in paragraphs(activePost.body)" :key="i">{{ paragraph }}</p>
          </div>
        </article>
      </div>
    </Transition>

    <!-- Cookie notice -->
    <Transition name="v2-rise">
      <aside v-if="cookie.visible.value" class="v2-cookie" :aria-label="t('cookie.title')">
        <p class="v2-cookie__title">{{ t('cookie.title') }}</p>
        <p class="v2-cookie__text">
          {{ t('cookie.text') }}
          <a href="/privacy-policy">{{ t('cookie.privacy') }}</a>
        </p>
        <div class="v2-cookie__actions">
          <button type="button" class="v2-btn v2-btn--small" @click="cookie.accept">{{ t('cookie.accept') }}</button>
          <button type="button" class="v2-cookie__decline" @click="cookie.decline">{{ t('cookie.decline') }}</button>
        </div>
      </aside>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import LanguageToggle from '../LanguageToggle.vue'
import { t, localized, formatDate, locale } from '../i18n.js'
import { team, practiceAreas, offices, socialLinks } from '../content.js'
import {
  loadFonts,
  vReveal,
  useScrolled,
  useScrollLock,
  useEscape,
  usePageBackground,
  useCookieConsent,
  useLatestPosts,
  paragraphs,
  titleCase,
  pad,
  telHref,
  mapsUrl,
  scrollToSection
} from './shared.js'

loadFonts('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400;1,6..96,500&family=Jost:wght@300;400;500&display=swap')
usePageBackground('#07131c')

const navItems = [
  { id: 'sobre', label: 'footer.about' },
  { id: 'equipe', label: 'footer.team' },
  { id: 'areas', label: 'footer.areas' },
  { id: 'noticias', label: 'rd.news' },
  { id: 'contato', label: 'rd.contact' }
]

const facts = [
  { value: '25', label: 'rd.years' },
  { value: pad(practiceAreas.length), label: 'rd.areasCount' },
  { value: pad(offices.length), label: 'rd.officesCount' }
]

const scrolled = useScrolled()
const menuOpen = ref(false)
const activeArea = ref(0)
const activeMember = ref(null)
const activePost = ref(null)
const cookie = useCookieConsent()
const { posts, loading: postsLoading, error: postsError } = useLatestPosts(3)

useScrollLock(computed(() => menuOpen.value || !!activeMember.value || !!activePost.value))
useEscape(() => {
  menuOpen.value = false
  activeMember.value = null
  activePost.value = null
})

const go = (id) => {
  menuOpen.value = false
  scrollToSection(id)
}

// Hover previews an area only where the side panel is visible
const canHover = window.matchMedia('(hover: hover) and (min-width: 961px)')
const hoverArea = (index) => {
  if (canHover.matches) activeArea.value = index
}

// Team carousel
const trackRef = ref(null)
const trackProgress = ref(0)
const trackThumb = ref(1)
const trackAtStart = ref(true)
const trackAtEnd = ref(false)

const updateTrack = () => {
  const el = trackRef.value
  if (!el) return
  const maxScroll = el.scrollWidth - el.clientWidth
  trackThumb.value = Math.min(1, el.clientWidth / el.scrollWidth)
  trackProgress.value = maxScroll > 0 ? el.scrollLeft / maxScroll : 0
  trackAtStart.value = el.scrollLeft <= 4
  trackAtEnd.value = el.scrollLeft >= maxScroll - 4
}

const slide = (direction) => {
  const el = trackRef.value
  if (!el) return
  const item = el.querySelector('.v2-team__item')
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0
  const step = item ? item.getBoundingClientRect().width + gap : el.clientWidth * 0.8
  el.scrollBy({ left: direction * step * 2, behavior: 'smooth' })
}

onMounted(() => {
  updateTrack()
  window.addEventListener('resize', updateTrack)
})
onUnmounted(() => window.removeEventListener('resize', updateTrack))
</script>

<style scoped>
.v2 {
  --bg: #07131c;
  --bg-2: #0b1b27;
  --bg-3: #10242f;
  --bg-deep: #040c12;
  --ivory: #efe8dc;
  --ivory-dim: rgba(239, 232, 220, 0.72);
  --muted: #8f9ca6;
  --gold: #d3a24e;
  --gold-light: #e7c589;
  --line: rgba(239, 232, 220, 0.12);
  --serif: 'Bodoni Moda', 'Didot', 'Bodoni 72', Georgia, serif;
  --sans: 'Jost', 'Futura', 'Helvetica Neue', Arial, sans-serif;
  --gutter: clamp(20px, 5vw, 64px);
  --ease: cubic-bezier(0.22, 0.68, 0.18, 1);

  background: var(--bg);
  color: var(--ivory);
  font-family: var(--sans);
  font-size: 16px;
  font-weight: 300;
  line-height: 1.7;
  font-variant-numeric: lining-nums;
  -webkit-font-smoothing: antialiased;
  overflow-x: clip;
}

.v2 *,
.v2 *::before,
.v2 *::after {
  box-sizing: border-box;
}

/* Resets use :where() so component classes always win */
:where(.v2) :where(h1, h2, h3, h4, p, ul, ol, dl, dd, figure, address) {
  margin: 0;
  padding: 0;
}

:where(.v2) :where(ul, ol) {
  list-style: none;
}

:where(.v2) a {
  color: inherit;
  text-decoration: none;
}

:where(.v2) button {
  font: inherit;
  color: inherit;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  text-align: inherit;
}

:where(.v2) img {
  display: block;
  max-width: 100%;
}

.v2 :focus-visible {
  outline: 1px solid var(--gold);
  outline-offset: 4px;
}

.v2-container {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding-inline: var(--gutter);
}

.v2-section {
  padding-block: clamp(104px, 13vw, 180px);
  scroll-margin-top: 20px;
}

/* Reveal on scroll */
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 1s var(--ease), transform 1s var(--ease);
  transition-delay: var(--delay, 0ms);
}

.reveal.is-revealed {
  opacity: 1;
  transform: none;
}

/* Type */
.v2-kicker {
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: var(--gold);
}

.v2-label {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--muted);
}

.v2-label span {
  color: var(--gold);
}

.v2-label span::after {
  content: '';
  display: inline-block;
  width: 36px;
  height: 1px;
  margin-left: 14px;
  vertical-align: middle;
  background: var(--gold);
  opacity: 0.7;
}

.v2-h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(2.8rem, 6vw, 5.4rem);
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--ivory);
}

.v2-body {
  font-size: 1.02rem;
  line-height: 1.9;
  color: var(--ivory-dim);
}

.v2-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 19px 34px;
  border: 1px solid var(--gold);
  font-size: 0.74rem;
  font-weight: 400;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--ivory);
  background: linear-gradient(var(--gold), var(--gold)) no-repeat left / 0 100%;
  transition: background-size 0.6s var(--ease), color 0.6s var(--ease);
}

.v2-btn:hover {
  background-size: 100% 100%;
  color: var(--bg);
}

.v2-btn--small {
  padding: 13px 22px;
  font-size: 0.66rem;
}

.v2-textlink {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  font-size: 0.74rem;
  font-weight: 400;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--ivory);
  transition: color 0.4s;
}

.v2-textlink::after {
  content: '';
  width: 32px;
  height: 1px;
  background: var(--gold);
  transition: width 0.6s var(--ease);
}

.v2-textlink:hover {
  color: var(--gold-light);
}

.v2-textlink:hover::after {
  width: 60px;
}

.v2-textlink--small {
  font-size: 0.66rem;
}

/* Header */
.v2-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  transition: background-color 0.6s var(--ease), box-shadow 0.6s var(--ease);
}

.v2-header.is-solid {
  background: rgba(7, 19, 28, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 var(--line);
}

.v2-header__inner {
  display: flex;
  align-items: center;
  gap: 40px;
  height: 96px;
  transition: height 0.6s var(--ease);
}

.v2-header.is-solid .v2-header__inner {
  height: 76px;
}

.v2-brand img {
  height: 44px;
  width: auto;
}

.v2-nav {
  display: flex;
  gap: clamp(22px, 2.8vw, 44px);
  margin-left: auto;
}

.v2-nav__link {
  position: relative;
  padding-block: 6px;
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--ivory-dim);
  transition: color 0.4s;
}

.v2-nav__link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 4px;
  height: 4px;
  margin-left: -2px;
  border-radius: 50%;
  background: var(--gold);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.4s, transform 0.4s var(--ease);
}

.v2-nav__link:hover {
  color: var(--ivory);
}

.v2-nav__link:hover::after {
  opacity: 1;
  transform: translateY(8px);
}

.v2-header__actions {
  display: flex;
  align-items: center;
  gap: 22px;
}

.v2-header__actions :deep(.lang-toggle) {
  order: 0;
  margin: 0;
  font-family: var(--sans);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
}

.v2-burger {
  display: none;
  position: relative;
  width: 30px;
  height: 30px;
  order: 2;
}

.v2-burger span {
  position: absolute;
  right: 3px;
  height: 1px;
  background: var(--ivory);
  transition: transform 0.45s var(--ease), width 0.45s var(--ease);
}

.v2-burger span:first-child {
  top: 11px;
  width: 24px;
}

.v2-burger span:last-child {
  top: 19px;
  width: 16px;
}

.v2-burger.is-open span {
  width: 24px;
}

.v2-burger.is-open span:first-child {
  transform: translateY(4px) rotate(45deg);
}

.v2-burger.is-open span:last-child {
  transform: translateY(-4px) rotate(-45deg);
}

/* Mobile menu */
.v2-menu {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 132px 0 40px;
  background: var(--bg);
}

.v2-menu__link {
  display: flex;
  align-items: baseline;
  gap: 18px;
  padding: 14px 0;
  font-family: var(--serif);
  font-size: clamp(2.1rem, 9vw, 3rem);
  line-height: 1.1;
  color: var(--ivory);
  opacity: 0;
  transform: translateY(14px);
  animation: v2-in 0.8s var(--ease) forwards;
  animation-delay: calc(80ms + var(--i) * 70ms);
}

.v2-menu__link span {
  font-family: var(--sans);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  color: var(--gold);
}

.v2-menu__foot {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  font-family: var(--serif);
  font-style: italic;
  color: var(--muted);
}

@keyframes v2-in {
  to {
    opacity: 1;
    transform: none;
  }
}

/* Hero */
.v2-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100svh;
  padding-top: 150px;
  background:
    radial-gradient(120% 80% at 85% 10%, rgba(211, 162, 78, 0.07), transparent 60%),
    var(--bg);
}

.v2-hero__grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: clamp(40px, 6vw, 96px);
}

.v2-hero__content > * {
  opacity: 0;
  transform: translateY(22px);
  animation: v2-in 1.2s var(--ease) forwards;
}

.v2-hero__content > :nth-child(2) { animation-delay: 0.12s; }
.v2-hero__content > :nth-child(3) { animation-delay: 0.26s; }
.v2-hero__content > :nth-child(4) { animation-delay: 0.38s; }

.v2-hero__title {
  margin-top: 30px;
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(2.8rem, 5.3vw, 5.4rem);
  line-height: 1.04;
  letter-spacing: -0.025em;
  color: var(--ivory);
}

.v2-hero__title em {
  font-style: italic;
  color: var(--gold-light);
}

.v2-hero__tagline {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 36px;
  font-size: 1.08rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: var(--ivory-dim);
}

.v2-hero__tagline::before {
  content: '';
  width: 48px;
  height: 1px;
  background: var(--gold);
}

.v2-hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 36px;
  margin-top: 52px;
}

.v2-hero__figure {
  position: relative;
  justify-self: end;
  width: 100%;
  max-width: 480px;
  opacity: 0;
  animation: v2-in 1.4s var(--ease) 0.2s forwards;
}

.v2-hero__frame {
  position: relative;
}

.v2-hero__frame::before {
  content: '';
  position: absolute;
  inset: -22px -22px 22px 22px;
  border: 1px solid rgba(211, 162, 78, 0.5);
}

.v2-hero__frame img {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: 40% 50%;
  filter: saturate(0.8) contrast(1.05);
}

.v2-hero__frame::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(7, 19, 28, 0) 50%, rgba(7, 19, 28, 0.55) 100%);
}

.v2-hero__seal {
  position: absolute;
  left: -0.42em;
  bottom: -0.2em;
  display: flex;
  align-items: baseline;
  gap: 0.12em;
  font-family: var(--serif);
  font-size: clamp(6.5rem, 12vw, 11rem);
  line-height: 0.8;
  pointer-events: none;
}

.v2-hero__seal-num {
  color: var(--gold);
  letter-spacing: -0.04em;
  text-shadow: 0 18px 48px rgba(4, 12, 18, 0.55);
}

.v2-hero__seal-word {
  font-size: 0.24em;
  font-style: italic;
  color: var(--ivory);
}

.v2-hero__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: clamp(64px, 8vh, 96px);
  padding-block: 28px;
  border-top: 1px solid var(--line);
}

.v2-hero__cities {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 40px;
}

.v2-hero__cities li {
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--ivory-dim);
}

.v2-hero__phone {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.1rem;
  color: var(--gold-light);
}

/* About */
.v2-about__statement {
  max-width: 24em;
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(1.9rem, 3.7vw, 3.3rem);
  line-height: 1.22;
  letter-spacing: -0.015em;
  color: var(--ivory);
}

.v2-about__grid {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: clamp(40px, 6vw, 96px);
  align-items: start;
  margin-top: clamp(72px, 9vw, 128px);
}

.v2-about__figure img {
  width: 100%;
  aspect-ratio: 16 / 11;
  object-fit: cover;
  filter: saturate(0.85);
}

.v2-facts {
  margin-top: 56px;
  border-top: 1px solid var(--line);
}

.v2-fact {
  display: flex;
  align-items: baseline;
  gap: 24px;
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
}

.v2-fact dt {
  min-width: 2.1em;
  font-family: var(--serif);
  font-size: 3.4rem;
  line-height: 1;
  color: var(--gold);
}

.v2-fact dd {
  font-size: 0.72rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--ivory-dim);
}

/* Team */
.v2-team {
  background: var(--bg-2);
}

.v2-team__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: clamp(48px, 6vw, 80px);
}

.v2-arrows {
  display: flex;
  gap: 12px;
}

.v2-arrow {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border: 1px solid var(--line);
  color: var(--ivory);
  transition: border-color 0.4s, color 0.4s, opacity 0.4s;
}

.v2-arrow:hover:not(:disabled) {
  border-color: var(--gold);
  color: var(--gold);
}

.v2-arrow:disabled {
  opacity: 0.3;
  cursor: default;
}

.v2-team__track {
  --outer: max(var(--gutter), calc((100vw - 1320px) / 2 + var(--gutter)));
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(250px, 23vw, 330px);
  gap: clamp(18px, 2vw, 30px);
  padding-inline: var(--outer);
  scroll-padding-inline: var(--outer);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.v2-team__track::-webkit-scrollbar {
  display: none;
}

.v2-team__item {
  scroll-snap-align: start;
}

.v2-member {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.v2-member__photo {
  position: relative;
  display: block;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--bg-3);
}

.v2-member__photo::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.7s var(--ease);
}

.v2-member__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 15%;
  filter: grayscale(0.9) brightness(0.88) contrast(1.05);
  transition: filter 0.9s var(--ease), transform 1.4s var(--ease);
}

.v2-member:hover .v2-member__photo img,
.v2-member:focus-visible .v2-member__photo img {
  filter: grayscale(0) brightness(1) contrast(1);
  transform: scale(1.04);
}

.v2-member:hover .v2-member__photo::after {
  transform: scaleX(1);
}

.v2-member__index {
  margin-top: 22px;
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  color: var(--gold);
}

.v2-member__name {
  margin-top: 8px;
  font-family: var(--serif);
  font-size: 1.5rem;
  line-height: 1.2;
  color: var(--ivory);
}

.v2-member__cta {
  margin-top: 10px;
  font-size: 0.66rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--muted);
  transition: color 0.4s;
}

.v2-member:hover .v2-member__cta {
  color: var(--gold-light);
}

.v2-progress {
  position: relative;
  height: 1px;
  margin-top: 56px;
  background: var(--line);
  overflow: hidden;
}

.v2-progress span {
  position: absolute;
  inset: 0 auto 0 0;
  background: var(--gold);
  transition: transform 0.2s linear;
}

/* Practice areas */
.v2-areas__grid {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: clamp(40px, 7vw, 120px);
  margin-top: clamp(56px, 7vw, 96px);
}

.v2-areas__list {
  border-top: 1px solid var(--line);
}

.v2-area {
  border-bottom: 1px solid var(--line);
}

.v2-area__btn {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 22px;
  width: 100%;
  padding: 20px 0;
}

.v2-area__btn::before {
  content: '';
  position: absolute;
  left: -28px;
  top: 50%;
  width: 16px;
  height: 1px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s var(--ease);
}

.v2-area__num {
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  color: var(--gold);
}

.v2-area__title {
  font-family: var(--serif);
  font-size: clamp(1.2rem, 1.7vw, 1.45rem);
  line-height: 1.25;
  color: rgba(239, 232, 220, 0.5);
  transition: color 0.4s, transform 0.5s var(--ease);
}

.v2-area__btn:hover .v2-area__title {
  color: var(--ivory);
}

.v2-area.is-active .v2-area__title {
  color: var(--ivory);
  transform: translateX(6px);
}

.v2-area.is-active .v2-area__btn::before {
  transform: scaleX(1);
}

.v2-area__inline {
  display: none;
}

.v2-areas__panel {
  position: sticky;
  top: 120px;
  align-self: start;
  min-height: 460px;
  padding: clamp(36px, 4vw, 56px);
  background: var(--bg-2);
  border: 1px solid var(--line);
}

.v2-areas__detail-num {
  display: block;
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(4.5rem, 7vw, 6.5rem);
  line-height: 0.9;
  color: var(--gold);
}

.v2-areas__detail-title {
  margin: 24px 0 28px;
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(1.8rem, 2.8vw, 2.6rem);
  line-height: 1.12;
  color: var(--ivory);
}

.v2-areas__detail p {
  margin-bottom: 18px;
  font-size: 0.98rem;
  line-height: 1.9;
  color: var(--ivory-dim);
}

.v2-swap-enter-active,
.v2-swap-leave-active {
  transition: opacity 0.35s var(--ease), transform 0.35s var(--ease);
}

.v2-swap-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.v2-swap-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* News */
.v2-news {
  background: var(--bg-2);
}

.v2-news__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: clamp(48px, 6vw, 80px);
}

.v2-news__grid {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: clamp(32px, 4vw, 64px);
}

.v2-news__side {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.v2-post {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.v2-post__img {
  display: block;
  overflow: hidden;
  background: var(--bg-3);
}

.v2-post__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.85);
  transition: transform 1.4s var(--ease), filter 0.8s;
}

.v2-post:hover .v2-post__img img {
  transform: scale(1.05);
  filter: saturate(1);
}

.v2-post--feature .v2-post__img {
  aspect-ratio: 16 / 10;
}

.v2-post__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 14px;
  font-size: 0.66rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold);
}

.v2-post__meta i {
  width: 18px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}

.v2-post--feature .v2-post__meta {
  margin-top: 28px;
}

.v2-post__title {
  margin-top: 14px;
  font-family: var(--serif);
  font-size: 1.4rem;
  line-height: 1.25;
  color: var(--ivory);
  transition: color 0.4s;
}

.v2-post--feature .v2-post__title {
  font-size: clamp(1.8rem, 2.8vw, 2.5rem);
  line-height: 1.15;
}

.v2-post:hover .v2-post__title {
  color: var(--gold-light);
}

.v2-post__excerpt {
  margin-top: 16px;
  font-size: 0.98rem;
  line-height: 1.8;
  color: var(--ivory-dim);
}

.v2-post--row {
  display: grid;
  grid-template-columns: 42% 1fr;
  gap: 24px;
  padding-bottom: 36px;
  border-bottom: 1px solid var(--line);
}

.v2-post--row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.v2-post--row .v2-post__img {
  aspect-ratio: 1 / 1;
}

.v2-post__text {
  display: flex;
  flex-direction: column;
}

.v2-post--row .v2-post__title {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.v2-post__more {
  margin-top: auto;
  padding-top: 16px;
  font-size: 0.66rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--muted);
}

.v2-skeleton {
  flex: 1;
  min-height: 180px;
  background: var(--bg-3);
  animation: v2-pulse 1.6s ease-in-out infinite;
}

.v2-skeleton--feature {
  min-height: 420px;
}

@keyframes v2-pulse {
  50% {
    opacity: 0.55;
  }
}

/* Contact */
.v2-contact {
  position: relative;
  isolation: isolate;
  background: url('/background-fachada.jpg') center 30% / cover no-repeat;
}

.v2-contact::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(7, 19, 28, 0.96) 0%, rgba(7, 19, 28, 0.82) 45%, rgba(7, 19, 28, 0.94) 100%);
}

.v2-contact__title {
  max-width: 12ch;
}

.v2-offices {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(28px, 4vw, 64px);
  margin-top: clamp(64px, 8vw, 112px);
}

.v2-office {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 30px;
  border-top: 1px solid rgba(211, 162, 78, 0.55);
}

.v2-office__label {
  font-size: 0.66rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--muted);
}

.v2-office__city {
  margin-top: 12px;
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(2rem, 3vw, 2.6rem);
  line-height: 1.05;
  color: var(--gold-light);
}

.v2-office__address {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  font-style: normal;
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--ivory-dim);
}

.v2-office__phone {
  margin: 18px 0 20px;
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  color: var(--ivory);
  transition: color 0.3s;
}

.v2-office__phone:hover {
  color: var(--gold-light);
}

/* Footer */
.v2-footer {
  background: var(--bg-deep);
  padding-top: clamp(80px, 9vw, 120px);
}

.v2-footer__top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  padding-bottom: 56px;
}

.v2-footer__logo {
  width: clamp(200px, 22vw, 280px);
  height: auto;
}

.v2-footer__tagline {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(1.3rem, 2.2vw, 1.8rem);
  color: var(--ivory-dim);
}

.v2-footer__grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  padding-block: 56px;
}

.v2-footer__grid::before {
  content: '';
  position: absolute;
  top: 0;
  left: var(--gutter);
  right: var(--gutter);
  height: 1px;
  background: var(--line);
}

.v2-footer__col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 0.95rem;
  color: var(--ivory-dim);
}

.v2-footer__col h4 {
  margin-bottom: 8px;
  font-size: 0.66rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold);
}

.v2-footer__col a {
  width: fit-content;
  transition: color 0.3s;
}

.v2-footer__col a:hover {
  color: var(--ivory);
}

.v2-footer__social {
  display: flex;
  gap: 12px;
}

.v2-footer__social a {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line);
  transition: border-color 0.3s, color 0.3s;
}

.v2-footer__social a:hover {
  border-color: var(--gold);
  color: var(--gold);
}

.v2-footer__bottom p {
  padding-block: 28px;
  border-top: 1px solid var(--line);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  color: rgba(239, 232, 220, 0.45);
}

/* Shared overlay pieces */
.v2-close {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-size: 0.68rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--ivory);
}

.v2-close::after {
  content: '';
  width: 20px;
  height: 20px;
  background:
    linear-gradient(45deg, transparent calc(50% - 0.5px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 0.5px)),
    linear-gradient(-45deg, transparent calc(50% - 0.5px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 0.5px));
  transition: transform 0.5s var(--ease);
}

.v2-close:hover {
  color: var(--gold-light);
}

.v2-close:hover::after {
  transform: rotate(90deg);
}

/* Profile */
.v2-profile {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  grid-template-columns: 5fr 7fr;
  background: var(--bg);
}

.v2-profile__photo {
  position: relative;
  overflow: hidden;
}

.v2-profile__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 15%;
}

.v2-profile__photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(7, 19, 28, 0) 60%, rgba(7, 19, 28, 0.9) 100%);
}

.v2-profile__content {
  overflow-y: auto;
  padding: 40px clamp(24px, 6vw, 96px) 80px;
}

.v2-profile__content > .v2-close {
  display: flex;
  margin: 0 0 clamp(40px, 8vh, 96px) auto;
}

.v2-profile__name {
  margin-top: 18px;
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(2.4rem, 4.6vw, 4rem);
  line-height: 1.02;
  letter-spacing: -0.02em;
  color: var(--ivory);
}

.v2-profile__links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 28px;
  margin-top: 24px;
  font-size: 0.9rem;
}

.v2-profile__links a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--gold-light);
  border-bottom: 1px solid rgba(211, 162, 78, 0.4);
  padding-bottom: 3px;
  transition: border-color 0.3s;
}

.v2-profile__links a:hover {
  border-color: var(--gold-light);
}

.v2-profile__body {
  max-width: 640px;
  margin-top: 16px;
}

.v2-profile__body h4 {
  margin: 44px 0 18px;
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold);
}

.v2-profile__body p {
  margin-bottom: 18px;
  font-size: 1rem;
  line-height: 1.9;
  color: var(--ivory-dim);
}

.v2-profile__body li {
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--ivory-dim);
}

.v2-profile-enter-active,
.v2-profile-leave-active {
  transition: opacity 0.6s var(--ease);
}

.v2-profile-enter-active .v2-profile__photo img,
.v2-profile-leave-active .v2-profile__photo img {
  transition: transform 1.1s var(--ease);
}

.v2-profile-enter-active .v2-profile__content,
.v2-profile-leave-active .v2-profile__content {
  transition: transform 0.7s var(--ease), opacity 0.7s var(--ease);
}

.v2-profile-enter-from,
.v2-profile-leave-to {
  opacity: 0;
}

.v2-profile-enter-from .v2-profile__photo img {
  transform: scale(1.08);
}

.v2-profile-enter-from .v2-profile__content {
  opacity: 0;
  transform: translateY(24px);
}

/* Reader */
.v2-reader {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  justify-content: center;
  padding: clamp(0px, 4vw, 56px);
  overflow-y: auto;
  background: rgba(4, 12, 18, 0.86);
}

.v2-reader__panel {
  width: min(840px, 100%);
  height: fit-content;
  padding: 40px clamp(24px, 6vw, 80px) 80px;
  background: var(--bg-2);
  border: 1px solid var(--line);
}

.v2-reader__panel > .v2-close {
  display: flex;
  margin: 0 0 40px auto;
}

.v2-reader__title {
  margin-top: 18px;
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(2rem, 4.4vw, 3.2rem);
  line-height: 1.1;
  color: var(--ivory);
}

.v2-reader__img {
  width: 100%;
  margin-top: 40px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.v2-reader__body {
  margin-top: 40px;
}

.v2-reader__body p {
  margin-bottom: 20px;
  font-size: 1.02rem;
  line-height: 1.95;
  color: var(--ivory-dim);
  white-space: pre-line;
}

.v2-fade-enter-active,
.v2-fade-leave-active {
  transition: opacity 0.5s var(--ease);
}

.v2-fade-enter-from,
.v2-fade-leave-to {
  opacity: 0;
}

/* Cookie notice */
.v2-cookie {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 45;
  width: min(420px, calc(100vw - 48px));
  padding: 28px;
  background: var(--bg-2);
  border: 1px solid var(--line);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
}

.v2-cookie__title {
  font-family: var(--serif);
  font-size: 1.35rem;
  color: var(--ivory);
}

.v2-cookie__text {
  margin-top: 10px;
  font-size: 0.86rem;
  line-height: 1.7;
  color: var(--ivory-dim);
}

.v2-cookie__text a {
  color: var(--gold-light);
  border-bottom: 1px solid currentColor;
}

.v2-cookie__actions {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-top: 22px;
}

.v2-cookie__decline {
  font-size: 0.66rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--muted);
  transition: color 0.3s;
}

.v2-cookie__decline:hover {
  color: var(--ivory);
}

.v2-rise-enter-active,
.v2-rise-leave-active {
  transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
}

.v2-rise-enter-from,
.v2-rise-leave-to {
  opacity: 0;
  transform: translateY(24px);
}

/* Responsive */
@media (max-width: 960px) {
  .v2-nav {
    display: none;
  }

  .v2-header__actions {
    margin-left: auto;
  }

  .v2-burger {
    display: block;
  }

  .v2-hero {
    padding-top: 128px;
  }

  .v2-hero__grid {
    grid-template-columns: 1fr;
  }

  .v2-hero__figure {
    justify-self: start;
    width: calc(100% - 22px);
    max-width: 420px;
    margin-top: 48px;
  }

  .v2-hero__seal {
    left: -4px;
    font-size: clamp(5rem, 22vw, 8rem);
  }

  .v2-about__grid,
  .v2-areas__grid,
  .v2-news__grid {
    grid-template-columns: 1fr;
  }

  .v2-areas__panel {
    display: none;
  }

  .v2-area__btn::before {
    display: none;
  }

  .v2-area__inline {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.6s var(--ease);
  }

  .v2-area__inline p {
    overflow: hidden;
    font-size: 0.95rem;
    line-height: 1.85;
    color: var(--ivory-dim);
  }

  .v2-area.is-active .v2-area__inline {
    grid-template-rows: 1fr;
    padding-bottom: 24px;
  }

  .v2-area.is-active .v2-area__inline p + p {
    margin-top: 14px;
  }

  .v2-offices {
    grid-template-columns: 1fr;
  }

  .v2-profile {
    grid-template-columns: 1fr;
    grid-template-rows: 42vh 1fr;
  }

  .v2-profile__photo::after {
    background: linear-gradient(180deg, rgba(7, 19, 28, 0) 50%, rgba(7, 19, 28, 1) 100%);
  }

  .v2-profile__content > .v2-close {
    position: fixed;
    top: 20px;
    right: 20px;
    margin: 0;
    padding: 10px 14px;
    background: rgba(7, 19, 28, 0.75);
  }
}

@media (max-width: 640px) {
  .v2-header__inner {
    height: 76px;
  }

  .v2-brand img {
    height: 36px;
  }

  .v2-hero__foot {
    flex-direction: column;
    align-items: flex-start;
  }

  .v2-hero__cities {
    gap: 6px 22px;
  }

  .v2-team__head,
  .v2-news__head {
    flex-direction: column;
    align-items: flex-start;
  }

  .v2-arrows {
    display: none;
  }

  .v2-team__track {
    grid-auto-columns: 72vw;
  }

  .v2-post--row {
    grid-template-columns: 38% 1fr;
    gap: 18px;
  }

  .v2-post--row .v2-post__title {
    font-size: 1.15rem;
  }

  .v2-footer__top {
    flex-direction: column;
    align-items: flex-start;
  }

  .v2-footer__grid {
    grid-template-columns: 1fr;
  }

  .v2-cookie {
    right: 12px;
    bottom: 12px;
    width: calc(100vw - 24px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .v2 *,
  .v2 *::before,
  .v2 *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
