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
          <li><a href="#sobre" @click.prevent="scrollTo('sobre'); isNavOpen = false">Sobre</a></li>
          <li><a href="#equipe" @click.prevent="scrollTo('equipe'); isNavOpen = false">Equipe</a></li>
          <li><a href="#areas" @click.prevent="scrollTo('areas'); isNavOpen = false">Áreas de Atuação</a></li>
          <li><a href="#contato" @click.prevent="scrollTo('contato'); isNavOpen = false">Contato</a></li>
        </ul>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="hero">
      <div class="hero-content">
        <img src="/logo.png" alt="CBLG Advogados" class="hero-logo">
        <img src="/foto_itens_cblg.jpeg" alt="Detalhes CBLG" class="hero-deco" />
        <button class="hero-cta" @click="scrollTo('contato')">Entre em Contato</button>
      </div>
      <div class="scroll-indicator" @click="scrollTo('sobre')">
        <i class="fas fa-chevron-down"></i>
      </div>
    </section>

    <!-- Sobre Section -->
    <section id="sobre" class="sobre">
      <div class="container">
        <h2 class="section-title">Atuação Integrada e Multidisciplinar</h2>
        <p class="section-description">
          Acompanhamos a evolução do direito e das tecnologias, sobretudo a Inteligência Artificial e, de forma assertiva, responsável e disponível, ajudamos nossos clientes a enfrentar os desafios e as transformações exigidas nas suas atividades empresariais.
        </p>
        <p class="section-description">
          Nossa autuação na área empresarial compreende diversas matérias do Direito, o que nos permite o atendimento às necessidades dos nossos clientes a partir do seu nicho de mercado e considerando as características próprias de cada segmento.
        </p>
        <div class="valores-grid">
          <div class="valor-card">
            <h3>Compromisso</h3>
            <p>Ouvir e aprender com clientes para prestar serviços com pessoalidade e eficiência. Almejamos ir além da advocacia responsiva. Nosso objetivo é oferecer soluções customizadas, inteligentes e criativas.</p>
          </div>
          <div class="valor-card">
            <h3>Dinamismo</h3>
            <p>Procuramos desenvolver atendimento multidisciplinar para nichos de mercado por meio do entendimento profundo do segmento de atuação. Isto é, não estamos focados em áreas jurídicas, mas em segmentos de negócios. Possuímos, sim, áreas de especialidade, mas nossa atuação não se limita a elas.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Equipe Section -->
    <section id="equipe" class="equipe">
      <div class="container">
        <h2 class="section-title">Nossa Equipe</h2>
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
                  @click="toggleMembro(index)"
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
        <h2 class="section-title">Áreas de Atuação</h2>
        <div class="areas-grid">
          <div 
            v-for="(area, index) in areas" 
            :key="index" 
            class="area-card"
            @mouseenter="hoveredArea = index"
            @mouseleave="hoveredArea = null"
          >
            <div class="area-icon">
              <i :class="area.icon"></i>
            </div>
            <h3 class="area-title">{{ area.titulo }}</h3>
            <div class="area-overlay" :class="{ active: hoveredArea === index }">
              <p>{{ area.descricao }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contato Section -->
    <section id="contato" class="contato">
      <div class="container">
        <h2 class="section-title">Contato</h2>
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
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const isScrolled = ref(false)
const isNavOpen = ref(false)
const hoveredArea = ref(null)
const currentEquipeIndex = ref(0)
const selectedMembro = ref(null)
const equipeScrollAmount = ref(270) // largura do card + gap
const itemsPerView = ref(4) // quantos itens visíveis por vez

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

const maxEquipeIndex = computed(() => {
  return Math.max(0, equipe.value.length - itemsPerView.value)
})

const areas = ref([
  {
    titulo: 'Direito Societário',
    icon: 'fas fa-building',
    descricao: 'Assessoria completa em constituição, reestruturação, fusões, aquisições e governança corporativa.'
  },
  {
    titulo: 'Direito Tributário',
    icon: 'fas fa-file-invoice-dollar',
    descricao: 'Planejamento tributário, consultoria fiscal e defesa em processos administrativos e judiciais.'
  },
  {
    titulo: 'Planejamento Sucessório e Patrimonial de Empresas Familiares',
    icon: 'fas fa-users',
    descricao: 'Estruturação patrimonial, holdings familiares e sucessão empresarial estratégica.'
  },
  {
    titulo: 'Contratos e Responsabilidade Civil',
    icon: 'fas fa-file-contract',
    descricao: 'Elaboração, análise e negociação de contratos complexos, além de litígios cíveis.'
  },
  {
    titulo: 'Direito Bancário',
    icon: 'fas fa-university',
    descricao: 'Consultoria em operações financeiras, regulação bancária e resolução de conflitos.'
  },
  {
    titulo: 'Negócios Imobiliários',
    icon: 'fas fa-home',
    descricao: 'Assessoria em compra, venda, locação e desenvolvimento imobiliário.'
  },
  {
    titulo: 'Relações Familiares e Sucessórias',
    icon: 'fas fa-heart',
    descricao: 'Divórcios, inventários, testamentos e planejamento patrimonial familiar.'
  },
  {
    titulo: 'Direito Penal',
    icon: 'fas fa-gavel',
    descricao: 'Defesa criminal, white collar crimes e compliance penal empresarial.'
  },
  {
    titulo: 'E-Commerce de Produtos e Serviços',
    icon: 'fas fa-shopping-cart',
    descricao: 'Assessoria jurídica completa para negócios digitais e marketplaces.'
  },
  {
    titulo: 'Direito Médico e da Saúde',
    icon: 'fas fa-heartbeat',
    descricao: 'Consultoria para profissionais e instituições de saúde, defesa em processos.'
  },
  {
    titulo: 'Direito Educacional',
    icon: 'fas fa-graduation-cap',
    descricao: 'Assessoria a instituições de ensino e resolução de conflitos educacionais.'
  },
  {
    titulo: 'Compliance, Ética corporativa e ESG',
    icon: 'fas fa-shield-alt',
    descricao: 'Programas de integridade, governança sustentável e adequação regulatória.'
  },
  {
    titulo: 'Proteção da Privacidade',
    icon: 'fas fa-lock',
    descricao: 'LGPD, proteção de dados pessoais e segurança da informação.'
  },
  {
    titulo: 'Relações de Consumo',
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
  if (currentEquipeIndex.value < maxEquipeIndex.value) {
    currentEquipeIndex.value++
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
    if (currentEquipeIndex.value > Math.max(0, equipe.value.length - itemsPerView.value)) {
      currentEquipeIndex.value = Math.max(0, equipe.value.length - itemsPerView.value)
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  overflow-x: hidden;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
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
  gap: 2rem;
}

.nav-links a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
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
  background: linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,255,255,0.55));
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #2c3e50;
  padding: 2rem;
}

.hero-logo {
  max-width: 520px;
  width: 90%;
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
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
  position: relative;
  padding-bottom: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
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
  padding: 6rem 0;
  background: linear-gradient(178deg, #d7e6f7 0%, #edf4fb 100%);
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
  padding: 6rem 0;
  background: #ffffff;
}

.equipe-carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

.equipe-carousel-container {
  overflow: hidden;
  flex: 1;
  width: 100%;
  max-width: 1120px;
}

.equipe-carousel {
  display: flex;
  gap: 2rem;
  transition: transform 0.5s ease;
  will-change: transform;
}

.equipe-member {
  flex: 0 0 250px;
  min-width: 250px;
  text-align: center;
}

.equipe-photo-container {
  width: 200px;
  height: 200px;
  margin: 0 auto 1.5rem;
  border-radius: 5%;
  overflow: hidden;
  border: 4px solid #e0e0e0;
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
  border-color: #c9a961;
  transform: scale(1.05);
}

.equipe-photo-container.active {
  border-color: #c9a961;
  box-shadow: 0 0 0 4px rgba(201, 169, 97, 0.2);
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
  background: #2c3e50;
  color: #fff;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.equipe-nav-btn:hover:not(:disabled) {
  background: #c9a961;
  transform: scale(1.1);
}

.equipe-nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Áreas de Atuação Section */
.areas {
  padding: 6rem 0;
  background: linear-gradient(180deg, #cfe0f4 0%, #e9f2fb 100%);
}

.areas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.area-card {
  position: relative;
  background: #ffffff;
  padding: 2rem;
  border-radius: 3px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border-top: 3px solid transparent;
}

.area-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-top-color: #c9a961;
}

.area-icon {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.area-card:hover .area-icon {
  color: #c9a961;
  transform: scale(1.05);
}

.area-title {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 600;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.area-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(44, 62, 80, 0.96);
  color: #fff;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 3px;
}

.area-overlay.active {
  opacity: 1;
}

.area-overlay p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #ecf0f1;
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
    flex: 0 0 200px;
    min-width: 200px;
  }

  .equipe-photo-container {
    width: 160px;
    height: 160px;
  }
}

@media (max-width: 1024px) {
  .equipe-carousel-container {
    max-width: 720px;
  }

  .equipe-member {
    flex: 0 0 220px;
    min-width: 220px;
  }

  .equipe-photo-container {
    width: 170px;
    height: 170px;
  }
}

@media (max-width: 768px) {
  .contato-image {
    max-height: 280px;
  }
  .nav-toggle {
    display: block;
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
  }

  .nav-links.open {
    display: flex;
  }

  .logo-img {
    height: 40px;
  }

  .hero-logo {
    max-width: 350px;
  }

  .nav-links {
    gap: 1rem;
    font-size: 0.9rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .equipe-carousel-wrapper {
    gap: 1rem;
    padding: 0 0.5rem;
  }

  .equipe-carousel-container {
    max-width: 380px;
  }

  .equipe-member {
    flex: 0 0 180px;
    min-width: 180px;
  }

  .equipe-carousel {
    gap: 1rem;
  }

  .equipe-photo-container {
    width: 150px;
    height: 150px;
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

  .areas-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
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
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.8rem;
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
    max-width: 160px;
  }

  .equipe-member {
    flex: 0 0 150px;
    min-width: 150px;
  }

  .equipe-carousel {
    gap: 0.5rem;
  }

  .equipe-photo-container {
    width: 120px;
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
</style>

