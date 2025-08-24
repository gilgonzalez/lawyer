import React from 'react'
import { Link } from 'react-router-dom'
import { Page } from '../components/layout/Layout'
import { Scale, Shield, Users, FileText, Clock, CheckCircle, ArrowRight, Phone, Calendar, Sparkles, Star, Award, Zap, Heart } from 'lucide-react'

export default function Services() {
  const mainServices = [
    {
      icon: Scale,
      title: 'Derecho Civil',
      description: 'Asesoría integral en asuntos civiles con enfoque en la protección de tus derechos patrimoniales y personales.',
      services: [
        'Contratos civiles y mercantiles',
        'Responsabilidad civil y daños',
        'Derecho inmobiliario',
        'Sucesiones y testamentos',
        'Cobranza judicial y extrajudicial',
        'Arrendamientos urbanos'
      ],
      features: [
        'Consulta inicial gratuita',
        'Análisis detallado del caso',
        'Estrategia legal personalizada',
        'Seguimiento constante'
      ],
      gradient: 'from-primary-500 to-primary-600',
      popular: false
    },
    {
      icon: Shield,
      title: 'Derecho Penal',
      description: 'Defensa penal especializada con amplia experiencia en procedimientos judiciales y protección de derechos fundamentales.',
      services: [
        'Defensa en delitos federales',
        'Delitos económicos y financieros',
        'Violencia familiar y doméstica',
        'Delitos contra la salud',
        'Amparos penales',
        'Procedimientos abreviados'
      ],
      features: [
        'Atención 24/7 en emergencias',
        'Acompañamiento en declaraciones',
        'Estrategia de defensa integral',
        'Red de peritos especializados'
      ],
      gradient: 'from-accent-500 to-accent-600',
      popular: true
    },
    {
      icon: Users,
      title: 'Derecho Familiar',
      description: 'Soluciones legales sensibles y efectivas para asuntos familiares, priorizando el bienestar de todos los involucrados.',
      services: [
        'Divorcios consensuales y necesarios',
        'Custodia y régimen de visitas',
        'Pensiones alimenticias',
        'Adopciones nacionales e internacionales',
        'Violencia familiar',
        'Reconocimiento de paternidad'
      ],
      features: [
        'Mediación familiar',
        'Enfoque en el bienestar infantil',
        'Procesos confidenciales',
        'Apoyo psicológico coordinado'
      ],
      gradient: 'from-secondary-500 to-secondary-600',
      popular: false
    },
    {
      icon: FileText,
      title: 'Derecho Laboral',
      description: 'Protección integral de los derechos laborales tanto para trabajadores como empleadores.',
      services: [
        'Despidos injustificados',
        'Demandas laborales',
        'Contratos de trabajo',
        'Indemnizaciones y finiquitos',
        'Riesgos de trabajo',
        'Asesoría empresarial laboral'
      ],
      features: [
        'Evaluación gratuita del caso',
        'Cálculo de prestaciones',
        'Negociación extrajudicial',
        'Representación ante juntas'
      ],
      gradient: 'from-primary-600 to-accent-500',
      popular: false
    }
  ]

  const additionalServices = [
    {
      title: 'Mediación y Conciliación',
      description: 'Resolución alternativa de conflictos para evitar largos procesos judiciales.',
      icon: '🤝',
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      title: 'Asesoría Empresarial',
      description: 'Consultoría legal para empresas en constitución, contratos y cumplimiento normativo.',
      icon: '🏢',
      gradient: 'from-accent-500 to-accent-600'
    },
    {
      title: 'Derecho Migratorio',
      description: 'Trámites migratorios, visas, naturalizaciones y regularización de estatus.',
      icon: '🌍',
      gradient: 'from-secondary-500 to-secondary-600'
    },
    {
      title: 'Propiedad Intelectual',
      description: 'Registro y protección de marcas, patentes y derechos de autor.',
      icon: '💡',
      gradient: 'from-primary-600 to-accent-500'
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Consulta Inicial',
      description: 'Evaluamos tu caso de manera gratuita y confidencial para entender tus necesidades específicas.',
      icon: Users,
      color: 'from-primary-500 to-primary-600'
    },
    {
      step: '02',
      title: 'Análisis Legal',
      description: 'Realizamos un análisis detallado de la situación legal y desarrollamos una estrategia personalizada.',
      icon: Scale,
      color: 'from-accent-500 to-accent-600'
    },
    {
      step: '03',
      title: 'Propuesta de Servicios',
      description: 'Te presentamos un plan de acción claro con costos transparentes y tiempos estimados.',
      icon: FileText,
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      step: '04',
      title: 'Ejecución y Seguimiento',
      description: 'Implementamos la estrategia legal con comunicación constante sobre el progreso del caso.',
      icon: Heart,
      color: 'from-primary-600 to-accent-500'
    }
  ]

  const pricingOptions = [
    {
      icon: Clock,
      title: 'Por Horas',
      description: 'Para consultas y asesorías puntuales con tarifas competitivas.',
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      icon: FileText,
      title: 'Tarifa Fija',
      description: 'Para procedimientos estándar y trámites con costos predefinidos.',
      gradient: 'from-accent-500 to-accent-600'
    },
    {
      icon: Scale,
      title: 'Cuota Litis',
      description: 'Porcentaje del resultado obtenido, alineando nuestros intereses.',
      gradient: 'from-secondary-500 to-secondary-600'
    }
  ]

  return (
    <Page 
      title="Servicios Legales Especializados - Dra. María González"
      description="Servicios legales profesionales en derecho civil, penal, familiar y laboral. Consulta gratuita y atención personalizada con más de 15 años de experiencia."
      keywords="servicios legales, derecho civil, derecho penal, derecho familiar, derecho laboral, abogada, consulta legal"
    >
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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <Scale className="h-4 w-4 mr-2 text-accent-400" />
            <span>Servicios Especializados</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6 leading-tight">
            Servicios Legales
            <span className="block bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
              Especializados
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-12 text-primary-100 leading-relaxed max-w-4xl mx-auto">
            Ofrezco asesoría legal integral en las principales áreas del derecho, 
            con un enfoque personalizado y resultados comprobados respaldados por más de 15 años de experiencia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <Link
              to="/contact"
              className="group bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 lg:px-10 lg:py-5 rounded-2xl font-semibold text-lg hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-glow hover:shadow-glow-lg transform hover:-translate-y-1 inline-flex items-center"
            >
              <Calendar className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              <span>Consulta Gratuita</span>
            </Link>
            <a
              href="tel:+15551234567"
              className="group border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 lg:px-10 lg:py-5 rounded-2xl font-semibold text-lg hover:bg-white hover:text-primary-900 transition-all duration-300 inline-flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              <span>Llamar Ahora</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Especialidades Principales</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Nuestras Especialidades
            </h2>
            <p className="text-lg lg:text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              Áreas de práctica legal donde he desarrollado una sólida experiencia 
              y obtenido resultados excepcionales para mis clientes a lo largo de los años.
            </p>
          </div>
          
          <div className="space-y-20 lg:space-y-32">
            {mainServices.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} relative`}>
                    {service.popular && (
                      <div className="absolute -top-4 left-0">
                        <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-glow">
                          <Star className="h-4 w-4 inline mr-1" />
                          Más Solicitado
                        </div>
                      </div>
                    )}
                    
                    <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-3xl flex items-center justify-center mb-8 shadow-soft`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
                      {service.title}
                    </h3>
                    <p className="text-lg lg:text-xl text-neutral-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="mb-8">
                      <h4 className="text-xl font-display font-semibold text-neutral-900 mb-6">Servicios Incluidos:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {service.services.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-3 group">
                            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-neutral-700 leading-relaxed group-hover:text-neutral-900 transition-colors">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Link
                      to="/contact"
                      className={`group bg-gradient-to-r ${service.gradient} text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center`}
                    >
                      <span>Consultar Ahora</span>
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} relative`}>
                    <div className="bg-white/80 backdrop-blur-sm p-8 lg:p-10 rounded-3xl shadow-soft border border-neutral-100">
                      <div className="flex items-center mb-6">
                        <Award className="h-6 w-6 text-accent-500 mr-3" />
                        <h4 className="text-xl font-display font-semibold text-neutral-900">¿Por qué elegirnos?</h4>
                      </div>
                      <div className="space-y-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-4 group">
                            <div className="w-3 h-3 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform"></div>
                            <span className="text-neutral-700 leading-relaxed group-hover:text-neutral-900 transition-colors">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-accent-100 rounded-full text-accent-700 font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              <span>Servicios Complementarios</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Servicios Adicionales
            </h2>
            <p className="text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Ampliamos nuestros servicios para cubrir todas tus necesidades legales con soluciones integrales.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-soft hover:shadow-glow transition-all duration-500 hover:-translate-y-2 border border-neutral-100">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:shadow-glow transition-all duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">{service.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 to-accent-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 font-medium mb-6">
              <Clock className="h-4 w-4 mr-2" />
              <span>Proceso de Trabajo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-lg lg:text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              Un enfoque estructurado y transparente para garantizar los mejores resultados en cada caso que manejamos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center group relative">
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto shadow-soft group-hover:shadow-glow transition-all duration-300 mb-4`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-soft">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-display font-semibold text-neutral-900 mb-4">{step.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{step.description}</p>
                  
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-neutral-200 to-transparent transform translate-x-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Philosophy */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-secondary-100 rounded-full text-secondary-700 font-medium mb-6">
              <Scale className="h-4 w-4 mr-2" />
              <span>Honorarios Transparentes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Honorarios Transparentes
            </h2>
            <p className="text-lg lg:text-xl text-neutral-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              Creo en la transparencia total. Mis honorarios se establecen de manera clara 
              desde el inicio, sin sorpresas ni costos ocultos, adaptándome a cada situación.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pricingOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-soft hover:shadow-glow transition-all duration-500 hover:-translate-y-2 border border-neutral-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${option.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">{option.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{option.description}</p>
                </div>
              );
            })}
          </div>
          
          <div className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white p-10 lg:p-12 rounded-3xl shadow-2xl overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
            </div>
            
            <div className="relative text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 mr-2 text-accent-400" />
                <span>Oferta Especial</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-6">Consulta Inicial Gratuita</h3>
              <p className="text-lg lg:text-xl text-primary-100 mb-8 leading-relaxed max-w-3xl mx-auto">
                La primera consulta es completamente gratuita. Te explico tu situación legal, 
                las opciones disponibles y los costos involucrados sin ningún compromiso de tu parte.
              </p>
              <Link
                to="/contact"
                className="group bg-gradient-to-r from-accent-500 to-accent-600 text-white px-10 py-5 lg:px-12 lg:py-6 rounded-2xl font-semibold text-lg hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-glow hover:shadow-glow-lg transform hover:-translate-y-1 inline-flex items-center"
              >
                <Calendar className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                <span>Agendar Consulta Gratuita</span>
              </Link>
            </div>
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
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8">
            <Heart className="h-4 w-4 mr-2 text-accent-400" />
            <span>Atención Inmediata Disponible</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-8">
            ¿Necesitas Asesoría Legal Especializada?
          </h2>
          <p className="text-lg lg:text-xl mb-12 text-primary-100 max-w-4xl mx-auto leading-relaxed">
            No esperes más. Cada día cuenta cuando se trata de proteger tus derechos. 
            Contacta conmigo hoy mismo y obtén la representación legal que mereces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group bg-gradient-to-r from-accent-500 to-accent-600 text-white px-10 py-5 lg:px-12 lg:py-6 rounded-2xl font-semibold text-lg hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-glow hover:shadow-glow-lg transform hover:-translate-y-1 inline-flex items-center justify-center"
            >
              <Calendar className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
              <span>Agendar Consulta</span>
            </Link>
            <a
              href="tel:+15551234567"
              className="group border-2 border-white/30 backdrop-blur-sm text-white px-10 py-5 lg:px-12 lg:py-6 rounded-2xl font-semibold text-lg hover:bg-white hover:text-primary-900 transition-all duration-300 inline-flex items-center justify-center"
            >
              <Phone className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
              <span>Llamar Ahora</span>
            </a>
          </div>
        </div>
      </section>
    </Page>
  )
}