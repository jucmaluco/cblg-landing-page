<template>
  <div class="blog-page">
    <!-- Navbar -->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <a href="/" class="nav-logo">
          <img src="/logo.png" alt="CBLG Advogados" class="logo-img">
        </a>
        <button class="nav-toggle" @click="isNavOpen = !isNavOpen" aria-label="Abrir menu">
          <i class="fas fa-bars"></i>
        </button>
        <ul class="nav-links" :class="{ open: isNavOpen }">
          <li><a href="/#sobre" @click="isNavOpen = false">SOBRE</a></li>
          <li><a href="/#equipe" @click="isNavOpen = false">EQUIPE</a></li>
          <li><a href="/#areas" @click="isNavOpen = false">ÁREAS DE ATUAÇÃO</a></li>
          <li><a href="/blog" @click="isNavOpen = false">BLOG</a></li>
          <li><a href="/#contato" @click="isNavOpen = false">CONTATO</a></li>
        </ul>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="blog-hero">
      <div class="blog-hero-content">
        <h1 class="section-title">NOTÍCIAS CBLG</h1>
      </div>
    </section>

    <!-- Blog Posts Section -->
    <section class="blog-posts">
      <div class="container">
        <div v-if="loading" class="loading">
          <div class="loading-spinner"></div>
          <p>Carregando artigos...</p>
        </div>
        
        <div v-else-if="error" class="error">
          <p>{{ error }}</p>
        </div>
        
        <div v-else-if="posts.length === 0" class="no-posts">
          <p>Nenhum artigo encontrado.</p>
        </div>
        
        <div v-else class="posts-grid">
          <article v-for="post in posts" :key="post.sys.id" class="post-card">
            <div class="post-image" v-if="post.fields.coverImage">
              <img 
                :src="post.fields.coverImage.fields.file.url" 
                :alt="post.fields.title"
                class="post-cover"
              />
            </div>
            <div class="post-content">
              <div class="post-meta">
                <span class="post-author">{{ post.fields.author }}</span>
                <span class="post-date">{{ formatDate(post.fields.publishedAt) }}</span>
              </div>
              <h2 class="post-title">{{ post.fields.title }}</h2>
              <p class="post-excerpt">{{ getExcerpt(post.fields.body) }}</p>
              <a href="#" @click.prevent="viewPost(post)" class="post-link">Ler mais</a>
            </div>
          </article>
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
              <li><a href="/#sobre">Sobre</a></li>
              <li><a href="/#equipe">Equipe</a></li>
              <li><a href="/#areas">Áreas de Atuação</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Informações Legais</h4>
            <ul>
              <li><a href="/privacy-policy">Política de Privacidade</a></li>
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

    <!-- Modal for Post Content -->
    <div v-if="selectedPost" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        <div class="modal-header">
          <div class="modal-meta">
            <span class="modal-author">{{ selectedPost.fields.author }}</span>
            <span class="modal-date">{{ formatDate(selectedPost.fields.publishedAt) }}</span>
          </div>
          <h2 class="modal-title">{{ selectedPost.fields.title }}</h2>
        </div>
        <div class="modal-body">
          <div v-if="selectedPost.fields.coverImage" class="modal-image">
            <img 
              :src="selectedPost.fields.coverImage.fields.file.url" 
              :alt="selectedPost.fields.title"
              class="modal-cover"
            />
          </div>
          <div class="modal-text" v-html="formatContent(selectedPost.fields.body)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from 'contentful'

export default {
  name: 'BlogPage',
  data() {
    return {
      posts: [],
      loading: true,
      error: null,
      isScrolled: false,
      isNavOpen: false,
      selectedPost: null
    }
  },
  mounted() {
    this.fetchPosts()
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    async fetchPosts() {
      try {
        const client = createClient({
          space: 'ka3j7fcma8dg',
          environment: 'master',
          accessToken: 'TQ0bwmHQ6CrRtV3fp-ZJXhO-Lu59Q_dtZ61ByDnWJM4'
        })
        
        const response = await client.getEntries({
          content_type: 'post',
          order: '-fields.publishedAt'
        })
        
        this.posts = response.items
        this.loading = false
      } catch (error) {
        console.error('Error fetching posts:', error)
        this.error = 'Erro ao carregar os artigos. Tente novamente mais tarde.'
        this.loading = false
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    getExcerpt(text, maxLength = 150) {
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength) + '...'
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    viewPost(post) {
      this.selectedPost = post
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    },
    closeModal() {
      this.selectedPost = null
      document.body.style.overflow = 'auto' // Restore scrolling
    },
    formatContent(content) {
      // Convert line breaks to HTML paragraphs
      return content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')
    }
  }
}
</script>

<style scoped>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto Mono', 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #2c3e50;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
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
.nav-toggle span {
  width: 25px;
  height: 3px;
  background: #fff;
  margin: 3px 0;
  transition: 0.3s;
}

.navbar.scrolled .nav-toggle span {
  background: #2c3e50;
}

/* Blog Hero Section */
.blog-hero {
  color: white;
  padding: 5rem 0 1rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.blog-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/background-fachada.jpg') center/cover;
  opacity: 0.8;
  z-index: 1;
}

.blog-hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.blog-hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  animation: fadeInUp 1s ease;
}

.blog-hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  font-weight: 300;
}

/* Blog Posts Section */
.blog-posts {
  padding: 6rem 0;
  background: #f8f9fa;
}

.loading, .error, .no-posts {
  text-align: center;
  padding: 4rem 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #E9E9E9;
  border-top: 4px solid #001BB7;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.post-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.post-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.post-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-card:hover .post-cover {
  transform: scale(1.05);
}

.post-content {
  padding: 1.5rem;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.post-author {
  font-weight: 600;
  color: #001BB7;
}

.post-date {
  color: #999;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
  line-height: 1.3;
}

.post-excerpt {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.post-link {
  display: inline-block;
  color: #001BB7;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 2px solid #001BB7;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.post-link:hover {
  background: #001BB7;
  color: white;
}

/* Animations */
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
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.social-links a:hover {
  background: #c9a961;
  color: #2c3e50;
  transform: translateY(-2px);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e0;
}

/* Modal Styles */
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
  max-width: 800px;
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
  background: #001BB7;
  color: white;
  transform: scale(1.1);
}

.modal-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.modal-author {
  font-weight: 600;
  color: #001BB7;
}

.modal-date {
  color: #999;
}

.modal-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.3;
  margin: 0;
}

.modal-body {
  padding: 2rem;
}

.modal-image {
  margin-bottom: 2rem;
  border-radius: 12px;
  overflow: hidden;
}

.modal-cover {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.modal-cover:hover {
  transform: scale(1.02);
}

.modal-text {
  color: #2c3e50;
  line-height: 1.8;
  font-size: 1.1rem;
}

.modal-text p {
  margin-bottom: 1.5rem;
}

.modal-text p:last-child {
  margin-bottom: 0;
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

/* Mobile Responsive */
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
  
  .blog-hero-title {
    font-size: 2.5rem;
  }
  
  .blog-hero-subtitle {
    font-size: 1.1rem;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .post-card {
    margin: 0 1rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-logo {
    max-width: 200px;
  }
  
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-content {
    max-height: 95vh;
  }
  
  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .modal-cover {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .logo-img {
    height: 35px;
  }

  .nav-container {
    justify-content: space-between;
  }

  .nav-links {
    right: 0.5rem;
    padding: 0.5rem 0.75rem;
  }
  
  .blog-hero {
    padding: 6rem 0 3rem 0;
  }
  
  .blog-hero-title {
    font-size: 2rem;
  }
  
  .blog-posts {
    padding: 4rem 0;
  }
  
  .posts-grid {
    gap: 1rem;
  }
  
  .post-card {
    margin: 0 0.5rem;
  }
  
  .post-content {
    padding: 1rem;
  }
  
  .post-title {
    font-size: 1.25rem;
  }
  
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
  
  .modal-title {
    font-size: 1.25rem;
  }
  
  .modal-cover {
    height: 150px;
  }
  
  .modal-text {
    font-size: 1rem;
  }
}
</style>
