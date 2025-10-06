<template>
  <div class="landing-page">
    <!-- Navbar -->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <a href="#hero" @click.prevent="scrollTo('hero')" class="nav-logo">
          <img src="/logo.png" alt="CBLG Advogados" class="logo-img">
        </a>
        <button class="nav-toggle" @click="isNavOpen = !isNavOpen" aria-label="Abrir menu">
          <i class="fas fa-bars"></i>
        </button>
        <ul class="nav-links" :class="{ open: isNavOpen }">
          <li><a href="#sobre" @click.prevent="scrollTo('sobre'); isNavOpen = false">SOBRE</a></li>
          <li><a href="#equipe" @click.prevent="scrollTo('equipe'); isNavOpen = false">EQUIPE</a></li>
          <li><a href="#areas" @click.prevent="scrollTo('areas'); isNavOpen = false">ÁREAS DE ATUAÇÃO</a></li>
          <li><a href="/blog" @click="isNavOpen = false">BLOG</a></li>
          <li><a href="#contato" @click.prevent="scrollTo('contato'); isNavOpen = false">CONTATO</a></li>
        </ul>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="hero">
      <div class="hero-content">
        <img src="/logo.png" alt="CBLG Advogados" class="hero-logo">
        <button class="hero-cta" @click="scrollTo('contato')">Entre em Contato</button>
      </div>
      <div class="scroll-indicator" @click="scrollTo('sobre')">
        <i class="fas fa-chevron-down"></i>
      </div>
    </section>

    <!-- Sobre Section -->
    <section id="sobre" class="sobre">
      <div class="container">
        <h2 class="section-title">25 ANOS DE EXCELÊNCIA EM DIREITO EMPRESARIAL</h2>
        <img src="/AB2Lassociado.png" alt="AB2L Associado" class="sobre-badge" />
        <p class="section-description">
          Acompanhamos a evolução do direito e das tecnologias, sobretudo a Inteligência Artificial e, de forma assertiva, responsável e disponível, ajudamos nossos clientes a enfrentar os desafios e as transformações exigidas nas suas atividades empresariais.
        </p>
        <p class="section-description">
          Nossa autuação na área empresarial compreende diversas matérias do Direito, o que nos permite o atendimento às necessidades dos nossos clientes a partir do seu nicho de mercado e considerando as características próprias de cada segmento.
        </p>
        
      </div>
    </section>

    <!-- Equipe Section -->
    <section id="equipe" class="equipe">
      <div class="container">
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
                  :class="{ active: selectedMembro === index }"
                  @click="openTeamModal(membro)"
                >
                  <img :src="membro.foto" :alt="membro.nome" class="equipe-photo">
                </div>
                <h3 class="equipe-nome">{{ membro.nome }}</h3>
                <p class="equipe-cargo">{{ membro.cargo }}</p>
                
                <transition name="slide-down">
                  <div v-if="selectedMembro === index" class="equipe-details">
                    <p class="equipe-bio">{{ membro.bio }}</p>
                    <div class="equipe-especialidades">
                      <strong>Especialidades:</strong>
                      <ul>
                        <li v-for="(area, idx) in membro.areas" :key="idx">{{ area }}</li>
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
        <h2 class="section-title-areas">ÁREAS DE ATUAÇÃO</h2>
        <div class="areas-list">
          <div 
            v-for="(area, index) in areas" 
            :key="index" 
            class="area-item"
            @click="toggleArea(index)"
          >
            <div class="area-header">
              <h3 class="area-title">{{ area.titulo }}</h3>
              <i class="fas fa-chevron-down area-chevron" :class="{ rotated: expandedArea === index }"></i>
            </div>
            <div class="area-description" :class="{ active: expandedArea === index }">
              <p>{{ area.descricao }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contato Section -->
    <section id="contato" class="contato">
      <div class="container">
        <h2 class="section-title">CONTATO</h2>
        <div class="contato-content">
          <div class="contato-info">
            <div class="unidade">
              <h4>Unidade São Paulo</h4>
              <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <p>Rua Ferreira de Araújo, 221, 1º Andar<br>05428-000 - Pinheiros - São Paulo - SP</p>
              </div>
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <p>Tel.: +55 (11) 3817-4001</p>
              </div>
            </div>
            <div class="unidade">
              <h4>Unidade Curitiba</h4>
              <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <p>Rua Buenos Aires, 444, Cj. 12<br>80250-070 - Batel - Curitiba - PR</p>
              </div>
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <p>Tel.: +55 (11) 3817-4001</p>
              </div>
            </div>
          </div>
          <div class="contato-img-wrapper">
            <img src="/fachada-predio-saopaulo.jpg" alt="Fachada CBLG São Paulo" class="contato-image" />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <img src="/logo.png" alt="CBLG Advogados" class="footer-logo">
            <p>Atuação Integrada e Multidisciplinar</p>
          </div>
          <div class="footer-section">
            <h4>Links Rápidos</h4>
            <ul>
              <li><a href="#sobre" @click.prevent="scrollTo('sobre')">Sobre</a></li>
              <li><a href="#equipe" @click.prevent="scrollTo('equipe')">Equipe</a></li>
              <li><a href="#areas" @click.prevent="scrollTo('areas')">Áreas de Atuação</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Siga nas Redes Sociais</h4>
            <div class="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener"><i class="fab fa-linkedin"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener"><i class="fab fa-instagram"></i></a>
              <a href="https://facebook.com" target="_blank" rel="noopener"><i class="fab fa-facebook"></i></a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 Castello Branco, Lobosco & Gama Advogados. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>

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
            <p class="modal-member-role">{{ selectedTeamMember.cargo }}</p>
            <p class="modal-member-email">{{ getEmail(selectedTeamMember.nome) }}</p>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-member-bio">
            <h3>Sobre</h3>
            <p>{{ selectedTeamMember.bio }}</p>
          </div>
          <div class="modal-member-specialties">
            <h3>Especialidades</h3>
            <ul>
              <li v-for="(area, idx) in selectedTeamMember.areas" :key="idx">{{ area }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const isScrolled = ref(false)
const isNavOpen = ref(false)
const hoveredArea = ref(null)
const expandedArea = ref(null)
const currentEquipeIndex = ref(0)
const selectedMembro = ref(null)
const equipeScrollAmount = ref(270) // largura do card + gap
const itemsPerView = ref(4) // quantos itens visíveis por vez
const selectedTeamMember = ref(null)

const equipe = ref([
  {
    nome: 'André Castello Branco',
    cargo: 'Sócio',
    foto: '/foto_andré_castello_branco.jpg',
    bio: 'Atuação em Direito Societário e empresarial.',
    areas: ['Direito Societário', 'Governança Corporativa']
  },
  {
    nome: 'Alexandre Lobosco',
    cargo: 'Sócio',
    foto: '/foto_alexandre_lobosco.jpg',
    bio: 'Experiência em consultoria estratégica e contencioso empresarial.',
    areas: ['Contratos', 'Responsabilidade Civil']
  },
  {
    nome: 'Rodrigo Gama Dantas',
    cargo: 'Sócio',
    foto: '/foto_rodrigo_gama_dantas.jpg',
    bio: 'Atuação em direito societário e M&A.',
    areas: ['M&A', 'Direito Societário']
  },
  {
    nome: 'Cezar Azevedo',
    cargo: 'Associado',
    foto: '/foto_cezar_azevedo.jpeg',
    bio: 'Atuação em consultivo e operações corporativas.',
    areas: ['Contratos', 'Consultivo Empresarial']
  },
  {
    nome: 'Marcia Leardini',
    cargo: 'Sócia',
    foto: '/foto_marcia_leardini.jpg',
    bio: 'Foco em compliance, ESG e proteção de dados.',
    areas: ['Compliance', 'ESG', 'Proteção de Dados']
  },
  {
    nome: 'Miguel Barbado Neto',
    cargo: 'Associado',
    foto: '/foto_miguel_barbado_neto.jpg',
    bio: 'Experiência em direito bancário e mercado financeiro.',
    areas: ['Direito Bancário', 'Mercado Financeiro']
  },
  {
    nome: 'Rafael Munerato Almeida',
    cargo: 'Associado',
    foto: '/foto_rafael_munerato_almeida.jpg',
    bio: 'Atuação em contencioso estratégico e contratos.',
    areas: ['Contratos', 'Contencioso']
  },
  {
    nome: 'Michelle Gironda Cabrera',
    cargo: 'Sócia',
    foto: '/Michelle_Gironda_Cabrera.jpg',
    bio: 'Especialista em relações de consumo e direito do trabalho.',
    areas: ['Relações de Consumo', 'Direito do Trabalho']
  }
])

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

const areas = ref([
{
  titulo: 'DIREITO SOCIETÁRIO',
  icon: 'fas fa-building',
  descricao: 'Assessoria completa em constituição, reestruturação, fusões, aquisições e governança corporativa.'
},
{
  titulo: 'DIREITO TRIBUTÁRIO',
  icon: 'fas fa-file-invoice-dollar',
  descricao: 'Planejamento tributário, consultoria fiscal e defesa em processos administrativos e judiciais.'
},
{
  titulo: 'PLANEJAMENTO SUCESSÓRIO E PATRIMONIAL DE EMPRESAS FAMILIARES',
  icon: 'fas fa-users',
  descricao: 'Estruturação patrimonial, holdings familiares e sucessão empresarial estratégica.'
},
{
  titulo: 'CONTRATOS E RESPONSABILIDADE CIVIL',
  icon: 'fas fa-file-contract',
  descricao: 'Elaboração, análise e negociação de contratos complexos, além de litígios cíveis.'
},
{
  titulo: 'DIREITO BANCÁRIO',
  icon: 'fas fa-university',
  descricao: 'Consultoria em operações financeiras, regulação bancária e resolução de conflitos.'
},
{
  titulo: 'NEGÓCIOS IMOBILIÁRIOS',
  icon: 'fas fa-home',
  descricao: 'Assessoria em compra, venda, locação e desenvolvimento imobiliário.'
},
{
  titulo: 'RELAÇÕES FAMILIARES E SUCESSÓRIAS',
  icon: 'fas fa-heart',
  descricao: 'Divórcios, inventários, testamentos e planejamento patrimonial familiar.'
},
{
  titulo: 'DIREITO PENAL',
  icon: 'fas fa-gavel',
  descricao: 'Defesa criminal, white collar crimes e compliance penal empresarial.'
},
{
  titulo: 'E-COMMERCE DE PRODUTOS E SERVIÇOS',
  icon: 'fas fa-shopping-cart',
  descricao: 'Assessoria jurídica completa para negócios digitais e marketplaces.'
},
{
  titulo: 'DIREITO MÉDICO E DA SAÚDE',
  icon: 'fas fa-heartbeat',
  descricao: 'Consultoria para profissionais e instituições de saúde, defesa em processos.'
},
{
  titulo: 'DIREITO EDUCACIONAL',
  icon: 'fas fa-graduation-cap',
  descricao: 'Assessoria a instituições de ensino e resolução de conflitos educacionais.'
},
{
  titulo: 'COMPLIANCE, ÉTICA CORPORATIVA E ESG',
  icon: 'fas fa-shield-alt',
  descricao: 'Programas de integridade, governança sustentável e adequação regulatória.'
},
{
  titulo: 'PROTEÇÃO DA PRIVACIDADE',
  icon: 'fas fa-lock',
  descricao: 'LGPD, proteção de dados pessoais e segurança da informação.'
},
{
  titulo: 'RELAÇÕES DE CONSUMO',
  icon: 'fas fa-handshake',
  descricao: 'Defesa de direitos do consumidor e consultoria para empresas em CDC.'
}

])

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

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
// Dynamic sizing for equipe carousel
const carouselContainerRef = ref(null)
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

const handleWindowResize = () => {
  if (resizeTimeoutId) window.clearTimeout(resizeTimeoutId)
  resizeTimeoutId = window.setTimeout(() => computeEquipeLayout(), 100)
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
  padding: 0.75rem 0;
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
  padding: 0 1rem;
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
  gap: 2.75rem;
  font-family: 'Roboto Mono', 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  font-size: 1.05rem;
  margin-left: auto;
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
  margin-bottom: 3rem;
  color: #2c3e50;
  position: relative;
  padding-bottom: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}
.section-title-areas{
  font-family: 'Roboto Mono', 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #f9fbfd;
  position: relative;
  padding-bottom: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.section-title-areas::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: #c9a961;
  border-radius: 2px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: #c9a961;
  border-radius: 2px;
}

/* Sobre Section */
.sobre {
  padding: 6rem 0 0rem 0;
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
  padding: 0 0 6rem;
  background: #ffffff;
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
  gap: 0;
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
  filter: grayscale(100%);
  transition: filter 0.3s ease;
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

.equipe-cargo {
  font-size: 0.9rem;
  color: #c9a961;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 1rem;
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
  background: rgba(44, 62, 80, 0.7);
  color: #fff;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  z-index: 5;
}
.equipe-nav-btn.prev { left: 8px; }
.equipe-nav-btn.next { right: 8px; }

.equipe-nav-btn:hover:not(:disabled) {
  background: #555554;
  transform: scale(1.1);
}

.equipe-nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Áreas de Atuação Section */
.areas {
  padding: 2rem 0 6rem 0;
  background-image: linear-gradient(rgba(255,255,255,0.0), rgba(255,255,255,0.0)), url('/Planet2.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.areas-list {
  max-width: 800px;
  margin: 0 auto;
}

.area-item {
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.area-item:last-child {
  border-bottom: none;
}

.area-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.area-header:hover {
  background: rgba(201, 169, 97, 0.05);
}

.area-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
  transition: color 0.3s ease;
}

.area-header:hover .area-title {
  color: #c9a961;
}

.area-chevron {
  color: #c9a961;
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}

.area-chevron.rotated {
  transform: rotate(180deg);
}

.area-description {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: transparent;
}

.area-description.active {
  max-height: 200px;
}

.area-description p {
  padding: 0 0 1.5rem 0;
  margin: 0;
  color: #ffffff;
  line-height: 1.6;
  font-size: 0.95rem;
}


/* Contato Section */
.contato {
  padding: 6rem 0;
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
  filter: brightness(0) invert(1);
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
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
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
  }

  .equipe-member {
    flex: 0 0 150px;
    min-width: 150px;
  }

  .equipe-carousel {
    gap: 0;
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
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .valores-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .areas-list {
    max-width: 100%;
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
  }

  .equipe-member {
    flex: 0 0 120px;
    min-width: 120px;
  }

  .equipe-carousel {
    gap: 0;
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

  .equipe-cargo {
    font-size: 0.8rem;
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
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }

  .section-title {
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

.modal-member-role {
  font-size: 1.1rem;
  color: #c9a961;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.modal-member-email {
  font-size: 1rem;
  color: #001BB7;
  font-weight: 500;
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
}
</style>

