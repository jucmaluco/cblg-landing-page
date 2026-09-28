<template>
  <div class="landing-page">
    <!-- Navbar -->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <a href="#hero" @click.prevent="scrollTo('hero')" class="nav-logo">
          <img src="/logo-25-anos.png" alt="CBLG Advogados" class="logo-img">
        </a>
        <button class="nav-toggle" @click="isNavOpen = !isNavOpen" :aria-label="t('nav.openMenu')">
          <i class="fas fa-bars"></i>
        </button>
        <ul class="nav-links" :class="{ open: isNavOpen }">
          <li><a href="#sobre" @click.prevent="scrollTo('sobre'); isNavOpen = false">{{ t('nav.about') }}</a></li>
          <li><a href="#equipe" @click.prevent="scrollTo('equipe'); isNavOpen = false">{{ t('nav.team') }}</a></li>
          <li><a href="#areas" @click.prevent="scrollTo('areas'); isNavOpen = false">{{ t('nav.areas') }}</a></li>
          <li><a href="/blog" @click="isNavOpen = false">{{ t('nav.news') }}</a></li>
          <li><a href="#contato" @click.prevent="scrollTo('contato'); isNavOpen = false">{{ t('nav.contact') }}</a></li>
        </ul>
        <LanguageToggle :inverted="!isScrolled" />
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="hero">
      <div class="hero-content">
        <img src="/logo-25-anos.png" alt="CBLG Advogados" class="hero-logo">
        <button class="hero-cta" @click="scrollTo('contato')">{{ t('hero.cta') }}</button>
      </div>
      <div class="scroll-indicator" @click="scrollTo('sobre')">
        <i class="fas fa-chevron-down"></i>
      </div>
    </section>

    <!-- Sobre Section -->
    <section id="sobre" class="sobre">
      <div class="container">
        <h2 class="section-title">{{ t('about.title') }}</h2>
        <p class="section-description">
          <strong>{{ t('about.lead') }}</strong>
        </p>
        <p class="section-description">
          {{ t('about.body') }}
        </p>
        
      </div>
    </section>

    <!-- Equipe Section -->
    <section id="equipe" class="equipe">
      <div class="container">
        <h2 class="equipe-subtitle">{{ t('team.title') }}</h2>
        <div class="equipe-carousel-wrapper">
          <button 
            class="equipe-nav-btn prev" 
            @click="prevEquipe" 
            :disabled="currentEquipeIndex === 0"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <div class="equipe-carousel-container" ref="carouselContainerRef">
            <div class="equipe-carousel" :style="{ transform: `translateX(-${currentEquipeIndex * equipeScrollAmount}px)` }">
              <div v-for="(membro, index) in equipe" :key="index" class="equipe-member">
                <div 
                  class="equipe-photo-container" 
                  :class="{ active: selectedMembro === index, 'miguel-photo': membro.nome === 'Miguel Barbado Neto' }"
                  @click="openTeamModal(membro)"
                >
                  <img :src="membro.foto" :alt="membro.nome" class="equipe-photo" :class="{ 'miguel-img': membro.nome === 'Miguel Barbado Neto' }">
                </div>
                <h3 class="equipe-nome">{{ membro.nome }}</h3>
                
                <transition name="slide-down">
                  <div v-if="selectedMembro === index" class="equipe-details">
                    <div class="equipe-bio">
  <p v-for="(par, i) in paragraphs(localized(membro, 'bio'))" :key="i">{{ par }}</p>
</div>
                    <div class="equipe-especialidades">
                      <strong>{{ t('team.education') }}:</strong>
                      <ul>
                        <li v-for="(item, idx) in localized(membro, 'formacao')" :key="idx">{{ item }}</li>
                      </ul>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
          
          <button 
            class="equipe-nav-btn next" 
            @click="nextEquipe"
            :disabled="currentEquipeIndex >= maxEquipeIndex"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- Áreas de Atuação Section -->
    <section id="areas" class="areas">
      <div class="container">
        <h2 class="section-title">{{ t('areas.title') }}</h2>
        <div class="areas-grid">
          <div 
            v-for="(area, index) in areas" 
            :key="index" 
            class="area-card"
            @click="openAreaModal(area)"
          >
            <div class="area-icon">
              <i :class="area.icon"></i>
            </div>
            <h3 class="area-title">{{ localized(area, 'titulo') }}</h3>
            <div class="area-title-line"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Preview Section -->
    <section id="blog-preview" class="blog-preview">
      <div class="container">
        <h2 class="section-title">{{ t('blog.latest') }}</h2>
        
        <div v-if="blogLoading" class="blog-loading">
          <div class="loading-spinner"></div>
          <p>{{ t('blog.loading') }}</p>
        </div>
        
        <div v-else-if="blogError" class="blog-error">
          <p>{{ t('blog.error') }}</p>
        </div>
        
        <div v-else-if="blogPosts.length === 0" class="blog-no-posts">
          <p>{{ t('blog.empty') }}</p>
        </div>
        
        <div v-else class="blog-carousel-wrapper">
          <button 
            class="blog-nav-btn prev" 
            @click="prevBlog" 
            :disabled="currentBlogIndex === 0"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <div class="blog-carousel-container" ref="blogCarouselContainerRef">
            <div class="blog-carousel" :style="{ transform: `translateX(-${currentBlogIndex * blogScrollAmount}px)` }">
              <div v-for="(post, index) in blogPosts" :key="post.id" class="blog-card">
                <div class="blog-image">
                  <img :src="post.coverImage" :alt="post.title" />
                </div>
                <div class="blog-content">
                  <div class="blog-meta">
                    <span class="blog-author">{{ post.author }}</span>
                    <span class="blog-date">{{ formatDate(post.publishedAt) }}</span>
                  </div>
                  <h3 class="blog-title">{{ post.title }}</h3>
                  <p class="blog-excerpt">{{ post.excerpt }}</p>
                  <button class="blog-read-more" @click="viewBlogPost(post)">{{ t('blog.readMore') }}</button>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            class="blog-nav-btn next" 
            @click="nextBlog"
            :disabled="currentBlogIndex >= maxBlogIndex"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div v-if="!blogLoading && !blogError && blogPosts.length > 0" class="blog-cta">
          <a href="/blog" class="blog-cta-button">{{ t('blog.seeMore') }}</a>
        </div>
      </div>
    </section>

    <!-- Contato Section -->
    <section id="contato" class="contato">
      <div class="container">
        <h2 class="section-title">{{ t('contact.title') }}</h2>
        <div class="contato-content">
          <div class="contato-info">
            <div class="unidade">
              <h4>{{ t('contact.saoPaulo') }}</h4>
              <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <p>Rua Ferreira de Araújo, 221, 7º Andar<br>05428-000 - Pinheiros - São Paulo - SP</p>
              </div>
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <p>{{ t('contact.phone') }} +55 (11) 3817-4001</p>
              </div>
            </div>
            <div class="unidade">
              <h4>{{ t('contact.curitiba') }}</h4>
              <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <p>R. Francisco Rocha, 62 - conj.703<br>80420-130 - Batel - Curitiba - PR</p>
              </div>
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <p>{{ t('contact.phone') }} +55 (11) 3817-4001</p>
              </div>
            </div>
            <div class="unidade">
              <h4>{{ t('contact.rio') }}</h4>
              <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <p>Rua Visconde de Piraja, 414, sala 718<br>22410-002 - Ipanema - Rio de Janeiro - RJ</p>
              </div>
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <p>{{ t('contact.phone') }} +55 (11) 3817-4001</p>
              </div>
            </div>
          </div>
          <div class="contato-img-wrapper">
            <img src="/foto_itens_cblg.jpeg" :alt="t('contact.imageAlt')" class="contato-image" />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <img src="/logo-25-anos-white.png" alt="CBLG Advogados" class="footer-logo">
            <p>{{ t('footer.tagline') }}</p>
          </div>
          <div class="footer-section">
            <h4>{{ t('footer.quickLinks') }}</h4>
            <ul>
              <li><a href="#sobre" @click.prevent="scrollTo('sobre')">{{ t('footer.about') }}</a></li>
              <li><a href="#equipe" @click.prevent="scrollTo('equipe')">{{ t('footer.team') }}</a></li>
              <li><a href="#areas" @click.prevent="scrollTo('areas')">{{ t('footer.areas') }}</a></li>
              <li><a href="/privacy-policy">{{ t('footer.privacy') }}</a></li>

            </ul>
          </div>

          <div class="footer-section">
            <h4>{{ t('footer.social') }}</h4>
            <div class="social-links">
              <a href="https://www.linkedin.com/company/cblg-adv-br/" target="_blank" rel="noopener"><i class="fab fa-linkedin"></i></a>
              <a href="https://instagram.com/cblgadvogados/" target="_blank" rel="noopener"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 Castello Branco, Lobosco & Gama Advogados. {{ t('footer.rights') }}</p>
        </div>
      </div>
    </footer>

    <!-- Cookie Consent Popup -->
    <div v-if="showCookiePopup" class="cookie-popup">
      <div class="cookie-content">
        <div class="cookie-text">
          <h3>{{ t('cookie.title') }}</h3>
          <p>{{ t('cookie.text') }}</p>
          <p class="privacy-link">
            <a href="/privacy-policy">{{ t('cookie.privacy') }}</a>
          </p>
        </div>
        <div class="cookie-buttons">
          <button @click="acceptCookies" class="cookie-accept">{{ t('cookie.accept') }}</button>
          <button @click="declineCookies" class="cookie-decline">{{ t('cookie.decline') }}</button>
        </div>
      </div>
    </div>

    <!-- Team Member Modal -->
    <div v-if="selectedTeamMember" class="modal-overlay" @click="closeTeamModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeTeamModal">
          <i class="fas fa-times"></i>
        </button>
        <div class="modal-header">
          <div class="modal-image">
            <img 
              :src="selectedTeamMember.foto" 
              :alt="selectedTeamMember.nome"
              class="modal-member-photo"
            />
          </div>
          <div class="modal-member-info">
            <h2 class="modal-member-name">{{ selectedTeamMember.nome }}</h2>
            <p class="modal-member-email">{{ selectedTeamMember.email || getEmail(selectedTeamMember.nome) }}</p>
            <a v-if="selectedTeamMember.linkedin" :href="selectedTeamMember.linkedin" target="_blank" rel="noopener" class="modal-linkedin-link">
              <i class="fab fa-linkedin"></i>
              LinkedIn
            </a>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-member-bio">
  <h3>{{ t('team.about') }}</h3>
  <p v-for="(par, i) in paragraphs(localized(selectedTeamMember, 'bio'))" :key="i">{{ par }}</p>
</div>

          <div class="modal-member-specialties">
            <h3>{{ t('team.education') }}</h3>
            <ul>
              <li v-for="(item, idx) in localized(selectedTeamMember, 'formacao')" :key="idx">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Area Modal -->
    <div v-if="selectedArea" class="modal-overlay" @click="closeAreaModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeAreaModal">
          <i class="fas fa-times"></i>
        </button>
        <div class="modal-header">
          <div class="modal-icon">
            <i :class="selectedArea.icon"></i>
          </div>
          <div class="modal-area-info">
            <h2 class="modal-area-title">{{ localized(selectedArea, 'titulo') }}</h2>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-area-description">
            <p>{{ localized(selectedArea, 'descricao') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Blog Post Modal -->
    <div v-if="selectedBlogPost" class="modal-overlay" @click="closeBlogModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeBlogModal">
          <i class="fas fa-times"></i>
        </button>
        <div class="modal-header">
          <div class="modal-blog-image">
            <img 
              :src="selectedBlogPost.coverImage" 
              :alt="selectedBlogPost.title"
              class="modal-blog-photo"
            />
          </div>
          <div class="modal-blog-info">
            <h2 class="modal-blog-title">{{ selectedBlogPost.title }}</h2>
            <div class="modal-blog-meta">
              <span class="modal-blog-author">{{ selectedBlogPost.author }}</span>
              <span class="modal-blog-date">{{ formatDate(selectedBlogPost.publishedAt) }}</span>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-blog-content">
            <div v-html="formatContent(selectedBlogPost.body)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { createClient } from 'contentful'
import LanguageToggle from './LanguageToggle.vue'
import { t, localized, formatDate } from './i18n.js'
import { team, practiceAreas } from './content.js'

const isScrolled = ref(false)
const isNavOpen = ref(false)
const hoveredArea = ref(null)
const expandedArea = ref(null)
const currentEquipeIndex = ref(0)
const selectedMembro = ref(null)
const equipeScrollAmount = ref(270) // largura do card + gap
const itemsPerView = ref(4) // quantos itens visíveis por vez
const selectedTeamMember = ref(null)
const selectedArea = ref(null)
const selectedBlogPost = ref(null)
const showCookiePopup = ref(false)
const currentBlogIndex = ref(0)
const blogScrollAmount = ref(350) // largura do card + gap
const blogItemsPerView = ref(3) // quantos itens visíveis por vez

const paragraphs = (text) =>
  (text || '')
    .split(/\n\s*\n/) // separa quando encontra linha em branco
    .map(t => t.trim())
    .filter(Boolean)

const equipe = ref(team)


// Blog posts data
const blogPosts = ref([])
const blogLoading = ref(true)
const blogError = ref(null)

// Softer pastel palette for area cards (lighter colors)
const areaCardColors = [
  '#F4F9FF', '#FDF6F0', '#F5F7E8', '#F6F0FA', '#EAF7F6', '#FFF7F9', '#F3F9F1', '#F8F4F0',
  '#F0F7FF', '#F5FAFF', '#FFF5F7', '#F5FFF8', '#F8F6FF', '#F6FFFD', '#F9F8F2', '#F7FBFF'
]
const getAreaCardStyle = (idx) => ({ background: areaCardColors[idx % areaCardColors.length] })

const maxEquipeIndex = computed(() => {
  const totalItems = equipe.value.length
  const visibleItems = itemsPerView.value
  const maxIndex = Math.max(0, totalItems - visibleItems)
  return maxIndex
})

const maxBlogIndex = computed(() => {
  const totalItems = blogPosts.value.length
  const visibleItems = blogItemsPerView.value
  const maxIndex = Math.max(0, totalItems - visibleItems)
  return maxIndex
})

const areas = ref(practiceAreas)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollTo = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}

const nextEquipe = () => {
  const maxIndex = maxEquipeIndex.value
  console.log('nextEquipe - current:', currentEquipeIndex.value, 'max:', maxIndex, 'total:', equipe.value.length, 'itemsPerView:', itemsPerView.value)
  
  if (currentEquipeIndex.value < maxIndex) {
    currentEquipeIndex.value++
  }
  // Garantir que não vá além do limite
  if (currentEquipeIndex.value > maxIndex) {
    currentEquipeIndex.value = maxIndex
  }
}

const prevEquipe = () => {
  if (currentEquipeIndex.value > 0) {
    currentEquipeIndex.value--
  }
}

const toggleMembro = (index) => {
  if (selectedMembro.value === index) {
    selectedMembro.value = null
  } else {
    selectedMembro.value = index
  }
}

const openTeamModal = (membro) => {
  selectedTeamMember.value = membro
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}

const closeTeamModal = () => {
  selectedTeamMember.value = null
  document.body.style.overflow = 'auto' // Restore scrolling
}

const openAreaModal = (area) => {
  selectedArea.value = area
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}

const closeAreaModal = () => {
  selectedArea.value = null
  document.body.style.overflow = 'auto' // Restore scrolling
}

const nextBlog = () => {
  const maxIndex = maxBlogIndex.value
  if (currentBlogIndex.value < maxIndex) {
    currentBlogIndex.value++
  }
  if (currentBlogIndex.value > maxIndex) {
    currentBlogIndex.value = maxIndex
  }
}

const prevBlog = () => {
  if (currentBlogIndex.value > 0) {
    currentBlogIndex.value--
  }
}

const viewBlogPost = (post) => {
  selectedBlogPost.value = post
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}

const closeBlogModal = () => {
  selectedBlogPost.value = null
  document.body.style.overflow = 'auto' // Restore scrolling
}

const formatContent = (content) => {
  return content.replace(/\n/g, '<br>')
}

const fetchBlogPosts = async () => {
  try {
    const client = createClient({
      space: 'ka3j7fcma8dg',
      environment: 'master',
      accessToken: 'TQ0bwmHQ6CrRtV3fp-ZJXhO-Lu59Q_dtZ61ByDnWJM4'
    })
    
    const response = await client.getEntries({
      content_type: 'post',
      order: '-fields.publishedAt',
      limit: 6 // Limit to 6 posts for preview
    })
    
    // Transform Contentful data to match our blog preview format
    blogPosts.value = response.items.map(item => {
      const coverImageUrl = item.fields.coverImage?.fields?.file?.url 
        ? `https:${item.fields.coverImage.fields.file.url}` 
        : '/default-blog-image.jpg'
      
      console.log('Blog post image URL:', coverImageUrl) // Debug log
      
      return {
        id: item.sys.id,
        title: item.fields.title,
        author: item.fields.author,
        publishedAt: item.fields.publishedAt,
        coverImage: coverImageUrl,
        excerpt: getExcerpt(item.fields.body),
        body: item.fields.body
      }
    })
    
    blogLoading.value = false
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    blogError.value = true
    blogLoading.value = false
  }
}

const getExcerpt = (text, maxLength = 150) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const getEmail = (nome) => {
  // Convert name to email format
  const emailName = nome.toLowerCase()
    .replace(/\s+/g, '') // Remove spaces
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[ñ]/g, 'n')
  return `${emailName}@cblg.com`
}

const toggleArea = (index) => {
  if (expandedArea.value === index) {
    expandedArea.value = null
  } else {
    expandedArea.value = index
  }
}

const handleSubmit = () => {
  alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
}

const acceptCookies = () => {
  localStorage.setItem('cookieConsent', 'accepted')
  showCookiePopup.value = false
}

const declineCookies = () => {
  localStorage.setItem('cookieConsent', 'declined')
  showCookiePopup.value = false
}

const showPrivacyPolicy = () => {
  alert('Política de Privacidade: Esta página está em desenvolvimento. Em breve, você poderá acessar nossa política de privacidade completa.')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleWindowResize)
  // Initial layout after mount
  setTimeout(() => {
    computeEquipeLayout()
    computeBlogLayout()
  }, 0)
  
  // Fetch blog posts
  fetchBlogPosts()
  
  // Always show cookie popup for testing
  showCookiePopup.value = true
  
  // Check if cookie consent was already given (commented out for testing)
  // const cookieConsent = localStorage.getItem('cookieConsent')
  // if (!cookieConsent) {
  //   showCookiePopup.value = true
  // }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
// Dynamic sizing for equipe carousel
const carouselContainerRef = ref(null)
const blogCarouselContainerRef = ref(null)
let resizeTimeoutId = null

const computeEquipeLayout = () => {
  try {
    const containerEl = carouselContainerRef.value
    if (!containerEl) return
    const carouselEl = containerEl.querySelector('.equipe-carousel')
    const firstCard = containerEl.querySelector('.equipe-member')
    if (!carouselEl || !firstCard) return

    const containerWidth = containerEl.clientWidth
    const cardRect = firstCard.getBoundingClientRect()
    const gapString = window.getComputedStyle(carouselEl).gap || window.getComputedStyle(carouselEl).columnGap || '0px'
    const gap = parseFloat(gapString) || 0
    const cardTotal = Math.ceil(cardRect.width + gap)
    const possible = Math.max(1, Math.floor((containerWidth + gap) / cardTotal))
    itemsPerView.value = possible
    equipeScrollAmount.value = cardTotal

    // Clamp current index if needed after recalculation
    const maxIndex = Math.max(0, equipe.value.length - itemsPerView.value)
    if (currentEquipeIndex.value > maxIndex) {
      currentEquipeIndex.value = maxIndex
    }
  } catch (_) {
    // noop
  }
}

const computeBlogLayout = () => {
  try {
    const containerEl = blogCarouselContainerRef.value
    if (!containerEl) return
    const carouselEl = containerEl.querySelector('.blog-carousel')
    const firstCard = containerEl.querySelector('.blog-card')
    if (!carouselEl || !firstCard) return

    const containerWidth = containerEl.clientWidth
    const cardRect = firstCard.getBoundingClientRect()
    const gapString = window.getComputedStyle(carouselEl).gap || window.getComputedStyle(carouselEl).columnGap || '0px'
    const gap = parseFloat(gapString) || 0
    const cardTotal = Math.ceil(cardRect.width + gap)
    const possible = Math.max(1, Math.floor((containerWidth + gap) / cardTotal))
    blogItemsPerView.value = possible
    blogScrollAmount.value = cardTotal

    // Clamp current index if needed after recalculation
    const maxIndex = Math.max(0, blogPosts.value.length - blogItemsPerView.value)
    if (currentBlogIndex.value > maxIndex) {
      currentBlogIndex.value = maxIndex
    }
  } catch (_) {
    // noop
  }
}

const handleWindowResize = () => {
  if (resizeTimeoutId) window.clearTimeout(resizeTimeoutId)
  resizeTimeoutId = window.setTimeout(() => {
    computeEquipeLayout()
    computeBlogLayout()
  }, 100)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleWindowResize)
  // Initial layout after mount
  setTimeout(() => computeEquipeLayout(), 0)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleWindowResize)
  if (resizeTimeoutId) window.clearTimeout(resizeTimeoutId)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.landing-page {
  font-family: 'Roboto Mono', 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  color: #333;
  overflow-x: hidden;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  backdrop-filter: none;
  transition: all 0.3s ease;
  padding: 1.25rem 0;
  border-bottom: none;
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}

.nav-container {
  width: 100vw;
  margin: 0;
  padding: 0 2rem 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: auto;
}

.logo-img {
  height: 56px;
  width: auto;
  transition: transform 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 3.5rem;
  font-family: 'Roboto Mono', 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  font-size: 1.15rem;
  margin-left: auto;
  padding-right: 2rem;
}

.nav-links a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 400;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #c9a961;
  transition: width 0.3s ease;
}

.nav-links a:hover {
  color: #c9a961;
}
.navbar:not(.scrolled) .nav-links a { color: #fff; }
.navbar:not(.scrolled) .nav-links a:hover { color: #fff; }
.navbar:not(.scrolled) .nav-links a::after { background: #fff; }
.navbar:not(.scrolled) .nav-toggle { color: #fff; }
.navbar.scrolled .nav-links a { color: #2c3e50; }
.navbar.scrolled .nav-links a:hover { color: #c9a961; }
.navbar.scrolled .nav-links a::after { background: #c9a961; }


.nav-links a:hover::after {
  width: 100%;
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #2c3e50;
  cursor: pointer;
}

/* Hero Section */
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/background-fachada.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(255,255,255,0.0), rgba(255,255,255,0.0));
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #2c3e50;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-logo {
  max-width: 520px;
  width: min(90%, 520px);
  height: auto;
  margin-bottom: 1.75rem;
  animation: fadeInUp 1s ease;
  filter: drop-shadow(0 4px 12px rgba(44, 62, 80, 0.12));
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  animation: fadeInUp 1s ease;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2.5rem;
  color: #c9a961;
  animation: fadeInUp 1s ease 0.2s both;
  letter-spacing: 1px;
}

.hero-deco {
  max-width: 720px;
  width: 90%;
  height: auto;
  border-radius: 6px;
  margin: 0 auto 1.25rem;
  display: block;
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.18);
}

.hero-cta {
  padding: 1.2rem 3rem;
  font-size: 1rem;
  background: #2c3e50;
  color: #fff;
  border: 2px solid #2c3e50;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease 0.4s both;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  display: inline-block;
  margin: 0 auto;
}

.hero-cta:hover {
  transform: translateY(-3px);
  background: transparent;
  color: #2c3e50;
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.2);
}

.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  color: #c9a961;
  cursor: pointer;
  animation: bounce 2s infinite;
  z-index: 10;
  transition: all 0.3s ease;
}

.scroll-indicator:hover {
  color: #2c3e50;
  transform: translateX(-50%) scale(1.1);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Common Sections */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  font-family: 'Roboto Mono', 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 2.5rem;
  text-align: center;
  margin: 0 auto 1.5rem;
  color: #2c3e50;
  position: relative;
  padding-bottom: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: block;
  width: fit-content;
}
.section-title-areas{
  font-family: 'Roboto Mono', 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 2.5rem;
  text-align: center;
  margin: 0 auto 3rem;
  color: #f9fbfd;
  position: relative;
  padding-bottom: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: block;
  width: fit-content;
}

.section-title-areas::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 3px;
  background: #c9a961;
  border-radius: 2px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 3px;
  background: #c9a961;
  border-radius: 2px;
}

/* Sobre Section */
.sobre {
  padding: 3rem 0 2rem 0;
  background: linear-gradient(178deg, #ffffff 0%, #ffffff 100%);
}

.sobre-badge {
  display: block;
  width: 190px;
  max-width: 40vw;
  margin: -0.5rem auto 2rem;
  opacity: 0.9;
}

.section-description {
  max-width: 900px;
  margin: 0 auto 2rem;
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #2c3e50;
}

.valores-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-top: 4rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.valor-card {
  background: #fff;
  padding: 2.5rem;
  border-left: 4px solid #c9a961;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.valor-card:hover {
  transform: translateX(10px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.12);
}

.valor-card h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.valor-card p {
  color: #4a5568;
  line-height: 1.7;
  font-size: 1rem;
}

/* Equipe Section */
.equipe {
  padding: 3rem 0 3rem;
  background: #f0f5f8;
}

.equipe-subtitle {
  font-family: 'Roboto Mono', 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 2.5rem;
  text-align: center;
  margin: 0 auto 2rem;
  color: #2c3e50;
  position: relative;
  padding-bottom: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: block;
  width: fit-content;
}

.equipe-subtitle::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 3px;
  background: #c9a961;
  border-radius: 2px;
}

.equipe-carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0;
  width: 100vw;
  max-width: none;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: 0;
}

.equipe-carousel-container {
  overflow: hidden;
  flex: 1;
  width: 100vw;
  max-width: none;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}

.equipe-carousel {
  display: flex;
  gap: 0.75rem;
  transition: transform 0.5s ease;
  will-change: transform;
}

.equipe-member {
  flex: 0 0 300px;
  min-width: 300px;
  text-align: center;
}

.equipe-photo-container {
  width: 100%;
  height: 340px;
  margin: 0 0 0 0;
  border-radius: 4px;
  overflow: hidden;
  border: none;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.equipe-photo-container::after {
  content: '\f05a';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #c9a961;
  color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.equipe-photo-container:hover::after {
  opacity: 1;
}

.equipe-photo-container:hover {
  transform: scale(1.01);
}

.equipe-photo-container.active {
  box-shadow: 0 10px 24px rgba(0,0,0,0.18);
}

.equipe-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.equipe-photo.miguel-img {
  object-position: center 20%;
  transform: scale(1.15);
}

.equipe-photo-container:hover .equipe-photo {
  filter: grayscale(0%);
}

.equipe-nome {
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.equipe-details {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #c9a961;
}

.equipe-bio {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  text-align: justify;
}

.equipe-especialidades {
  color: #2c3e50;
}

.equipe-especialidades strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.equipe-especialidades ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.equipe-especialidades li {
  padding: 0.3rem 0;
  color: #4a5568;
  font-size: 0.9rem;
  position: relative;
  padding-left: 1rem;
}

.equipe-especialidades li::before {
  content: '•';
  color: #c9a961;
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* Animação slide-down */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.equipe-nav-btn {
  position: absolute;
  top: 40%;
  background: #c9a961;
  color: #fff;
  border: 2px solid #c9a961;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  z-index: 5;
  box-shadow: 0 4px 12px rgba(201, 169, 97, 0.3);
  transition: all 0.3s ease;
}
.equipe-nav-btn.prev { left: 8px; }
.equipe-nav-btn.next { right: 8px; }

.equipe-nav-btn:hover:not(:disabled) {
  background: #b8941f;
  border-color: #b8941f;
  transform: scale(1.15);
  box-shadow: 0 6px 20px rgba(201, 169, 97, 0.5);
}

.equipe-nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Áreas de Atuação Section */
.areas {
  padding: 3rem 0 6rem 0;
  background: #ffffff;
}

.areas-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3.5rem;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 5rem;
}

.area-card {
  background: #ffffff;
  border: 1px solid #c9a961;
  border-radius: 4px;
  padding: 2rem 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(201, 169, 97, 0.15);
  transform: translateY(-2px);
}

.area-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #c9a961;
  transition: width 0.3s ease;
  z-index: 0;
}

.area-card:hover::before {
  width: 4px;
}

.area-card:hover {
  box-shadow: 0 6px 16px rgba(201, 169, 97, 0.25);
  transform: translateY(-4px);
}

.area-icon {
  position: relative;
  z-index: 2;
  margin-bottom: 1rem;
}

.area-icon i {
  font-size: 2rem;
  color: #b8941f;
  transition: all 0.3s ease;
  transform: scale(1.05);
}

.area-card:hover .area-icon i {
  color: #a8841a;
  transform: scale(1.1);
}

.area-title {
  position: relative;
  z-index: 2;
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
  transition: color 0.3s ease;
}

.area-card:hover .area-title {
  color: #2c3e50;
}

.area-title-line {
  width: 40px;
  height: 2px;
  background: #c9a961;
  margin: 0 auto;
  transition: width 0.3s ease;
}

.area-card:hover .area-title-line {
  width: 60px;
}


/* Contato Section */
.contato {
  padding: 3rem 0;
  background: #ffffff;
}

.contato-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contato-info {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.unidade {
  background: #f8f9fa;
  padding: 2rem;
  border-left: 3px solid #c9a961;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.unidade:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transform: translateX(5px);
}

.unidade h4 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.info-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.info-item i {
  font-size: 1.2rem;
  color: #c9a961;
  margin-top: 0.25rem;
}

.info-item p {
  color: #4a5568;
  line-height: 1.6;
  font-size: 0.95rem;
}

.contato-img-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contato-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

/* Footer */
.footer {
  background: #2c3e50;
  color: #fff;
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-logo {
  max-width: 250px;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.footer-section h3 {
  margin-bottom: 1rem;
  color: #c9a961;
  font-size: 1.2rem;
}

.footer-section h4 {
  margin-bottom: 1rem;
  color: #c9a961;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1rem;
}

.footer-section p {
  color: #bdc3c7;
  line-height: 1.6;
  font-size: 0.95rem;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.footer-section ul li a:hover {
  color: #c9a961;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  width: 40px;
  height: 40px;
  background: rgba(201, 169, 97, 0.15);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c9a961;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: #c9a961;
  color: #2c3e50;
  transform: translateY(-3px);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e0;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .equipe-carousel-container {
    max-width: 840px;
  }

  .equipe-member {
    flex: 0 0 260px;
    min-width: 260px;
  }

  .equipe-photo-container {
    width: 100%;
    height: 260px;
  }
}

@media (max-width: 1024px) {
  .equipe-carousel-container {
    max-width: 720px;
  }

  .equipe-member {
    flex: 0 0 240px;
    min-width: 240px;
  }

  .equipe-photo-container {
    width: 100%;
    height: 220px;
  }
}

@media (max-width: 768px) {
  .navbar { 
    padding: 0.5rem 0;
  }
  
  .nav-container { 
    padding: 0 0.75rem;
    justify-content: space-between;
  }
  
  .contato-image {
    max-height: 280px;
  }
  
  .nav-toggle {
    display: block;
    order: 2;
  }

  .nav-links {
    position: absolute;
    top: 64px;
    right: 1rem;
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.06);
    border-radius: 6px;
    padding: 0.75rem 1rem;
    flex-direction: column;
    gap: 0.5rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    display: none;
    align-items: flex-end;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links a {
    color: #2c3e50 !important;
    text-align: right;
    padding: 0.5rem 0;
    width: auto;
  }

  .nav-links a:hover {
    color: #c9a961 !important;
  }

  .logo-img { 
    height: 44px;
    order: 1;
  }

  .hero-logo { max-width: 280px; }

  .nav-links { gap: 1.25rem; font-size: 1rem; }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .equipe-carousel-wrapper {
    gap: 0;
    padding: 0;
  }

  .equipe-carousel-container {
    max-width: none;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .equipe-carousel-container::-webkit-scrollbar {
    display: none;
  }

  .equipe-member {
    flex: 0 0 150px;
    min-width: 150px;
    scroll-snap-align: start;
  }

  .equipe-carousel {
    gap: 0.5rem;
    transform: none !important;
    will-change: auto;
  }

  .equipe-photo-container {
    width: 100%;
    height: 160px;
    border-radius: 3px;
  }

  .equipe-details {
    padding: 1rem;
    font-size: 0.85rem;
  }

  .equipe-nav-btn {
    display: none;
  }

  .valores-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .areas-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
    margin-top: 4rem;
  }
  
  .area-card {
    padding: 1.5rem 1rem;
  }
  
  .area-icon i {
    font-size: 1.8rem;
  }
  
  .area-title {
    font-size: 0.95rem;
    line-height: 1.2;
  }

  .contato-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .equipe-subtitle {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .logo-img {
    height: 35px;
  }

  .hero-logo {
    max-width: 280px;
  }

  .footer-logo {
    max-width: 200px;
  }

  .nav-container {
    justify-content: space-between;
  }

  .nav-links {
    right: 0.5rem;
    padding: 0.5rem 0.75rem;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .equipe-carousel-wrapper {
    gap: 0.5rem;
    padding: 0 0.25rem;
  }

  .equipe-carousel-container {
    max-width: none;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .equipe-carousel-container::-webkit-scrollbar {
    display: none;
  }

  .equipe-member {
    flex: 0 0 120px;
    min-width: 120px;
    scroll-snap-align: start;
  }

  .equipe-carousel {
    gap: 0.5rem;
    transform: none !important;
    will-change: auto;
  }

  .equipe-photo-container {
    width: 100%;
    height: 120px;
  }

  .equipe-photo-container::after {
    width: 25px;
    height: 25px;
    font-size: 0.75rem;
    bottom: 5px;
    right: 5px;
  }

  .equipe-nome {
    font-size: 0.95rem;
  }

  .equipe-details {
    padding: 0.75rem;
    font-size: 0.8rem;
  }

  .equipe-bio {
    font-size: 0.85rem;
  }

  .equipe-especialidades strong {
    font-size: 0.8rem;
  }

  .equipe-especialidades li {
    font-size: 0.8rem;
  }

  .equipe-nav-btn {
    display: none;
  }

  .equipe {
    padding: 2rem 0 1.5rem;
  }

  .areas-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 3.5rem;
  }
  
  .area-card {
    padding: 1.25rem 0.75rem;
  }
  
  .area-icon i {
    font-size: 1.6rem;
  }
  
  .area-title {
    font-size: 0.9rem;
    line-height: 1.2;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .equipe-subtitle {
    font-size: 1.8rem;
  }
}

/* Team Member Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: #c9a961;
  color: white;
  transform: scale(1.1);
}

.modal-header {
  display: flex;
  gap: 2rem;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-image {
  flex-shrink: 0;
}

.modal-member-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #c9a961;
}

.modal-member-info {
  flex: 1;
}

.modal-member-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.modal-member-email {
  font-size: 1rem;
  color: #001BB7;
  font-weight: 500;
}

.modal-linkedin-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #0077b5;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #0077b5;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.modal-linkedin-link:hover {
  background: #0077b5;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 119, 181, 0.3);
}

.modal-linkedin-link i {
  font-size: 1.1rem;
}

.modal-body {
  padding: 2rem;
}

.modal-member-bio h3,
.modal-member-specialties h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
}

.modal-member-bio p {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: justify;
}

.modal-member-specialties ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.modal-member-specialties li {
  padding: 0.5rem 0;
  color: #4a5568;
  position: relative;
  padding-left: 1.5rem;
}

.modal-member-specialties li::before {
  content: '•';
  color: #c9a961;
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* Modal Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Mobile Modal Responsive */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-content {
    max-height: 95vh;
  }
  
  .modal-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem 1.5rem 1rem;
  }
  
  .modal-member-photo {
    width: 100px;
    height: 100px;
  }
  
  .modal-member-name {
    font-size: 1.5rem;
  }
  
  .modal-linkedin-link {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 0.5rem;
  }
  
  .modal-content {
    border-radius: 12px;
  }
  
  .modal-header {
    padding: 1rem;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .modal-member-photo {
    width: 80px;
    height: 80px;
  }
  
  .modal-member-name {
    font-size: 1.3rem;
  }
  
  .modal-linkedin-link {
    font-size: 0.85rem;
    padding: 0.3rem 0.6rem;
  }
}

/* Area Modal Styles */
.modal-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #c9a961 0%, #b8941f 100%);
  border-radius: 50%;
  margin-right: 1.5rem;
}

.modal-icon i {
  font-size: 2.5rem;
  color: white;
}

.modal-area-info {
  flex: 1;
}

.modal-area-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.modal-area-description p {
  color: #4a5568;
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
  white-space: pre-line;
}

/* Mobile Area Modal */
@media (max-width: 768px) {
  .modal-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem 1.5rem 1rem;
  }
  
  .modal-icon {
    width: 60px;
    height: 60px;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
  
  .modal-icon i {
    font-size: 2rem;
  }
  
  .modal-area-title {
    font-size: 1.5rem;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .modal-icon {
    width: 50px;
    height: 50px;
  }
  
  .modal-icon i {
    font-size: 1.5rem;
  }
  
  .modal-area-title {
    font-size: 1.3rem;
  }
}

/* Blog Preview Section */
.blog-preview {
  padding: 3rem 0;
  background: linear-gradient(135deg, #d1d9e0 0%, #e2e8f0 30%, #f1f3f4 70%, #d8e2ea 100%);
}

.blog-loading,
.blog-error,
.blog-no-posts {
  text-align: center;
  padding: 3rem 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #c9a961;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.blog-loading p,
.blog-error p,
.blog-no-posts p {
  color: #666;
  font-size: 1.1rem;
}

.blog-error p {
  color: #e53e3e;
}

.blog-carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
}

.blog-carousel-container {
  overflow: hidden;
  flex: 1;
  width: 100%;
}

.blog-carousel {
  display: flex;
  gap: 2rem;
  transition: transform 0.5s ease;
  will-change: transform;
}

.blog-card {
  flex: 0 0 350px;
  min-width: 350px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.blog-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-image img {
  transform: scale(1.05);
}

.blog-content {
  padding: 1.5rem;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #666;
}

.blog-author {
  font-weight: 600;
  color: #c9a961;
}

.blog-date {
  color: #999;
}

.blog-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.blog-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.blog-read-more {
  background: #c9a961;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.blog-read-more:hover {
  background: #b8941f;
  transform: translateY(-2px);
}

.blog-nav-btn {
  position: absolute;
  top: 50%;
  background: #c9a961;
  color: #fff;
  border: 2px solid #c9a961;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  z-index: 5;
  box-shadow: 0 4px 12px rgba(201, 169, 97, 0.3);
  transition: all 0.3s ease;
  transform: translateY(-50%);
}

.blog-nav-btn.prev { left: -24px; }
.blog-nav-btn.next { right: -24px; }

.blog-nav-btn:hover:not(:disabled) {
  background: #b8941f;
  border-color: #b8941f;
  transform: translateY(-50%) scale(1.15);
  box-shadow: 0 6px 20px rgba(201, 169, 97, 0.5);
}

.blog-nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.blog-cta {
  text-align: center;
  margin-top: 3rem;
}

.blog-cta-button {
  display: inline-block;
  background: #2c3e50;
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.blog-cta-button:hover {
  background: #c9a961;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(201, 169, 97, 0.3);
}

/* Blog Modal Styles */
.modal-blog-image {
  flex-shrink: 0;
  margin-right: 1.5rem;
}

.modal-blog-photo {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  border: 3px solid #c9a961;
}

.modal-blog-info {
  flex: 1;
}

.modal-blog-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.modal-blog-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.modal-blog-author {
  color: #c9a961;
  font-weight: 600;
}

.modal-blog-date {
  color: #666;
}

.modal-blog-content {
  color: #4a5568;
  line-height: 1.6;
  font-size: 1rem;
}

/* Mobile Blog Responsive */
@media (max-width: 768px) {
  .blog-preview {
    padding: 4rem 0;
  }
  
  .blog-carousel-container {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .blog-carousel-container::-webkit-scrollbar {
    display: none;
  }

  .blog-carousel {
    transform: none !important;
    will-change: auto;
  }
  
  .blog-card {
    flex: 0 0 280px;
    min-width: 280px;
    scroll-snap-align: start;
  }
  
  .blog-image {
    height: 160px;
  }
  
  .blog-content {
    padding: 1.25rem;
  }
  
  .blog-title {
    font-size: 1.1rem;
  }
  
  .blog-nav-btn {
    display: none;
  }
  
  .modal-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem 1.5rem 1rem;
  }
  
  .modal-blog-image {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
  
  .modal-blog-photo {
    width: 100px;
    height: 100px;
  }
  
  .modal-blog-title {
    font-size: 1.5rem;
  }
  
  .modal-blog-meta {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .blog-carousel-container {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .blog-carousel-container::-webkit-scrollbar {
    display: none;
  }

  .blog-carousel {
    transform: none !important;
    will-change: auto;
  }

  .blog-card {
    flex: 0 0 250px;
    min-width: 250px;
    scroll-snap-align: start;
  }
  
  .blog-image {
    height: 140px;
  }
  
  .blog-content {
    padding: 1rem;
  }
  
  .blog-title {
    font-size: 1rem;
  }
  
  .blog-nav-btn {
    display: none;
  }
  
  .modal-blog-photo {
    width: 80px;
    height: 80px;
  }
  
  .modal-blog-title {
    font-size: 1.3rem;
  }
}

/* Cookie Consent Popup */
.cookie-popup {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: #2c3e50;
  color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 10000;
  animation: slideUp 0.5s ease;
  max-width: 500px;
  margin: 0 auto;
}

.cookie-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cookie-text h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #c9a961;
}

.cookie-text p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #ffffff;
}

.privacy-link {
  margin-top: 0.5rem !important;
}

.privacy-link a {
  color: #c9a961;
  text-decoration: underline;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.privacy-link a:hover {
  color: #b8941f;
  text-decoration: none;
}

.cookie-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.cookie-accept,
.cookie-decline {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cookie-accept {
  background: #c9a961;
  color: #2c3e50;
}

.cookie-accept:hover {
  background: #b8941f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(201, 169, 97, 0.3);
}

.cookie-decline {
  background: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
}

.cookie-decline:hover {
  background: #ffffff;
  color: #2c3e50;
  transform: translateY(-2px);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Cookie Popup */
@media (max-width: 768px) {
  .cookie-popup {
    left: 10px;
    right: 10px;
    bottom: 10px;
  }
  
  .cookie-content {
    padding: 1rem;
  }
  
  .cookie-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .cookie-accept,
  .cookie-decline {
    width: 100%;
    text-align: center;
  }
}
</style>
