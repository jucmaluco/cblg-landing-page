<template>
  <div class="v1">
    <!-- Header -->
    <header class="v1-header" :class="{ 'is-solid': scrolled && !menuOpen }">
      <div class="v1-container v1-header__inner">
        <a href="#top" class="v1-brand" aria-label="CBLG Advogados" @click.prevent="go('top')">
          <img src="/logo-25-anos-white.png" alt="CBLG Advogados" class="v1-brand__img v1-brand__img--light">
          <img src="/logo-25-anos.png" alt="" aria-hidden="true" class="v1-brand__img v1-brand__img--dark">
        </a>

        <nav class="v1-nav">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="v1-nav__link"
            @click.prevent="go(item.id)"
          >{{ t(item.label) }}</a>
        </nav>

        <div class="v1-header__actions">
          <LanguageToggle :inverted="!scrolled || menuOpen" />
          <button
            type="button"
            class="v1-burger"
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

    <Transition name="v1-menu">
      <div v-if="menuOpen" class="v1-menu">
        <nav class="v1-container v1-menu__nav">
          <a
            v-for="(item, index) in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="v1-menu__link"
            :style="{ '--i': index }"
            @click.prevent="go(item.id)"
          >
            <span class="v1-menu__num">{{ ROMAN[index] }}</span>
            {{ t(item.label) }}
          </a>
        </nav>
        <p class="v1-container v1-menu__foot">
          <a :href="telHref(offices[0].phone)">{{ offices[0].phone }}</a>
        </p>
      </div>
    </Transition>

    <main>
      <!-- Hero -->
      <section id="top" class="v1-hero">
        <div class="v1-hero__media" role="img" :aria-label="t('rd.buildingAlt')"></div>
        <div class="v1-container v1-hero__content">
          <p class="v1-eyebrow v1-eyebrow--gold">Castello Branco, Lobosco &amp; Gama Advogados</p>
          <h1 class="v1-hero__title">
            {{ t('rd.hero.lead') }} <em>{{ t('rd.hero.em') }}</em> {{ t('rd.hero.tail') }}
          </h1>
          <p class="v1-hero__lead">{{ t('about.lead') }}</p>
          <div class="v1-hero__actions">
            <a href="#contato" class="v1-btn v1-btn--gold" @click.prevent="go('contato')">{{ t('hero.cta') }}</a>
            <a href="#equipe" class="v1-textlink v1-textlink--light" @click.prevent="go('equipe')">{{ t('rd.meetTeam') }}</a>
          </div>
        </div>
        <div class="v1-hero__band">
          <div class="v1-container v1-hero__band-inner">
            <span class="v1-hero__band-label">{{ t('rd.offices') }}</span>
            <ul class="v1-hero__cities">
              <li v-for="office in offices" :key="office.city">{{ office.city }}</li>
            </ul>
            <a :href="telHref(offices[0].phone)" class="v1-hero__phone">{{ offices[0].phone }}</a>
          </div>
        </div>
      </section>

      <!-- I. Sobre -->
      <section id="sobre" class="v1-section v1-about">
        <div class="v1-container v1-about__grid">
          <div class="v1-about__text">
            <div class="v1-mark" v-reveal><span>I</span></div>
            <h2 class="v1-h2" v-reveal>{{ t('footer.about') }}</h2>
            <p class="v1-about__statement" v-reveal>{{ t('footer.tagline') }}</p>
            <p class="v1-body" v-reveal>{{ t('about.body') }}</p>
          </div>
          <figure class="v1-about__figure" v-reveal>
            <img src="/foto_mesa.png" :alt="t('rd.meetingAlt')" loading="lazy">
          </figure>
          <dl class="v1-facts">
            <div v-for="fact in facts" :key="fact.label" class="v1-fact" v-reveal>
              <dt>{{ fact.value }}</dt>
              <dd>{{ t(fact.label) }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- II. Equipe -->
      <section id="equipe" class="v1-section v1-team">
        <div class="v1-container">
          <div class="v1-mark" v-reveal><span>II</span></div>
          <h2 class="v1-h2" v-reveal>{{ t('footer.team') }}</h2>
          <ul class="v1-team__grid">
            <li
              v-for="(member, index) in team"
              :key="member.nome"
              v-reveal
              :style="{ '--delay': `${(index % 5) * 70}ms` }"
            >
              <button type="button" class="v1-member" @click="activeMember = member">
                <span class="v1-member__photo">
                  <img :src="member.foto" :alt="member.nome" loading="lazy">
                </span>
                <span class="v1-member__name">{{ member.nome }}</span>
                <span class="v1-member__cta">{{ t('rd.viewProfile') }}</span>
              </button>
            </li>
          </ul>
        </div>
      </section>

      <!-- III. Áreas de atuação -->
      <section id="areas" class="v1-section v1-areas">
        <div class="v1-container">
          <div class="v1-areas__head">
            <div>
              <div class="v1-mark v1-mark--light" v-reveal><span>III</span></div>
              <h2 class="v1-h2 v1-h2--light" v-reveal>{{ t('footer.areas') }}</h2>
            </div>
            <p class="v1-areas__count" v-reveal>
              <span>{{ pad(practiceAreas.length) }}</span>
              {{ t('rd.areasCount') }}
            </p>
          </div>

          <ol class="v1-areas__list">
            <li
              v-for="(area, index) in practiceAreas"
              :key="area.titulo"
              class="v1-area"
              :class="{ 'is-open': openArea === index }"
            >
              <h3 class="v1-area__heading">
                <button
                  type="button"
                  class="v1-area__toggle"
                  :aria-expanded="openArea === index"
                  :aria-controls="`v1-area-${index}`"
                  @click="openArea = openArea === index ? null : index"
                >
                  <span class="v1-area__num">{{ pad(index + 1) }}</span>
                  <span class="v1-area__title">{{ titleCase(localized(area, 'titulo')) }}</span>
                  <span class="v1-area__icon" aria-hidden="true"></span>
                </button>
              </h3>
              <div :id="`v1-area-${index}`" class="v1-area__panel">
                <div class="v1-area__panel-inner">
                  <p v-for="(paragraph, i) in paragraphs(localized(area, 'descricao'))" :key="i">{{ paragraph }}</p>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <!-- IV. Notícias -->
      <section id="noticias" class="v1-section v1-news">
        <div class="v1-container">
          <div class="v1-news__head">
            <div>
              <div class="v1-mark" v-reveal><span>IV</span></div>
              <h2 class="v1-h2" v-reveal>{{ t('rd.news') }}</h2>
            </div>
            <a href="/blog" class="v1-textlink" v-reveal>{{ t('rd.viewAll') }}</a>
          </div>

          <ul v-if="postsLoading" class="v1-news__grid" aria-busy="true">
            <li v-for="n in 3" :key="n" class="v1-post v1-post--skeleton">
              <span class="v1-post__img"></span>
              <span class="v1-skeleton-line"></span>
              <span class="v1-skeleton-line v1-skeleton-line--wide"></span>
              <span class="v1-skeleton-line v1-skeleton-line--wide"></span>
            </li>
          </ul>
          <p v-else-if="postsError" class="v1-body">{{ t('blog.error') }}</p>
          <p v-else-if="!posts.length" class="v1-body">{{ t('blog.empty') }}</p>
          <ul v-else class="v1-news__grid">
            <li v-for="(post, index) in posts" :key="post.id" v-reveal :style="{ '--delay': `${index * 90}ms` }">
              <button type="button" class="v1-post" @click="activePost = post">
                <span class="v1-post__img">
                  <img v-if="post.cover" :src="post.cover" :alt="post.title" loading="lazy">
                </span>
                <span class="v1-post__meta">
                  <span>{{ post.author }}</span>
                  <span>{{ formatDate(post.publishedAt) }}</span>
                </span>
                <span class="v1-post__title">{{ post.title }}</span>
                <span class="v1-post__excerpt">{{ post.excerpt }}</span>
                <span class="v1-post__more">{{ t('blog.readMore') }}</span>
              </button>
            </li>
          </ul>
        </div>
      </section>

      <!-- V. Contato -->
      <section id="contato" class="v1-section v1-contact">
        <div class="v1-container v1-contact__grid">
          <div class="v1-contact__intro">
            <div class="v1-mark v1-mark--light" v-reveal><span>V</span></div>
            <h2 class="v1-h2 v1-h2--light" v-reveal>{{ t('rd.contact') }}</h2>
            <figure class="v1-contact__figure" v-reveal>
              <img src="/foto_itens_cblg.jpeg" :alt="t('contact.imageAlt')" loading="lazy">
            </figure>
          </div>
          <ul class="v1-offices">
            <li v-for="office in offices" :key="office.city" class="v1-office" v-reveal>
              <p class="v1-office__label">{{ t(office.key) }}</p>
              <h3 class="v1-office__city">{{ office.city }}</h3>
              <address class="v1-office__address">
                <span v-for="line in office.lines" :key="line">{{ line }}</span>
              </address>
              <div class="v1-office__links">
                <a :href="telHref(office.phone)">{{ t('contact.phone') }} {{ office.phone }}</a>
                <a :href="mapsUrl(office)" target="_blank" rel="noopener">{{ t('rd.map') }}</a>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="v1-footer">
      <div class="v1-container v1-footer__grid">
        <div class="v1-footer__brand">
          <img src="/logo-25-anos-white.png" alt="CBLG Advogados">
          <p>{{ t('footer.tagline') }}</p>
        </div>
        <div class="v1-footer__col">
          <h4>{{ t('footer.quickLinks') }}</h4>
          <a
            v-for="item in navItems.slice(0, 3)"
            :key="item.id"
            :href="`#${item.id}`"
            @click.prevent="go(item.id)"
          >{{ t(item.label) }}</a>
          <a href="/blog">{{ t('footer.blog') }}</a>
        </div>
        <div class="v1-footer__col">
          <h4>{{ t('footer.legal') }}</h4>
          <a href="/privacy-policy">{{ t('footer.privacy') }}</a>
        </div>
        <div class="v1-footer__col">
          <h4>{{ t('footer.social') }}</h4>
          <a :href="socialLinks.linkedin" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i> LinkedIn</a>
          <a :href="socialLinks.instagram" target="_blank" rel="noopener"><i class="fab fa-instagram"></i> Instagram</a>
        </div>
      </div>
      <div class="v1-container v1-footer__bottom">
        <p>&copy; 2025 Castello Branco, Lobosco &amp; Gama Advogados. {{ t('footer.rights') }}</p>
      </div>
    </footer>

    <!-- Team member drawer -->
    <Transition name="v1-drawer">
      <div
        v-if="activeMember"
        class="v1-drawer"
        role="dialog"
        aria-modal="true"
        :aria-label="activeMember.nome"
        @click.self="activeMember = null"
      >
        <article class="v1-drawer__panel">
          <button type="button" class="v1-close" @click="activeMember = null">{{ t('rd.close') }}</button>
          <header class="v1-drawer__head">
            <img :src="activeMember.foto" :alt="activeMember.nome" class="v1-drawer__photo">
            <div>
              <p class="v1-eyebrow">CBLG Advogados</p>
              <h3 class="v1-drawer__name">{{ activeMember.nome }}</h3>
              <div class="v1-drawer__links">
                <a v-if="activeMember.email" :href="`mailto:${activeMember.email}`">{{ activeMember.email }}</a>
                <a v-if="activeMember.linkedin" :href="activeMember.linkedin" target="_blank" rel="noopener">
                  <i class="fab fa-linkedin-in"></i> LinkedIn
                </a>
              </div>
            </div>
          </header>
          <div class="v1-drawer__body">
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
    <Transition name="v1-fade">
      <div
        v-if="activePost"
        class="v1-reader"
        role="dialog"
        aria-modal="true"
        :aria-label="activePost.title"
        @click.self="activePost = null"
      >
        <article class="v1-reader__panel">
          <button type="button" class="v1-close" @click="activePost = null">{{ t('rd.close') }}</button>
          <p class="v1-post__meta">
            <span>{{ activePost.author }}</span>
            <span>{{ formatDate(activePost.publishedAt) }}</span>
          </p>
          <h3 class="v1-reader__title">{{ activePost.title }}</h3>
          <img v-if="activePost.coverLarge" :src="activePost.coverLarge" :alt="activePost.title" class="v1-reader__img">
          <div class="v1-reader__body">
            <p v-for="(paragraph, i) in paragraphs(activePost.body)" :key="i">{{ paragraph }}</p>
          </div>
        </article>
      </div>
    </Transition>

    <!-- Cookie notice -->
    <Transition name="v1-rise">
      <aside v-if="cookie.visible.value" class="v1-cookie" :aria-label="t('cookie.title')">
        <p class="v1-cookie__title">{{ t('cookie.title') }}</p>
        <p class="v1-cookie__text">{{ t('cookie.text') }}</p>
        <a href="/privacy-policy" class="v1-cookie__link">{{ t('cookie.privacy') }}</a>
        <div class="v1-cookie__actions">
          <button type="button" class="v1-btn v1-btn--ink" @click="cookie.accept">{{ t('cookie.accept') }}</button>
          <button type="button" class="v1-cookie__decline" @click="cookie.decline">{{ t('cookie.decline') }}</button>
        </div>
      </aside>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import LanguageToggle from '../LanguageToggle.vue'
import { t, localized, formatDate } from '../i18n.js'
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

loadFonts('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap')
usePageBackground('#092335')

const ROMAN = ['I', 'II', 'III', 'IV', 'V']

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
const openArea = ref(0)
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
</script>

<style scoped>
.v1 {
  --ink: #092335;
  --ink-deep: #061825;
  --ink-darker: #04111b;
  --paper: #f7f3ec;
  --paper-2: #efe8dc;
  --paper-3: #e4dbcb;
  --gold: #d19b45;
  --gold-soft: #dcb471;
  --gold-ink: #8a6424;
  --text: #2b3843;
  --muted: #5d6973;
  --line: rgba(9, 35, 53, 0.14);
  --line-light: rgba(247, 243, 236, 0.16);
  --serif: 'Cormorant Garamond', 'Times New Roman', serif;
  --sans: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
  --ease: cubic-bezier(0.2, 0.7, 0.2, 1);

  background: var(--paper);
  color: var(--text);
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.7;
  font-variant-numeric: lining-nums;
  -webkit-font-smoothing: antialiased;
  overflow-x: clip;
}

.v1 *,
.v1 *::before,
.v1 *::after {
  box-sizing: border-box;
}

/* Resets use :where() so component classes always win */
:where(.v1) :where(h1, h2, h3, h4, p, ul, ol, dl, dd, figure, address) {
  margin: 0;
  padding: 0;
}

:where(.v1) :where(ul, ol) {
  list-style: none;
}

:where(.v1) a {
  color: inherit;
  text-decoration: none;
}

:where(.v1) button {
  font: inherit;
  color: inherit;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  text-align: inherit;
}

:where(.v1) img {
  display: block;
  max-width: 100%;
}

.v1 :focus-visible {
  outline: 1px solid var(--gold);
  outline-offset: 4px;
}

.v1-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-inline: clamp(20px, 5vw, 64px);
}

.v1-section {
  padding-block: clamp(96px, 12vw, 168px);
  scroll-margin-top: 40px;
}

/* Reveal on scroll */
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
  transition-delay: var(--delay, 0ms);
}

.reveal.is-revealed {
  opacity: 1;
  transform: none;
}

/* Type */
.v1-eyebrow {
  font-family: var(--sans);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold-ink);
}

.v1-eyebrow--gold {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--gold);
}

.v1-eyebrow--gold::before {
  content: '';
  width: 40px;
  height: 1px;
  background: currentColor;
}

.v1-mark {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 22px;
  color: var(--gold-ink);
}

.v1-mark span {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.35rem;
  line-height: 1;
}

.v1-mark::after {
  content: '';
  width: 56px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}

.v1-mark--light {
  color: var(--gold);
}

.v1-h2 {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(2.6rem, 5.2vw, 4.4rem);
  line-height: 1;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.v1-h2--light {
  color: var(--paper);
}

.v1-body {
  font-size: 1rem;
  line-height: 1.85;
  color: var(--text);
}

.v1-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 18px 32px;
  font-family: var(--sans);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  transition: background-color 0.4s var(--ease), color 0.4s var(--ease);
}

.v1-btn--gold {
  background: var(--gold);
  color: var(--ink);
}

.v1-btn--gold:hover {
  background: var(--paper);
}

.v1-btn--ink {
  background: var(--ink);
  color: var(--paper);
  padding: 14px 24px;
}

.v1-btn--ink:hover {
  background: var(--gold-ink);
}

.v1-textlink {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink);
}

.v1-textlink::after {
  content: '';
  width: 28px;
  height: 1px;
  background: currentColor;
  transition: width 0.5s var(--ease);
}

.v1-textlink:hover::after {
  width: 52px;
}

.v1-textlink--light {
  color: var(--paper);
}

/* Header */
.v1-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  transition: background-color 0.5s var(--ease), box-shadow 0.5s var(--ease);
}

.v1-header.is-solid {
  background: rgba(247, 243, 236, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 1px 0 var(--line);
}

.v1-header__inner {
  display: flex;
  align-items: center;
  gap: 40px;
  height: 92px;
  transition: height 0.5s var(--ease);
}

.v1-header.is-solid .v1-header__inner {
  height: 76px;
}

.v1-brand {
  position: relative;
  display: block;
  flex-shrink: 0;
  height: 46px;
}

.v1-brand__img {
  height: 100%;
  width: auto;
  transition: opacity 0.4s var(--ease);
}

.v1-brand__img--dark {
  position: absolute;
  inset: 0;
  opacity: 0;
}

.v1-header.is-solid .v1-brand__img--light {
  opacity: 0;
}

.v1-header.is-solid .v1-brand__img--dark {
  opacity: 1;
}

.v1-nav {
  display: flex;
  gap: clamp(20px, 2.6vw, 40px);
  margin-left: auto;
}

.v1-nav__link {
  position: relative;
  padding-block: 6px;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(247, 243, 236, 0.86);
  transition: color 0.4s var(--ease);
}

.v1-nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s var(--ease);
}

.v1-nav__link:hover {
  color: #fff;
}

.v1-nav__link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.v1-header.is-solid .v1-nav__link {
  color: var(--ink);
}

.v1-header__actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.v1-header__actions :deep(.lang-toggle) {
  order: 0;
  margin: 0;
  font-family: var(--sans);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.18em;
}

.v1-burger {
  display: none;
  position: relative;
  width: 30px;
  height: 30px;
  order: 2;
}

.v1-burger span {
  position: absolute;
  left: 3px;
  right: 3px;
  height: 1px;
  background: var(--paper);
  transition: transform 0.45s var(--ease), background-color 0.3s;
}

.v1-burger span:first-child {
  top: 11px;
}

.v1-burger span:last-child {
  top: 19px;
}

.v1-header.is-solid .v1-burger span {
  background: var(--ink);
}

.v1-burger.is-open span:first-child {
  transform: translateY(4px) rotate(45deg);
}

.v1-burger.is-open span:last-child {
  transform: translateY(-4px) rotate(-45deg);
}

/* Mobile menu */
.v1-menu {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 128px 0 40px;
  background: var(--ink);
}

.v1-menu__nav {
  display: flex;
  flex-direction: column;
}

.v1-menu__link {
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 16px 0;
  border-bottom: 1px solid var(--line-light);
  font-family: var(--serif);
  font-size: clamp(2rem, 8vw, 2.8rem);
  line-height: 1.1;
  color: var(--paper);
  opacity: 0;
  transform: translateY(12px);
  animation: v1-menu-in 0.7s var(--ease) forwards;
  animation-delay: calc(80ms + var(--i) * 60ms);
}

.v1-menu__num {
  width: 36px;
  font-size: 1rem;
  font-style: italic;
  color: var(--gold);
}

.v1-menu__foot {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: rgba(247, 243, 236, 0.6);
}

@keyframes v1-menu-in {
  to {
    opacity: 1;
    transform: none;
  }
}

.v1-menu-enter-active,
.v1-menu-leave-active {
  transition: opacity 0.45s var(--ease);
}

.v1-menu-enter-from,
.v1-menu-leave-to {
  opacity: 0;
}

/* Hero */
.v1-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100vh;
  min-height: 100svh;
  padding-top: 140px;
  background: var(--ink);
  color: var(--paper);
  overflow: hidden;
  isolation: isolate;
}

.v1-hero__media {
  position: absolute;
  inset: 0;
  z-index: -2;
  background: url('/fachada-predio-saopaulo.jpg') 62% 40% / cover no-repeat;
  transform: scale(1.08);
  animation: v1-settle 14s var(--ease) forwards;
}

.v1-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(4, 17, 27, 0.75) 0%, rgba(4, 17, 27, 0) 24%),
    linear-gradient(100deg, rgba(4, 17, 27, 0.95) 0%, rgba(6, 24, 37, 0.86) 34%, rgba(9, 35, 53, 0.5) 68%, rgba(9, 35, 53, 0.35) 100%),
    linear-gradient(0deg, rgba(4, 17, 27, 0.85) 0%, rgba(4, 17, 27, 0) 38%);
}

@keyframes v1-settle {
  to {
    transform: scale(1);
  }
}

.v1-hero__content {
  padding-bottom: clamp(72px, 10vh, 120px);
}

.v1-hero__title {
  max-width: 15ch;
  margin-top: 28px;
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(2.9rem, 6vw, 5.6rem);
  line-height: 0.98;
  letter-spacing: -0.015em;
  color: var(--paper);
}

.v1-hero__title em {
  font-style: italic;
  font-weight: 400;
  color: var(--gold-soft);
}

.v1-hero__lead {
  max-width: 36rem;
  margin-top: 32px;
  font-size: 1.02rem;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(247, 243, 236, 0.8);
}

.v1-hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 32px;
  margin-top: 44px;
}

.v1-hero__content > * {
  opacity: 0;
  transform: translateY(20px);
  animation: v1-menu-in 1.1s var(--ease) forwards;
}

.v1-hero__content > :nth-child(2) { animation-delay: 0.12s; }
.v1-hero__content > :nth-child(3) { animation-delay: 0.24s; }
.v1-hero__content > :nth-child(4) { animation-delay: 0.36s; }

.v1-hero__band {
  border-top: 1px solid var(--line-light);
  background: rgba(4, 17, 27, 0.35);
}

.v1-hero__band-inner {
  display: flex;
  align-items: center;
  gap: 40px;
  min-height: 76px;
}

.v1-hero__band-label {
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold);
}

.v1-hero__cities {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 36px;
}

.v1-hero__cities li {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.3rem;
  color: var(--paper);
}

.v1-hero__phone {
  margin-left: auto;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  color: rgba(247, 243, 236, 0.75);
  transition: color 0.3s;
}

.v1-hero__phone:hover {
  color: var(--gold);
}

/* About */
.v1-about__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: clamp(20px, 3vw, 40px);
  row-gap: clamp(72px, 9vw, 120px);
  align-items: center;
}

.v1-about__text {
  grid-column: 1 / span 5;
}

.v1-about__statement {
  margin: 40px 0 28px;
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(1.6rem, 2.6vw, 2.2rem);
  line-height: 1.25;
  color: var(--gold-ink);
}

.v1-about__figure {
  position: relative;
  grid-column: 7 / span 6;
}

.v1-about__figure::before {
  content: '';
  position: absolute;
  inset: 24px -24px -24px 24px;
  border: 1px solid rgba(209, 155, 69, 0.55);
  z-index: 0;
}

.v1-about__figure img {
  position: relative;
  z-index: 1;
  width: 100%;
  aspect-ratio: 5 / 4;
  object-fit: cover;
}

.v1-facts {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--line);
}

.v1-fact {
  padding: 36px 0 0;
}

.v1-fact + .v1-fact {
  padding-left: clamp(20px, 4vw, 56px);
  border-left: 1px solid var(--line);
}

.v1-fact dt {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(3.6rem, 7vw, 5.8rem);
  line-height: 1;
  color: var(--ink);
}

.v1-fact dd {
  margin-top: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold-ink);
}

/* Team */
.v1-team {
  background: var(--paper-2);
}

.v1-team__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 48px clamp(16px, 2vw, 28px);
  margin-top: clamp(56px, 7vw, 88px);
}

.v1-member {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.v1-member__photo {
  position: relative;
  display: block;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--paper-3);
}

.v1-member__photo::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 0 1px rgba(209, 155, 69, 0);
  transition: box-shadow 0.6s var(--ease);
}

.v1-member__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 15%;
  filter: grayscale(1) contrast(1.04);
  transition: filter 0.8s var(--ease), transform 1.4s var(--ease);
}

.v1-member:hover .v1-member__photo img,
.v1-member:focus-visible .v1-member__photo img {
  filter: grayscale(0) contrast(1);
  transform: scale(1.045);
}

.v1-member:hover .v1-member__photo::after {
  box-shadow: inset 0 0 0 1px rgba(209, 155, 69, 0.9);
}

.v1-member__name {
  margin-top: 18px;
  font-family: var(--serif);
  font-weight: 500;
  font-size: 1.32rem;
  line-height: 1.2;
  color: var(--ink);
}

.v1-member__cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold-ink);
}

.v1-member__cta::after {
  content: '';
  width: 20px;
  height: 1px;
  background: currentColor;
  transition: width 0.5s var(--ease);
}

.v1-member:hover .v1-member__cta::after {
  width: 40px;
}

/* Practice areas */
.v1-areas {
  background: var(--ink);
  color: var(--paper);
}

.v1-areas__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: clamp(48px, 6vw, 80px);
}

.v1-areas__count {
  display: flex;
  align-items: baseline;
  gap: 14px;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(247, 243, 236, 0.6);
}

.v1-areas__count span {
  font-family: var(--serif);
  font-size: 2.6rem;
  letter-spacing: 0;
  color: var(--gold);
}

.v1-areas__list {
  border-top: 1px solid var(--line-light);
}

.v1-area {
  border-bottom: 1px solid var(--line-light);
}

.v1-area__heading {
  font: inherit;
}

.v1-area__toggle {
  display: grid;
  grid-template-columns: 72px 1fr 28px;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 28px 0;
}

.v1-area__num {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.15rem;
  color: var(--gold);
}

.v1-area__title {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(1.45rem, 2.6vw, 2.15rem);
  line-height: 1.15;
  color: var(--paper);
  transition: color 0.4s var(--ease), transform 0.6s var(--ease);
}

.v1-area__toggle:hover .v1-area__title {
  color: var(--gold-soft);
  transform: translateX(8px);
}

.v1-area__icon {
  position: relative;
  width: 18px;
  height: 18px;
  justify-self: end;
}

.v1-area__icon::before,
.v1-area__icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--gold);
  transition: transform 0.5s var(--ease);
}

.v1-area__icon::after {
  transform: rotate(90deg);
}

.v1-area.is-open .v1-area__icon::after {
  transform: rotate(0deg);
}

.v1-area.is-open .v1-area__title {
  color: var(--gold-soft);
}

.v1-area__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.6s var(--ease);
}

.v1-area.is-open .v1-area__panel {
  grid-template-rows: 1fr;
}

.v1-area__panel-inner {
  overflow: hidden;
  padding-left: 88px;
  columns: 2;
  column-gap: 56px;
}

.v1-area__panel-inner p {
  break-inside: avoid;
  margin-bottom: 18px;
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 1.85;
  color: rgba(247, 243, 236, 0.78);
}

.v1-area.is-open .v1-area__panel-inner {
  padding-bottom: 28px;
}

/* News */
.v1-news__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: clamp(48px, 6vw, 80px);
}

.v1-news__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(24px, 3vw, 44px);
}

.v1-post {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.v1-post__img {
  display: block;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background: var(--paper-2);
}

.v1-post__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.4s var(--ease);
}

.v1-post:hover .v1-post__img img {
  transform: scale(1.05);
}

.v1-post__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  margin-top: 22px;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold-ink);
}

.v1-post__title {
  margin-top: 12px;
  font-family: var(--serif);
  font-weight: 500;
  font-size: 1.55rem;
  line-height: 1.2;
  color: var(--ink);
}

.v1-post__excerpt {
  display: -webkit-box;
  margin-top: 12px;
  font-size: 0.9rem;
  line-height: 1.75;
  color: var(--muted);
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.v1-post__more {
  margin-top: auto;
  padding-top: 20px;
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink);
}

.v1-post--skeleton .v1-post__img,
.v1-skeleton-line {
  animation: v1-pulse 1.6s ease-in-out infinite;
}

.v1-skeleton-line {
  display: block;
  height: 12px;
  width: 40%;
  margin-top: 18px;
  background: var(--paper-2);
}

.v1-skeleton-line--wide {
  width: 90%;
  margin-top: 10px;
}

@keyframes v1-pulse {
  50% {
    opacity: 0.5;
  }
}

/* Contact */
.v1-contact {
  background: var(--ink-deep);
  color: var(--paper);
}

.v1-contact__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: clamp(20px, 3vw, 40px);
  row-gap: 64px;
}

.v1-contact__intro {
  grid-column: 1 / span 5;
}

.v1-contact__figure {
  margin-top: 56px;
}

.v1-contact__figure img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  filter: saturate(0.85);
}

.v1-offices {
  grid-column: 7 / span 6;
  align-self: end;
}

.v1-office {
  padding: 36px 0;
  border-top: 1px solid var(--line-light);
}

.v1-office:last-child {
  border-bottom: 1px solid var(--line-light);
}

.v1-office__label {
  font-size: 0.64rem;
  font-weight: 500;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--gold);
}

.v1-office__city {
  margin-top: 10px;
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(2rem, 3.4vw, 2.7rem);
  line-height: 1.05;
  color: var(--paper);
}

.v1-office__address {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  font-style: normal;
  font-size: 0.92rem;
  font-weight: 300;
  line-height: 1.75;
  color: rgba(247, 243, 236, 0.75);
}

.v1-office__links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 28px;
  margin-top: 18px;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.v1-office__links a {
  color: var(--paper);
  border-bottom: 1px solid rgba(209, 155, 69, 0.5);
  padding-bottom: 3px;
  transition: color 0.3s, border-color 0.3s;
}

.v1-office__links a:hover {
  color: var(--gold);
  border-color: var(--gold);
}

/* Footer */
.v1-footer {
  background: var(--ink-darker);
  color: rgba(247, 243, 236, 0.7);
  padding-top: clamp(72px, 8vw, 104px);
}

.v1-footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 64px;
}

.v1-footer__brand img {
  width: 220px;
  height: auto;
}

.v1-footer__brand p {
  margin-top: 24px;
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.2rem;
  color: rgba(247, 243, 236, 0.75);
}

.v1-footer__col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 0.88rem;
}

.v1-footer__col h4 {
  margin-bottom: 8px;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--gold);
}

.v1-footer__col a {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  transition: color 0.3s;
}

.v1-footer__col a:hover {
  color: var(--paper);
}

.v1-footer__bottom p {
  padding-block: 28px;
  border-top: 1px solid var(--line-light);
}

.v1-footer__bottom {
  font-size: 0.74rem;
  letter-spacing: 0.04em;
  color: rgba(247, 243, 236, 0.5);
}

/* Shared overlay pieces */
.v1-close {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--ink);
}

.v1-close::after {
  content: '';
  width: 18px;
  height: 18px;
  background:
    linear-gradient(45deg, transparent calc(50% - 0.5px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 0.5px)),
    linear-gradient(-45deg, transparent calc(50% - 0.5px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 0.5px));
  transition: transform 0.5s var(--ease);
}

.v1-close:hover::after {
  transform: rotate(90deg);
}

/* Drawer */
.v1-drawer {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  justify-content: flex-end;
  background: rgba(4, 17, 27, 0.55);
}

.v1-drawer__panel {
  position: relative;
  width: min(640px, 100%);
  height: 100%;
  overflow-y: auto;
  padding: 36px clamp(24px, 5vw, 64px) 64px;
  background: var(--paper);
}

.v1-drawer__panel > .v1-close {
  display: flex;
  margin-left: auto;
}

.v1-drawer__head {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 28px;
  align-items: end;
  margin-top: 40px;
  padding-bottom: 36px;
  border-bottom: 1px solid var(--line);
}

.v1-drawer__photo {
  width: 140px;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: 50% 15%;
}

.v1-drawer__name {
  margin-top: 10px;
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(1.9rem, 4vw, 2.5rem);
  line-height: 1.05;
  color: var(--ink);
}

.v1-drawer__links {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 16px;
  font-size: 0.85rem;
}

.v1-drawer__links a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  color: var(--gold-ink);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}

.v1-drawer__links a:hover {
  border-color: currentColor;
}

.v1-drawer__body h4 {
  margin: 36px 0 16px;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--gold-ink);
}

.v1-drawer__body p {
  margin-bottom: 16px;
  font-size: 0.95rem;
  line-height: 1.85;
}

.v1-drawer__body li {
  position: relative;
  padding: 12px 0 12px 22px;
  border-bottom: 1px solid var(--line);
  font-size: 0.9rem;
  line-height: 1.6;
}

.v1-drawer__body li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 23px;
  width: 10px;
  height: 1px;
  background: var(--gold);
}

.v1-drawer-enter-active,
.v1-drawer-leave-active {
  transition: background-color 0.55s var(--ease);
}

.v1-drawer-enter-active .v1-drawer__panel,
.v1-drawer-leave-active .v1-drawer__panel {
  transition: transform 0.55s var(--ease);
}

.v1-drawer-enter-from,
.v1-drawer-leave-to {
  background-color: rgba(4, 17, 27, 0);
}

.v1-drawer-enter-from .v1-drawer__panel,
.v1-drawer-leave-to .v1-drawer__panel {
  transform: translateX(100%);
}

/* Reader */
.v1-reader {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  justify-content: center;
  padding: clamp(0px, 4vw, 48px);
  overflow-y: auto;
  background: rgba(4, 17, 27, 0.7);
}

.v1-reader__panel {
  width: min(820px, 100%);
  height: fit-content;
  padding: 36px clamp(24px, 6vw, 72px) 72px;
  background: var(--paper);
}

.v1-reader__panel > .v1-close {
  display: flex;
  margin-left: auto;
  margin-bottom: 32px;
}

.v1-reader__title {
  margin-top: 16px;
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(2rem, 4.4vw, 3rem);
  line-height: 1.1;
  color: var(--ink);
}

.v1-reader__img {
  width: 100%;
  margin-top: 36px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.v1-reader__body {
  margin-top: 36px;
}

.v1-reader__body p {
  margin-bottom: 18px;
  font-size: 1rem;
  line-height: 1.9;
  white-space: pre-line;
}

.v1-fade-enter-active,
.v1-fade-leave-active {
  transition: opacity 0.45s var(--ease);
}

.v1-fade-enter-from,
.v1-fade-leave-to {
  opacity: 0;
}

/* Cookie notice */
.v1-cookie {
  position: fixed;
  left: 24px;
  bottom: 24px;
  z-index: 45;
  width: min(400px, calc(100vw - 48px));
  padding: 28px 28px 24px;
  background: var(--paper);
  border-top: 2px solid var(--gold);
  box-shadow: 0 24px 60px rgba(4, 17, 27, 0.28);
}

.v1-cookie__title {
  font-family: var(--serif);
  font-weight: 500;
  font-size: 1.35rem;
  color: var(--ink);
}

.v1-cookie__text {
  margin-top: 10px;
  font-size: 0.82rem;
  line-height: 1.7;
  color: var(--muted);
}

.v1-cookie__link {
  display: inline-block;
  margin-top: 10px;
  font-size: 0.78rem;
  color: var(--gold-ink);
  border-bottom: 1px solid currentColor;
}

.v1-cookie__actions {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.v1-cookie__decline {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
}

.v1-cookie__decline:hover {
  color: var(--ink);
}

.v1-rise-enter-active,
.v1-rise-leave-active {
  transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
}

.v1-rise-enter-from,
.v1-rise-leave-to {
  opacity: 0;
  transform: translateY(24px);
}

/* Responsive */
@media (max-width: 1100px) {
  .v1-team__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 960px) {
  .v1-nav {
    display: none;
  }

  .v1-header__actions {
    margin-left: auto;
  }

  .v1-burger {
    display: block;
  }

  .v1-about__text,
  .v1-about__figure,
  .v1-contact__intro,
  .v1-offices {
    grid-column: 1 / -1;
  }

  .v1-about__figure {
    margin-right: 24px;
  }

  .v1-team__grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .v1-news__grid {
    grid-template-columns: 1fr 1fr;
  }

  .v1-area__panel-inner {
    columns: 1;
  }

  .v1-footer__grid {
    grid-template-columns: 1fr 1fr;
  }

  .v1-footer__brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 640px) {
  .v1-header__inner {
    height: 76px;
  }

  .v1-brand {
    height: 36px;
  }

  .v1-hero__band-inner {
    flex-wrap: wrap;
    gap: 10px 24px;
    padding-block: 20px;
  }

  .v1-hero__phone {
    margin-left: 0;
  }

  .v1-hero__cities li {
    font-size: 1.1rem;
  }

  .v1-facts {
    grid-template-columns: 1fr;
  }

  .v1-fact + .v1-fact {
    padding-left: 0;
    border-left: 0;
    border-top: 1px solid var(--line);
    margin-top: 28px;
  }

  .v1-team__grid {
    grid-template-columns: 1fr 1fr;
    gap: 36px 16px;
  }

  .v1-member__name {
    font-size: 1.15rem;
  }

  .v1-news__grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .v1-news__head,
  .v1-areas__head {
    flex-direction: column;
    align-items: flex-start;
  }

  .v1-area__toggle {
    grid-template-columns: 44px 1fr 20px;
    padding: 22px 0;
  }

  .v1-area__panel-inner {
    padding-left: 60px;
  }

  .v1-drawer__head {
    grid-template-columns: 96px 1fr;
    gap: 20px;
  }

  .v1-drawer__photo {
    width: 96px;
  }

  .v1-footer__grid {
    grid-template-columns: 1fr;
  }

  .v1-cookie {
    left: 12px;
    bottom: 12px;
    width: calc(100vw - 24px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .v1 *,
  .v1 *::before,
  .v1 *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
