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
    guide_title: 'Discover Barcelona',
    guide_sub: 'A local guide to food, culture, neighbourhoods and hidden gems — curated by our expert team.',
    guide_all: 'All',
    guide_culture: 'Culture & Events',
    guide_food: 'Food & Drinks',
    guide_areas: 'Areas & Neighbourhoods',
    contact_title: 'Get In Touch',
    contact_sub: "We'd love to hear from you. Our team responds within 24 hours.",
    contact_email_label: 'Email Us',
    contact_phone_label: 'Call Us',
    contact_location_label: 'Based In',
    contact_plan_title: "Let's Plan Your ",
    contact_plan_highlight: 'Barcelona Experience',
    contact_plan_desc: "Whether you have a question about one of our tours, need a custom group experience, or simply want to know more about Barcelona — we're here for you.",
    contact_hours_title: 'Response Hours',
    contact_hours_weekday: 'Monday – Friday',
    contact_hours_sat: 'Saturday',
    contact_hours_sun: 'Sunday',
    contact_form_title: 'Send Us a Message',
    contact_form_sub: "Fill in the form below and we'll get back to you as soon as possible.",
    contact_firstname: 'First Name',
    contact_lastname: 'Last Name',
    contact_email: 'Email Address',
    contact_subject: 'Subject',
    contact_subject_placeholder: 'Select a topic...',
    contact_subject_private: 'Private Group Booking',
    contact_subject_general: 'General Question',
    contact_message: 'Message',
    contact_send: 'Send Message →',
    contact_success_title: 'Message Sent!',
    contact_success_sub: "Thank you for reaching out. We'll reply within 24 hours.",
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
    guide_title: 'Découvrez Barcelone',
    guide_sub: 'Un guide local sur la nourriture, la culture, les quartiers et les joyaux cachés — sélectionné par notre équipe.',
    guide_all: 'Tout',
    guide_culture: 'Culture & Événements',
    guide_food: 'Gastronomie & Boissons',
    guide_areas: 'Quartiers & Zones',
    contact_title: 'Nous Contacter',
    contact_sub: 'Nous serions ravis de vous entendre. Notre équipe répond dans les 24 heures.',
    contact_email_label: 'Email',
    contact_phone_label: 'Téléphone',
    contact_location_label: 'Basé À',
    contact_plan_title: 'Planifions Votre ',
    contact_plan_highlight: 'Expérience à Barcelone',
    contact_plan_desc: "Que vous ayez une question sur l'une de nos visites, un besoin de groupe privé ou simplement envie d'en savoir plus — nous sommes là pour vous.",
    contact_hours_title: 'Horaires de Réponse',
    contact_hours_weekday: 'Lundi – Vendredi',
    contact_hours_sat: 'Samedi',
    contact_hours_sun: 'Dimanche',
    contact_form_title: 'Envoyez-nous un Message',
    contact_form_sub: 'Remplissez le formulaire ci-dessous et nous vous répondrons dès que possible.',
    contact_firstname: 'Prénom',
    contact_lastname: 'Nom',
    contact_email: 'Adresse Email',
    contact_subject: 'Sujet',
    contact_subject_placeholder: 'Choisir un sujet...',
    contact_subject_private: 'Réservation Privée',
    contact_subject_general: 'Question Générale',
    contact_message: 'Message',
    contact_send: 'Envoyer →',
    contact_success_title: 'Message Envoyé!',
    contact_success_sub: 'Merci de nous avoir contactés. Nous répondrons dans les 24 heures.',
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
    guide_title: 'Descubra Barcelona',
    guide_sub: 'Um guia local sobre comida, cultura, bairros e joias escondidas — curado pela nossa equipa.',
    guide_all: 'Tudo',
    guide_culture: 'Cultura & Eventos',
    guide_food: 'Gastronomia & Bebidas',
    guide_areas: 'Bairros & Zonas',
    contact_title: 'Fale Connosco',
    contact_sub: 'Adorávamos ouvir de si. A nossa equipa responde em 24 horas.',
    contact_email_label: 'Email',
    contact_phone_label: 'Telefone',
    contact_location_label: 'Localização',
    contact_plan_title: 'Vamos Planear a Sua ',
    contact_plan_highlight: 'Experiência em Barcelona',
    contact_plan_desc: 'Seja uma dúvida sobre os tours, uma experiência de grupo privado ou simplesmente mais informações — estamos aqui para si.',
    contact_hours_title: 'Horário de Resposta',
    contact_hours_weekday: 'Segunda – Sexta',
    contact_hours_sat: 'Sábado',
    contact_hours_sun: 'Domingo',
    contact_form_title: 'Envie-nos uma Mensagem',
    contact_form_sub: 'Preencha o formulário abaixo e responderemos o mais brevemente possível.',
    contact_firstname: 'Primeiro Nome',
    contact_lastname: 'Apelido',
    contact_email: 'Endereço de Email',
    contact_subject: 'Assunto',
    contact_subject_placeholder: 'Selecione um tópico...',
    contact_subject_private: 'Reserva Privada',
    contact_subject_general: 'Questão Geral',
    contact_message: 'Mensagem',
    contact_send: 'Enviar Mensagem →',
    contact_success_title: 'Mensagem Enviada!',
    contact_success_sub: 'Obrigado pelo contacto. Responderemos em 24 horas.',
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
    guide_title: 'Откройте Барселону',
    guide_sub: 'Местный путеводитель по еде, культуре, районам и скрытым жемчужинам — от нашей команды.',
    guide_all: 'Все',
    guide_culture: 'Культура & События',
    guide_food: 'Еда & Напитки',
    guide_areas: 'Районы & Кварталы',
    contact_title: 'Свяжитесь с Нами',
    contact_sub: 'Мы рады получить от вас сообщение. Наша команда отвечает в течение 24 часов.',
    contact_email_label: 'Написать',
    contact_phone_label: 'Позвонить',
    contact_location_label: 'Мы в',
    contact_plan_title: 'Спланируем Ваш ',
    contact_plan_highlight: 'Отдых в Барселоне',
    contact_plan_desc: 'Есть вопрос о турах, нужна частная экскурсия или просто хотите узнать больше о Барселоне — мы здесь для вас.',
    contact_hours_title: 'Часы Ответа',
    contact_hours_weekday: 'Понедельник – Пятница',
    contact_hours_sat: 'Суббота',
    contact_hours_sun: 'Воскресенье',
    contact_form_title: 'Отправить Сообщение',
    contact_form_sub: 'Заполните форму ниже и мы ответим как можно скорее.',
    contact_firstname: 'Имя',
    contact_lastname: 'Фамилия',
    contact_email: 'Эл. почта',
    contact_subject: 'Тема',
    contact_subject_placeholder: 'Выберите тему...',
    contact_subject_private: 'Частное бронирование',
    contact_subject_general: 'Общий вопрос',
    contact_message: 'Сообщение',
    contact_send: 'Отправить →',
    contact_success_title: 'Сообщение отправлено!',
    contact_success_sub: 'Спасибо за обращение. Мы ответим в течение 24 часов.',
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

window.setLanguage = setLanguage;

function initLang() {
  const saved = localStorage.getItem('4u_lang') || 'en';
  setLanguage(saved);
}

document.addEventListener('DOMContentLoaded', initLang);
