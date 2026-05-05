// 4U Barcelona - Main JS
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.navbar-nav');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => observer.observe(el));
});

// Multi-language support
const translations = {
  en: {
    nav_tours: 'Tours',
    nav_about: 'About Us',
    nav_contact: 'Contact',
    nav_blog: 'BCN Guide',
    hero_title: 'Discover Barcelona Like Never Before',
    hero_sub: 'Premium semi-private & private tours with expert local guides. Maximum 9 guests.',
    hero_cta: 'Explore Tours',
    section_tours: 'Our Experiences',
    section_tours_sub: 'Handcrafted tours designed for travelers who value authenticity and depth',
    section_why: 'Why Choose 4U Barcelona',
    feat_small: 'Small Groups',
    feat_small_desc: 'Maximum 9 people for an intimate, personalized experience',
    feat_expert: 'Expert Guides',
    feat_expert_desc: 'Passionate local historians with 20+ years of experience',
    feat_skip: 'Skip the Line',
    feat_skip_desc: 'Priority access included on all our tours',
    feat_private: 'Private Options',
    feat_private_desc: 'Exclusive private tours available for all experiences',
    book_now: 'Book Now',
    footer_tagline: 'Premium guided tours in Barcelona since 2012. Quality over quantity.',
  },
  fr: {
    nav_tours: 'Visites',
    nav_about: 'A Propos',
    nav_contact: 'Contact',
    nav_blog: 'Guide BCN',
    hero_title: 'Découvrez Barcelone Comme Jamais',
    hero_sub: 'Visites semi-privées & privées premium avec des guides locaux experts. Maximum 9 personnes.',
    hero_cta: 'Explorer les Visites',
    section_tours: 'Nos Expériences',
    section_tours_sub: 'Des visites conçues pour les voyageurs qui valorisent l\'authenticité',
    section_why: 'Pourquoi Choisir 4U Barcelona',
    feat_small: 'Petits Groupes',
    feat_small_desc: 'Maximum 9 personnes pour une expérience intime et personnalisée',
    feat_expert: 'Guides Experts',
    feat_expert_desc: 'Historiens locaux passionnés avec 20+ ans d\'expérience',
    feat_skip: 'Coupe-File',
    feat_skip_desc: 'Accès prioritaire inclus dans toutes nos visites',
    feat_private: 'Options Privées',
    feat_private_desc: 'Visites privées exclusives disponibles pour toutes les expériences',
    book_now: 'Réserver',
    footer_tagline: 'Visites guidées premium à Barcelone depuis 2012. La qualité avant la quantité.',
  },
  pt: {
    nav_tours: 'Tours',
    nav_about: 'Sobre Nós',
    nav_contact: 'Contacto',
    nav_blog: 'Guia BCN',
    hero_title: 'Descubra Barcelona Como Nunca',
    hero_sub: 'Tours semi-privados & privados premium com guias locais especializados. Máximo 9 pessoas.',
    hero_cta: 'Explorar Tours',
    section_tours: 'As Nossas Experiências',
    section_tours_sub: 'Tours artesanais desenhados para viajantes que valorizam autenticidade',
    section_why: 'Porquê Escolher 4U Barcelona',
    feat_small: 'Grupos Pequenos',
    feat_small_desc: 'Máximo 9 pessoas para uma experiência íntima e personalizada',
    feat_expert: 'Guias Especialistas',
    feat_expert_desc: 'Historiadores locais apaixonados com 20+ anos de experiência',
    feat_skip: 'Sem Filas',
    feat_skip_desc: 'Acesso prioritário incluído em todos os tours',
    feat_private: 'Opções Privadas',
    feat_private_desc: 'Tours privados exclusivos disponíveis para todas as experiências',
    book_now: 'Reservar',
    footer_tagline: 'Tours guiados premium em Barcelona desde 2012. Qualidade acima de quantidade.',
  },
  ru: {
    nav_tours: 'Туры',
    nav_about: 'О Нас',
    nav_contact: 'Контакт',
    nav_blog: 'Гид BCN',
    hero_title: 'Откройте Барселону Заново',
    hero_sub: 'Премиум полу-частные и частные туры с экспертными местными гидами. Максимум 9 гостей.',
    hero_cta: 'Выбрать Тур',
    section_tours: 'Наши Туры',
    section_tours_sub: 'Уникальные туры для путешественников, ценящих аутентичность',
    section_why: 'Почему 4U Barcelona',
    feat_small: 'Малые Группы',
    feat_small_desc: 'Максимум 9 человек для индивидуального опыта',
    feat_expert: 'Эксперт-Гиды',
    feat_expert_desc: 'Страстные местные историки с 20+ летним опытом',
    feat_skip: 'Без Очереди',
    feat_skip_desc: 'Приоритетный доступ включён во все туры',
    feat_private: 'Частные Опции',
    feat_private_desc: 'Эксклюзивные частные туры доступны для всех экскурсий',
    book_now: 'Забронировать',
    footer_tagline: 'Премиум экскурсии в Барселоне с 2012 года. Качество превыше количества.',
  }
};

function setLanguage(lang) {
  localStorage.setItem('4u_lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  document.querySelectorAll('.lang-selector a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-lang') === lang);
  });
}

function initLang() {
  const saved = localStorage.getItem('4u_lang') || 'en';
  setLanguage(saved);
}

document.addEventListener('DOMContentLoaded', initLang);
