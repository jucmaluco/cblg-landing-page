import { ref, watch, onMounted, onUnmounted } from 'vue'
import { createClient } from 'contentful'

const CONTENTFUL = {
  space: 'ka3j7fcma8dg',
  environment: 'master',
  accessToken: 'TQ0bwmHQ6CrRtV3fp-ZJXhO-Lu59Q_dtZ61ByDnWJM4'
}

const FONT_ORIGINS = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com']

// Fonts are injected per page so the original site does not download the redesign typefaces
export const loadFonts = (href) => {
  FONT_ORIGINS.forEach((origin) => {
    if (document.head.querySelector(`link[rel="preconnect"][href="${origin}"]`)) return
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = origin
    if (origin.includes('gstatic')) link.crossOrigin = ''
    document.head.appendChild(link)
  })
  if (document.head.querySelector(`link[data-font="${href}"]`)) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.dataset.font = href
  document.head.appendChild(link)
}

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

let revealObserver = null
const getRevealObserver = () => {
  revealObserver ??= new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-revealed')
      revealObserver.unobserve(entry.target)
    })
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
  return revealObserver
}

// The hidden starting state is only applied from JS, so content stays visible if it never runs
export const vReveal = {
  mounted(el) {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return
    el.classList.add('reveal')
    getRevealObserver().observe(el)
  },
  unmounted(el) {
    revealObserver?.unobserve(el)
  }
}

export const useScrolled = (offset = 24) => {
  const scrolled = ref(false)
  const update = () => { scrolled.value = window.scrollY > offset }
  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })
  onUnmounted(() => window.removeEventListener('scroll', update))
  return scrolled
}

export const useScrollLock = (locked) => {
  watch(locked, (value) => {
    document.documentElement.style.overflow = value ? 'hidden' : ''
  })
  onUnmounted(() => { document.documentElement.style.overflow = '' })
}

export const useEscape = (handler) => {
  const onKeydown = (event) => { if (event.key === 'Escape') handler() }
  onMounted(() => window.addEventListener('keydown', onKeydown))
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))
}

// Keeps the overscroll area in the page colour instead of flashing white
export const usePageBackground = (color) => {
  onMounted(() => { document.documentElement.style.backgroundColor = color })
  onUnmounted(() => { document.documentElement.style.backgroundColor = '' })
}

export const useCookieConsent = () => {
  const visible = ref(false)
  onMounted(() => {
    try {
      visible.value = !localStorage.getItem('cookieConsent')
    } catch (_) {
      visible.value = true
    }
  })
  const decide = (value) => {
    try {
      localStorage.setItem('cookieConsent', value)
    } catch (_) {
      // noop
    }
    visible.value = false
  }
  return { visible, accept: () => decide('accepted'), decline: () => decide('declined') }
}

const contentfulImage = (file, width) =>
  file?.url ? `https:${file.url}?w=${width}&q=78&fm=webp` : null

const excerpt = (text, maxLength = 160) => {
  if (!text) return ''
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length <= maxLength ? clean : `${clean.slice(0, maxLength).trimEnd()}…`
}

export const useLatestPosts = (limit = 3) => {
  const posts = ref([])
  const loading = ref(true)
  const error = ref(false)

  onMounted(async () => {
    try {
      const client = createClient(CONTENTFUL)
      const response = await client.getEntries({
        content_type: 'post',
        order: '-fields.publishedAt',
        limit
      })
      posts.value = response.items.map((item) => ({
        id: item.sys.id,
        title: item.fields.title,
        author: item.fields.author,
        publishedAt: item.fields.publishedAt,
        cover: contentfulImage(item.fields.coverImage?.fields?.file, 960),
        coverLarge: contentfulImage(item.fields.coverImage?.fields?.file, 1600),
        body: item.fields.body || '',
        excerpt: excerpt(item.fields.body)
      }))
    } catch (err) {
      console.error('Error fetching blog posts:', err)
      error.value = true
    } finally {
      loading.value = false
    }
  })

  return { posts, loading, error }
}

export const paragraphs = (text) =>
  (text || '')
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)

const LOWERCASE_WORDS = new Set(['a', 'e', 'o', 'as', 'os', 'da', 'de', 'do', 'das', 'dos', 'em', 'and', 'of', 'the', 'for', 'in', 'to'])
const UPPERCASE_WORDS = new Set(['ESG', 'M&A', 'CBLG'])

// Practice area titles are stored in caps; the serif layouts read better in title case
export const titleCase = (text) =>
  (text || '')
    .toLocaleLowerCase('pt-BR')
    .split(' ')
    .map((word, index) => {
      const upper = word.toLocaleUpperCase('pt-BR')
      if (UPPERCASE_WORDS.has(upper.replace(/[^\p{L}&]/gu, ''))) return upper
      if (index > 0 && LOWERCASE_WORDS.has(word)) return word
      return word.charAt(0).toLocaleUpperCase('pt-BR') + word.slice(1)
    })
    .join(' ')

export const pad = (value) => String(value).padStart(2, '0')

export const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`

export const mapsUrl = (office) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.lines.join(', '))}`

export const scrollToSection = (id) => {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
