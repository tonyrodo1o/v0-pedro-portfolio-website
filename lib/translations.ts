export type Language = 'es' | 'en' | 'pt'

export const translations = {
  es: {
    // Navbar
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      aboutMe: 'Sobre Mí',
      specialties: 'Especialidades',
      portfolio: 'Portafolio',
      contact: 'Contacto',
      payments: 'Pagos',
    },
    // Hero
    hero: {
      greeting: 'Hola, soy',
      name: 'Pedro Rodriguez',
      title: 'Licenciado en Informática',
      subtitle: 'Desarrollador Full Stack & Especialista en IA',
      cta: 'Ver Proyectos',
      contact: 'Contactar',
    },
    // About
    about: {
      title: 'Acerca de',
      subtitle: 'Mi trayectoria profesional',
      description: 'Soy un profesional apasionado por la tecnología y la innovación. Con años de experiencia en desarrollo de software, me especializo en crear soluciones digitales que transforman ideas en realidad.',
      experience: 'Años de Experiencia',
      projects: 'Proyectos Completados',
      clients: 'Clientes Satisfechos',
      technologies: 'Tecnologías',
    },
    // About Me
    aboutMe: {
      title: 'Sobre Mí',
      subtitle: 'Conoce más sobre mi persona',
      bio: 'Como Licenciado en Informática, combino conocimiento técnico con creatividad para desarrollar soluciones innovadoras. Mi pasión por la tecnología me impulsa a estar siempre actualizado con las últimas tendencias del sector.',
      values: 'Mis valores incluyen la excelencia, la innovación continua y el compromiso con cada proyecto.',
      gallery: 'Mi Galería',
    },
    // Specialties
    specialties: {
      title: 'Especialidades',
      subtitle: 'Áreas de expertise',
      webDev: 'Desarrollo Web',
      webDevDesc: 'Creación de aplicaciones web modernas con las últimas tecnologías',
      ai: 'Inteligencia Artificial',
      aiDesc: 'Implementación de soluciones con IA y Machine Learning',
      mobile: 'Desarrollo Móvil',
      mobileDesc: 'Apps nativas y multiplataforma para iOS y Android',
      cloud: 'Cloud Computing',
      cloudDesc: 'Arquitecturas escalables en AWS, Azure y GCP',
      database: 'Bases de Datos',
      databaseDesc: 'Diseño y optimización de bases de datos SQL y NoSQL',
      security: 'Ciberseguridad',
      securityDesc: 'Protección de sistemas y datos sensibles',
    },
    // Portfolio
    portfolio: {
      title: 'Portafolio',
      subtitle: 'Mis proyectos destacados',
      viewProject: 'Ver Proyecto',
      visitSite: 'Visitar Sitio',
    },
    // Contact
    contact: {
      title: 'Contacto',
      subtitle: 'Trabajemos juntos',
      name: 'Nombre',
      email: 'Correo Electrónico',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
      sending: 'Enviando...',
      success: 'Mensaje enviado correctamente',
      error: 'Error al enviar el mensaje',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'tu@email.com',
      messagePlaceholder: 'Escribe tu mensaje aquí...',
    },
    // Payments
    payments: {
      title: 'Métodos de Pago',
      subtitle: 'Formas de pago aceptadas',
      stripe: 'Tarjetas de Crédito/Débito',
      paypal: 'PayPal',
      transfer: 'Transferencia Bancaria',
    },
    // Footer
    footer: {
      rights: 'Todos los derechos reservados',
      madeWith: 'Hecho con',
      by: 'por',
    },
    // Chatbot
    chatbot: {
      title: 'Asistente IA',
      placeholder: 'Escribe tu pregunta...',
      greeting: '¡Hola! Soy el asistente virtual de Pedro Rodriguez. ¿En qué puedo ayudarte?',
      thinking: 'Pensando...',
    },
    // Social
    social: {
      followMe: 'Sígueme en redes',
    },
  },
  en: {
    // Navbar
    nav: {
      home: 'Home',
      about: 'About',
      aboutMe: 'About Me',
      specialties: 'Specialties',
      portfolio: 'Portfolio',
      contact: 'Contact',
      payments: 'Payments',
    },
    // Hero
    hero: {
      greeting: 'Hello, I am',
      name: 'Pedro Rodriguez',
      title: 'Bachelor in Computer Science',
      subtitle: 'Full Stack Developer & AI Specialist',
      cta: 'View Projects',
      contact: 'Contact Me',
    },
    // About
    about: {
      title: 'About',
      subtitle: 'My professional journey',
      description: 'I am a professional passionate about technology and innovation. With years of experience in software development, I specialize in creating digital solutions that transform ideas into reality.',
      experience: 'Years of Experience',
      projects: 'Completed Projects',
      clients: 'Satisfied Clients',
      technologies: 'Technologies',
    },
    // About Me
    aboutMe: {
      title: 'About Me',
      subtitle: 'Get to know me better',
      bio: 'As a Bachelor in Computer Science, I combine technical knowledge with creativity to develop innovative solutions. My passion for technology drives me to always stay updated with the latest industry trends.',
      values: 'My values include excellence, continuous innovation, and commitment to every project.',
      gallery: 'My Gallery',
    },
    // Specialties
    specialties: {
      title: 'Specialties',
      subtitle: 'Areas of expertise',
      webDev: 'Web Development',
      webDevDesc: 'Creating modern web applications with the latest technologies',
      ai: 'Artificial Intelligence',
      aiDesc: 'Implementation of AI and Machine Learning solutions',
      mobile: 'Mobile Development',
      mobileDesc: 'Native and cross-platform apps for iOS and Android',
      cloud: 'Cloud Computing',
      cloudDesc: 'Scalable architectures on AWS, Azure, and GCP',
      database: 'Databases',
      databaseDesc: 'Design and optimization of SQL and NoSQL databases',
      security: 'Cybersecurity',
      securityDesc: 'Protection of systems and sensitive data',
    },
    // Portfolio
    portfolio: {
      title: 'Portfolio',
      subtitle: 'My featured projects',
      viewProject: 'View Project',
      visitSite: 'Visit Site',
    },
    // Contact
    contact: {
      title: 'Contact',
      subtitle: 'Let\'s work together',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully',
      error: 'Error sending message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      messagePlaceholder: 'Write your message here...',
    },
    // Payments
    payments: {
      title: 'Payment Methods',
      subtitle: 'Accepted payment methods',
      stripe: 'Credit/Debit Cards',
      paypal: 'PayPal',
      transfer: 'Bank Transfer',
    },
    // Footer
    footer: {
      rights: 'All rights reserved',
      madeWith: 'Made with',
      by: 'by',
    },
    // Chatbot
    chatbot: {
      title: 'AI Assistant',
      placeholder: 'Type your question...',
      greeting: 'Hello! I\'m Pedro Rodriguez\'s virtual assistant. How can I help you?',
      thinking: 'Thinking...',
    },
    // Social
    social: {
      followMe: 'Follow me on social media',
    },
  },
  pt: {
    // Navbar
    nav: {
      home: 'Início',
      about: 'Sobre',
      aboutMe: 'Sobre Mim',
      specialties: 'Especialidades',
      portfolio: 'Portfólio',
      contact: 'Contato',
      payments: 'Pagamentos',
    },
    // Hero
    hero: {
      greeting: 'Olá, eu sou',
      name: 'Pedro Rodriguez',
      title: 'Licenciado em Informática',
      subtitle: 'Desenvolvedor Full Stack & Especialista em IA',
      cta: 'Ver Projetos',
      contact: 'Contatar',
    },
    // About
    about: {
      title: 'Sobre',
      subtitle: 'Minha trajetória profissional',
      description: 'Sou um profissional apaixonado por tecnologia e inovação. Com anos de experiência em desenvolvimento de software, me especializo em criar soluções digitais que transformam ideias em realidade.',
      experience: 'Anos de Experiência',
      projects: 'Projetos Concluídos',
      clients: 'Clientes Satisfeitos',
      technologies: 'Tecnologias',
    },
    // About Me
    aboutMe: {
      title: 'Sobre Mim',
      subtitle: 'Conheça mais sobre mim',
      bio: 'Como Licenciado em Informática, combino conhecimento técnico com criatividade para desenvolver soluções inovadoras. Minha paixão pela tecnologia me impulsiona a estar sempre atualizado com as últimas tendências do setor.',
      values: 'Meus valores incluem excelência, inovação contínua e compromisso com cada projeto.',
      gallery: 'Minha Galeria',
    },
    // Specialties
    specialties: {
      title: 'Especialidades',
      subtitle: 'Áreas de expertise',
      webDev: 'Desenvolvimento Web',
      webDevDesc: 'Criação de aplicações web modernas com as últimas tecnologias',
      ai: 'Inteligência Artificial',
      aiDesc: 'Implementação de soluções com IA e Machine Learning',
      mobile: 'Desenvolvimento Mobile',
      mobileDesc: 'Apps nativos e multiplataforma para iOS e Android',
      cloud: 'Cloud Computing',
      cloudDesc: 'Arquiteturas escaláveis na AWS, Azure e GCP',
      database: 'Banco de Dados',
      databaseDesc: 'Design e otimização de bancos de dados SQL e NoSQL',
      security: 'Cibersegurança',
      securityDesc: 'Proteção de sistemas e dados sensíveis',
    },
    // Portfolio
    portfolio: {
      title: 'Portfólio',
      subtitle: 'Meus projetos em destaque',
      viewProject: 'Ver Projeto',
      visitSite: 'Visitar Site',
    },
    // Contact
    contact: {
      title: 'Contato',
      subtitle: 'Vamos trabalhar juntos',
      name: 'Nome',
      email: 'E-mail',
      message: 'Mensagem',
      send: 'Enviar Mensagem',
      sending: 'Enviando...',
      success: 'Mensagem enviada com sucesso',
      error: 'Erro ao enviar mensagem',
      namePlaceholder: 'Seu nome',
      emailPlaceholder: 'seu@email.com',
      messagePlaceholder: 'Escreva sua mensagem aqui...',
    },
    // Payments
    payments: {
      title: 'Métodos de Pagamento',
      subtitle: 'Formas de pagamento aceitas',
      stripe: 'Cartões de Crédito/Débito',
      paypal: 'PayPal',
      transfer: 'Transferência Bancária',
    },
    // Footer
    footer: {
      rights: 'Todos os direitos reservados',
      madeWith: 'Feito com',
      by: 'por',
    },
    // Chatbot
    chatbot: {
      title: 'Assistente IA',
      placeholder: 'Digite sua pergunta...',
      greeting: 'Olá! Sou o assistente virtual de Pedro Rodriguez. Como posso ajudá-lo?',
      thinking: 'Pensando...',
    },
    // Social
    social: {
      followMe: 'Siga-me nas redes sociais',
    },
  },
} as const

export type TranslationKey = keyof typeof translations.es
