import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Users, Award, Clock, ArrowRight, Star, CheckCircle, Sparkles, Shield, Heart } from 'lucide-react';
import { Page } from '../components/layout/Layout';

const Home: React.FC = () => {
  const services = [
    {
      title: 'Derecho Civil',
      description: 'Contratos, responsabilidad civil, daños y perjuicios',
      icon: Scale,
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      title: 'Derecho Penal',
      description: 'Defensa penal, delitos económicos, recursos',
      icon: Shield,
      gradient: 'from-accent-500 to-accent-600',
    },
    {
      title: 'Derecho Laboral',
      description: 'Despidos, indemnizaciones, conflictos laborales',
      icon: Users,
      gradient: 'from-secondary-500 to-secondary-600',
    },
  ];

  const testimonials = [
    {
      name: 'Ana García',
      role: 'Cliente',
      content: 'Excelente profesional, me ayudó a resolver mi caso de manera eficiente y con gran dedicación.',
      rating: 5,
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20woman%20headshot%20portrait%20smiling%20confident%20business%20attire%20clean%20background&image_size=square',
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Empresario',
      content: 'Su asesoría legal ha sido fundamental para el crecimiento de mi empresa. Altamente recomendada.',
      rating: 5,
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20businessman%20headshot%20portrait%20smiling%20confident%20suit%20clean%20background&image_size=square',
    },
    {
      name: 'María López',
      role: 'Cliente',
      content: 'Profesionalismo y cercanía. Siempre disponible para resolver mis dudas legales.',
      rating: 5,
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20woman%20headshot%20portrait%20friendly%20smile%20business%20casual%20clean%20background&image_size=square',
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Nuevas Reformas en el Código Civil',
      excerpt: 'Análisis de las últimas modificaciones y su impacto en los contratos civiles.',
      date: '2024-01-15',
      readTime: '5 min',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20law%20books%20legal%20documents%20desk%20professional%20office%20setting&image_size=landscape_4_3',
    },
    {
      id: 2,
      title: 'Derechos Laborales: Guía Completa',
      excerpt: 'Todo lo que necesitas saber sobre tus derechos como trabajador en 2024.',
      date: '2024-01-10',
      readTime: '8 min',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=business%20handshake%20professional%20meeting%20office%20workplace%20rights&image_size=landscape_4_3',
    },
    {
      id: 3,
      title: 'Cómo Redactar un Contrato Efectivo',
      excerpt: 'Consejos prácticos para evitar problemas legales en tus acuerdos comerciales.',
      date: '2024-01-05',
      readTime: '6 min',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=contract%20signing%20legal%20documents%20pen%20professional%20business%20agreement&image_size=landscape_4_3',
    },
  ];

  return (
    <Page 
      title="Dra. María González - Abogada Especialista | Asesoría Legal Profesional"
      description="Servicios legales profesionales con más de 15 años de experiencia. Especialista en derecho civil, penal, laboral y familiar. Consulta gratuita disponible."
      keywords="abogada, servicios legales, derecho civil, derecho penal, asesoría legal, consulta gratuita, María González"
    >
      <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-20 lg:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-accent-900/90" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 mr-2 text-accent-400" />
                <span>15+ años de experiencia</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6 leading-tight">
                Asesoría Legal
                <span className="block bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
                  Profesional
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-primary-100 leading-relaxed max-w-2xl">
                Brindo servicios legales integrales con un enfoque personalizado, 
                combinando experiencia y dedicación para cada cliente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                <Link
                  to="/contact"
                  className="group bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 lg:px-10 lg:py-5 rounded-2xl font-semibold hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-glow hover:shadow-glow-lg transform hover:-translate-y-1 inline-flex items-center justify-center"
                >
                  <span>Consulta Gratuita</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="group border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 lg:px-10 lg:py-5 rounded-2xl font-semibold hover:bg-white hover:text-primary-900 transition-all duration-300 inline-flex items-center justify-center"
                >
                  <span>Ver Servicios</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20lawyer%20portrait%20confident%20smile%20business%20suit%20modern%20office%20background%20high%20quality&image_size=portrait_4_3"
                  alt="Dra. María González"
                  className="rounded-3xl shadow-2xl w-full max-w-lg mx-auto"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-3xl blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {[
              { number: '15+', label: 'Años de Experiencia', icon: Award },
              { number: '500+', label: 'Casos Exitosos', icon: CheckCircle },
              { number: '98%', label: 'Satisfacción del Cliente', icon: Heart },
            ].map(({ number, label, icon: Icon }, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-soft group-hover:shadow-glow transition-all duration-300 mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-2">{number}</div>
                <div className="text-neutral-600 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 font-medium mb-6">
              <Scale className="h-4 w-4 mr-2" />
              <span>Servicios Especializados</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Asesoría Legal Integral
            </h2>
            <p className="text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Ofrezco servicios legales especializados en diversas áreas del derecho, 
              adaptándome a las necesidades específicas de cada cliente.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="group bg-white/80 backdrop-blur-sm p-8 lg:p-10 rounded-3xl shadow-soft hover:shadow-glow transition-all duration-500 hover:-translate-y-2 border border-neutral-100">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl shadow-soft group-hover:shadow-glow transition-all duration-300 mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-display font-semibold text-neutral-900 mb-4">{service.title}</h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">{service.description}</p>
                  <Link
                    to="/services"
                    className="group/link text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center transition-colors duration-300"
                  >
                    <span>Más información</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-4 py-2 bg-accent-100 rounded-full text-accent-700 font-medium mb-6">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>¿Por qué elegirnos?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-8">
                Experiencia que marca la diferencia
              </h2>
              <div className="space-y-6 lg:space-y-8">
                {[
                  {
                    title: 'Experiencia Comprobada',
                    description: 'Más de 15 años resolviendo casos complejos con éxito.',
                    icon: Award,
                  },
                  {
                    title: 'Atención Personalizada',
                    description: 'Cada caso recibe atención individual y estrategias específicas.',
                    icon: Heart,
                  },
                  {
                    title: 'Disponibilidad Total',
                    description: 'Comunicación constante y respuesta rápida a sus consultas.',
                    icon: Clock,
                  },
                  {
                    title: 'Honorarios Transparentes',
                    description: 'Costos claros desde el inicio, sin sorpresas.',
                    icon: Shield,
                  },
                ].map(({ title, description, icon: Icon }, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-neutral-900 text-lg mb-2">{title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative z-10">
                <img
                  src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20law%20office%20interior%20professional%20workspace%20books%20desk%20elegant%20lighting&image_size=portrait_4_3"
                  alt="Oficina legal moderna"
                  className="rounded-3xl shadow-2xl w-full"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 to-accent-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-accent-100 rounded-full text-accent-700 font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              <span>Testimonios</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Lo que dicen mis clientes
            </h2>
            <p className="text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto">
              La satisfacción de mis clientes es mi mayor logro profesional.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-8 lg:p-10 rounded-3xl shadow-soft hover:shadow-glow transition-all duration-500 hover:-translate-y-2 border border-neutral-100">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent-400 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-8 italic leading-relaxed text-lg">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-display font-semibold text-neutral-900">{testimonial.name}</div>
                    <div className="text-neutral-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 font-medium mb-6">
              <Clock className="h-4 w-4 mr-2" />
              <span>Blog Legal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Últimas Publicaciones
            </h2>
            <p className="text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto">
              Mantente informado con análisis legales y consejos prácticos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {blogPosts.map((post) => (
              <article key={post.id} className="group bg-neutral-50 rounded-3xl overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center text-sm text-neutral-500 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{post.readTime}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-display font-semibold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="group/link text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center transition-colors duration-300"
                  >
                    <span>Leer más</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-12 lg:mt-16">
            <Link
              to="/blog"
              className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 lg:px-10 lg:py-5 rounded-2xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-soft hover:shadow-glow transform hover:-translate-y-1 inline-flex items-center"
            >
              <span>Ver todos los artículos</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 right-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4 mr-2 text-accent-400" />
            <span>Consulta Gratuita Disponible</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-8">
            ¿Necesitas asesoría legal?
          </h2>
          <p className="text-lg lg:text-xl mb-12 text-primary-100 max-w-4xl mx-auto leading-relaxed">
            No esperes más. Agenda tu consulta gratuita y obtén la orientación 
            legal profesional que necesitas para resolver tu situación de manera efectiva.
          </p>
          <Link
            to="/contact"
            className="group bg-gradient-to-r from-accent-500 to-accent-600 text-white px-10 py-5 lg:px-12 lg:py-6 rounded-2xl font-semibold hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-glow hover:shadow-glow-lg transform hover:-translate-y-1 inline-flex items-center text-lg"
          >
            <span>Agendar Consulta Gratuita</span>
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
      </div>
    </Page>
  );
};

export default Home;