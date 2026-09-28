import { ref, watch } from 'vue'

const STORAGE_KEY = 'cblg-locale'
export const SUPPORTED_LOCALES = ['pt', 'en']
const DEFAULT_LOCALE = 'pt'

const messages = {
  pt: {
    'meta.title': 'CBLG Advogados - Excelência Jurídica',
    'nav.about': 'SOBRE',
    'nav.team': 'EQUIPE',
    'nav.areas': 'ÁREAS DE ATUAÇÃO',
    'nav.news': 'NOTÍCIAS',
    'nav.blog': 'BLOG',
    'nav.contact': 'CONTATO',
    'nav.openMenu': 'Abrir menu',
    'nav.language': 'Idioma',
    'hero.cta': 'Entre em Contato',
    'about.title': '25 ANOS DE EXCELÊNCIA, CREDIBILIDADE E INOVAÇÃO JURÍDICA',
    'about.lead': 'Somos um escritório multissetorial e full service, com mais de 25 anos de experiência oferecendo soluções jurídicas completas a clientes nacionais e internacionais.',
    'about.body': 'A equipe da CBLG reúne alta expertise em todas as facetas do Direito Empresarial – tributário, societário, contratos, falimentar/recuperacional, penal empresarial e compliance – e conta ainda com sólida atuação em áreas complementares como direito bancário e financeiro, imobiliário, ambiental,  planejamento sucessório e patrimonial, direito médico e educacional, entre outras. Essa integração nos permite oferecer soluções jurídicas completas, personalizadas e eficientes, capazes de atender tanto demandas rotineiras quanto projetos de alta complexidade.',
    'team.title': 'EQUIPE',
    'team.education': 'Formação',
    'team.about': 'Sobre',
    'areas.title': 'ÁREAS DE ATUAÇÃO',
    'blog.latest': 'ÚLTIMAS NOTÍCIAS',
    'blog.pageTitle': 'NOTÍCIAS CBLG',
    'blog.loading': 'Carregando artigos...',
    'blog.error': 'Erro ao carregar os artigos.',
    'blog.errorRetry': 'Erro ao carregar os artigos. Tente novamente mais tarde.',
    'blog.empty': 'Nenhum artigo encontrado.',
    'blog.readMore': 'Ler mais',
    'blog.seeMore': 'Veja Mais',
    'contact.title': 'CONTATO',
    'contact.saoPaulo': 'Unidade São Paulo',
    'contact.curitiba': 'Unidade Curitiba',
    'contact.rio': 'Unidade Rio de Janeiro',
    'contact.phone': 'Tel.:',
    'contact.imageAlt': 'Foto Caderno e Caneta BLG',
    'footer.tagline': 'Atuação Integrada e Multidisciplinar',
    'footer.quickLinks': 'Links Rápidos',
    'footer.about': 'Sobre',
    'footer.team': 'Equipe',
    'footer.areas': 'Áreas de Atuação',
    'footer.blog': 'Blog',
    'footer.legal': 'Informações Legais',
    'footer.privacy': 'Política de Privacidade',
    'footer.social': 'Siga nas Redes Sociais',
    'footer.rights': 'Todos os direitos reservados.',
    'cookie.title': 'Controle sua Privacidade',
    'cookie.text': 'Este site utiliza cookies para realização de análises estatísticas acerca de sua utilização. Não são coletados dados pessoais por meio de cookies.',
    'cookie.privacy': 'Política de Privacidade',
    'cookie.accept': 'Aceitar',
    'cookie.decline': 'Recusar',
    'privacy.title': 'Política de Privacidade',
    'privacy.subtitle': 'Proteção e Tratamento de Dados Pessoais',
    'rd.hero.lead': '25 anos de',
    'rd.hero.em': 'excelência,',
    'rd.hero.tail': 'credibilidade e inovação jurídica.',
    'rd.meetTeam': 'Conheça a equipe',
    'rd.viewProfile': 'Ver perfil',
    'rd.close': 'Fechar',
    'rd.menu': 'Menu',
    'rd.offices': 'Escritórios',
    'rd.news': 'Notícias',
    'rd.contact': 'Contato',
    'rd.viewAll': 'Ver todas as notícias',
    'rd.map': 'Ver no mapa',
    'rd.years': 'anos de atuação',
    'rd.areasCount': 'áreas de atuação',
    'rd.officesCount': 'escritórios',
    'rd.previous': 'Anterior',
    'rd.next': 'Próximo',
    'rd.meetingAlt': 'Equipe CBLG em reunião no escritório',
    'rd.buildingAlt': 'Fachada do edifício do escritório CBLG em São Paulo'
  },
  en: {
    'meta.title': 'CBLG Advogados - Legal Excellence',
    'nav.about': 'ABOUT',
    'nav.team': 'TEAM',
    'nav.areas': 'PRACTICE AREAS',
    'nav.news': 'NEWS',
    'nav.blog': 'BLOG',
    'nav.contact': 'CONTACT',
    'nav.openMenu': 'Open menu',
    'nav.language': 'Language',
    'hero.cta': 'Contact Us',
    'about.title': '25 YEARS OF EXCELLENCE, CREDIBILITY AND LEGAL INNOVATION',
    'about.lead': 'We are a multi-sector, full-service law firm with more than 25 years of experience delivering comprehensive legal solutions to Brazilian and international clients.',
    'about.body': 'The CBLG team brings deep expertise across every facet of Business Law – tax, corporate, contracts, bankruptcy and restructuring, white-collar crime and compliance – together with a strong practice in complementary areas such as banking and finance, real estate, environmental law, estate and succession planning, and health care and education law, among others. This integration allows us to offer complete, tailored and efficient legal solutions for both day-to-day matters and highly complex projects.',
    'team.title': 'TEAM',
    'team.education': 'Education',
    'team.about': 'About',
    'areas.title': 'PRACTICE AREAS',
    'blog.latest': 'LATEST NEWS',
    'blog.pageTitle': 'CBLG NEWS',
    'blog.loading': 'Loading articles...',
    'blog.error': 'Could not load articles.',
    'blog.errorRetry': 'Could not load articles. Please try again later.',
    'blog.empty': 'No articles found.',
    'blog.readMore': 'Read more',
    'blog.seeMore': 'See More',
    'contact.title': 'CONTACT',
    'contact.saoPaulo': 'São Paulo Office',
    'contact.curitiba': 'Curitiba Office',
    'contact.rio': 'Rio de Janeiro Office',
    'contact.phone': 'Phone:',
    'contact.imageAlt': 'CBLG notebook and pen',
    'footer.tagline': 'Integrated, Multidisciplinary Practice',
    'footer.quickLinks': 'Quick Links',
    'footer.about': 'About',
    'footer.team': 'Team',
    'footer.areas': 'Practice Areas',
    'footer.blog': 'Blog',
    'footer.legal': 'Legal Information',
    'footer.privacy': 'Privacy Policy',
    'footer.social': 'Follow Us',
    'footer.rights': 'All rights reserved.',
    'cookie.title': 'Manage Your Privacy',
    'cookie.text': 'This website uses cookies to compile statistics about how it is used. No personal data is collected through cookies.',
    'cookie.privacy': 'Privacy Policy',
    'cookie.accept': 'Accept',
    'cookie.decline': 'Decline',
    'privacy.title': 'Privacy Policy',
    'privacy.subtitle': 'Personal Data Protection and Processing',
    'rd.hero.lead': '25 years of',
    'rd.hero.em': 'excellence,',
    'rd.hero.tail': 'credibility and legal innovation.',
    'rd.meetTeam': 'Meet the team',
    'rd.viewProfile': 'View profile',
    'rd.close': 'Close',
    'rd.menu': 'Menu',
    'rd.offices': 'Offices',
    'rd.news': 'News',
    'rd.contact': 'Contact',
    'rd.viewAll': 'View all news',
    'rd.map': 'View on map',
    'rd.years': 'years of practice',
    'rd.areasCount': 'practice areas',
    'rd.officesCount': 'offices',
    'rd.previous': 'Previous',
    'rd.next': 'Next',
    'rd.meetingAlt': 'CBLG team in a meeting at the office',
    'rd.buildingAlt': 'Facade of the CBLG office building in São Paulo'
  }
}

const DATE_LOCALES = { pt: 'pt-BR', en: 'en-US' }
const HTML_LANGS = { pt: 'pt-BR', en: 'en' }

// The choice lives for the browser session only, so every new visit starts in Portuguese
const readStoredLocale = () => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    return SUPPORTED_LOCALES.includes(stored) ? stored : null
  } catch (_) {
    return null
  }
}

export const locale = ref(readStoredLocale() || DEFAULT_LOCALE)

watch(locale, (value) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, value)
  } catch (_) {
    // noop
  }
  document.documentElement.lang = HTML_LANGS[value]
  document.title = messages[value]['meta.title']
}, { immediate: true })

export const setLocale = (value) => {
  if (SUPPORTED_LOCALES.includes(value)) locale.value = value
}

export const t = (key) => messages[locale.value][key] ?? messages[DEFAULT_LOCALE][key] ?? key

// Reads `key` from a data object, preferring its `<key>_en` sibling when English is active
export const localized = (item, key) => {
  if (!item) return undefined
  if (locale.value !== DEFAULT_LOCALE) {
    const translated = item[`${key}_${locale.value}`]
    if (translated) return translated
  }
  return item[key]
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString(DATE_LOCALES[locale.value], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
