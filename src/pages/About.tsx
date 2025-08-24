import React from 'react'
import { Page } from '../components/layout/Layout'
import { Award, BookOpen, Users, Scale, Calendar, MapPin, Phone, Mail } from 'lucide-react'

export default function About() {
  const education = [
    {
      degree: 'Licenciatura en Derecho',
      institution: 'Universidad Nacional Autónoma de México (UNAM)',
      year: '2008',
      honors: 'Magna Cum Laude'
    },
    {
      degree: 'Maestría en Derecho Civil',
      institution: 'Universidad Panamericana',
      year: '2010',
      honors: 'Mención Honorífica'
    },
    {
      degree: 'Especialización en Derecho Familiar',
      institution: 'Colegio de Abogados de México',
      year: '2012',
      honors: 'Certificación Profesional'
    }
  ]

  const experience = [
    {
      position: 'Socia Fundadora',
      company: 'Bufete González & Asociados',
      period: '2015 - Presente',
      description: 'Dirección y coordinación de casos complejos en derecho civil, familiar y laboral. Supervisión de equipo legal y desarrollo de estrategias jurídicas.'
    },
    {
      position: 'Abogada Senior',
      company: 'Despacho Jurídico Martínez',
      period: '2012 - 2015',
      description: 'Especialización en derecho familiar y civil. Representación en más de 200 casos exitosos con enfoque en mediación y resolución de conflictos.'
    },
    {
      position: 'Abogada Asociada',
      company: 'Corporativo Legal del Centro',
      period: '2009 - 2012',
      description: 'Práctica general del derecho con énfasis en derecho laboral y penal. Desarrollo de habilidades en litigación y asesoría empresarial.'
    }
  ]

  const certifications = [
    'Colegio de Abogados de México - Miembro Activo',
    'Barra Mexicana de Abogados - Certificación en Derecho Civil',
    'Instituto Nacional de Mediación - Mediadora Certificada',
    'Asociación Nacional de Abogados Familiares - Especialista Certificada'
  ]

  const achievements = [
    {
      title: 'Abogada del Año 2023',
      organization: 'Colegio de Abogados del Estado',
      description: 'Reconocimiento por excelencia profesional y contribución a la comunidad legal.'
    },
    {
      title: 'Premio a la Excelencia Jurídica',
      organization: 'Barra Mexicana de Abogados',
      description: 'Por destacada trayectoria en derecho familiar y civil.'
    },
    {
      title: 'Reconocimiento por Servicio Comunitario',
      organization: 'Fundación Pro Bono México',
      description: 'Por brindar servicios legales gratuitos a familias de bajos recursos.'
    }
  ]

  return (
    <Page 
      title="Sobre Dra. María González - Biografía y Experiencia Profesional"
      description="Conoce la trayectoria profesional de la Dra. María González, abogada especialista con más de 15 años de experiencia en derecho civil, familiar, penal y laboral."
      keywords="María González, abogada, biografía, experiencia profesional, educación legal, certificaciones"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent">
                Dra. María González
              </h1>
              <p className="text-lg lg:text-xl text-primary-100 mb-8 leading-relaxed max-w-2xl">
                Abogada especialista con más de 15 años de experiencia dedicada a 
                proteger los derechos de mis clientes con profesionalismo, integridad 
                y un compromiso inquebrantable con la justicia.
              </p>
              <div className="flex flex-wrap gap-4 lg:gap-6">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <Award className="h-5 w-5 text-accent-400" />
                  <span className="text-sm lg:text-base font-medium">15+ Años de Experiencia</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <Users className="h-5 w-5 text-accent-400" />
                  <span className="text-sm lg:text-base font-medium">500+ Casos Exitosos</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <Scale className="h-5 w-5 text-accent-400" />
                  <span className="text-sm lg:text-base font-medium">4 Áreas de Especialización</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end animate-fade-in-up animation-delay-200">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent-400 to-secondary-400 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                <img
                  src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20portrait%20of%20confident%20female%20lawyer%20in%20elegant%20navy%20business%20suit%2C%20warm%20smile%2C%20law%20office%20background%20with%20bookshelves%2C%20professional%20headshot%20photography%2C%20high%20quality&image_size=portrait_4_3"
                  alt="Dra. María González - Retrato Profesional"
                  className="relative rounded-2xl shadow-2xl max-w-sm lg:max-w-md border-2 border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Mi Historia Profesional
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-500 to-secondary-500 mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Una trayectoria construida sobre la base de la excelencia, la integridad y el compromiso con la justicia.
            </p>
          </div>
          
          <div className="space-y-8 animate-fade-in-up animation-delay-200">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-soft border border-neutral-200/50">
              <p className="text-lg lg:text-xl text-neutral-700 leading-relaxed mb-6">
                Mi pasión por el derecho nació desde muy joven, motivada por el deseo de ayudar 
                a las personas a resolver sus conflictos legales y proteger sus derechos fundamentales. 
                A lo largo de mi carrera, he tenido el privilegio de representar a cientos de clientes 
                en casos que van desde disputas civiles complejas hasta delicados asuntos familiares.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 lg:p-10 shadow-soft border border-primary-200/50">
              <p className="text-lg lg:text-xl text-neutral-700 leading-relaxed mb-6">
                Mi filosofía profesional se basa en tres pilares fundamentales: la excelencia técnica, 
                la comunicación transparente y el compromiso personal con cada caso. Creo firmemente 
                que cada cliente merece una representación legal de la más alta calidad, independientemente 
                de la complejidad de su situación.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-soft border border-neutral-200/50">
              <p className="text-lg lg:text-xl text-neutral-700 leading-relaxed mb-6">
                Durante mis años de práctica, he desarrollado una reputación sólida por mi capacidad 
                para encontrar soluciones creativas a problemas legales complejos, siempre priorizando 
                los intereses de mis clientes y buscando resoluciones que sean tanto justas como prácticas.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-secondary-50 to-accent-50 rounded-2xl p-8 lg:p-10 shadow-soft border border-secondary-200/50">
              <p className="text-lg lg:text-xl text-neutral-700 leading-relaxed">
                Además de mi práctica privada, dedico tiempo a actividades pro bono, brindando 
                servicios legales gratuitos a familias de bajos recursos, porque creo que el acceso 
                a la justicia es un derecho fundamental que debe estar al alcance de todos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Formación Académica
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-500 to-secondary-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto">
              Una sólida base educativa respaldada por las mejores instituciones del país.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {education.map((edu, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-soft border border-neutral-200/50 hover:shadow-glow hover:border-primary-300/50 transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <div className="bg-gradient-to-br from-primary-100 to-accent-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-primary-700" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-700 transition-colors">{edu.degree}</h3>
                <p className="text-primary-700 font-medium mb-2 text-sm lg:text-base">{edu.institution}</p>
                <p className="text-neutral-600 mb-3 text-sm lg:text-base">{edu.year}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-accent-100 to-secondary-100 border border-accent-200">
                  <p className="text-accent-700 font-medium text-sm">{edu.honors}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Experiencia Profesional
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-500 to-secondary-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto">
              Una trayectoria marcada por el crecimiento continuo y la excelencia profesional.
            </p>
          </div>
          
          <div className="space-y-6 lg:space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-soft border border-neutral-200/50 hover:shadow-glow hover:border-primary-300/50 transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 150}ms`}}>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">{exp.position}</h3>
                    <p className="text-primary-700 font-medium text-base lg:text-lg mb-2">{exp.company}</p>
                  </div>
                  <div className="flex items-center text-neutral-600 mt-2 lg:mt-0 lg:ml-6">
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-accent-100 to-secondary-100 px-4 py-2 rounded-full border border-accent-200">
                      <Calendar className="h-4 w-4 text-accent-600" />
                      <span className="text-sm lg:text-base font-medium text-accent-700">{exp.period}</span>
                    </div>
                  </div>
                </div>
                <p className="text-neutral-700 leading-relaxed text-base lg:text-lg">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Achievements */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Certifications */}
            <div className="animate-fade-in-up">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-8">
                Certificaciones y Membresías
              </h2>
              <div className="space-y-4 lg:space-y-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 lg:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-neutral-200/50 hover:shadow-glow hover:border-accent-300/50 transition-all duration-300" style={{animationDelay: `${index * 100}ms`}}>
                    <div className="bg-gradient-to-br from-accent-100 to-secondary-100 p-2 rounded-xl flex-shrink-0">
                      <Award className="h-5 w-5 text-accent-600" />
                    </div>
                    <p className="text-neutral-700 leading-relaxed text-sm lg:text-base">{cert}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Achievements */}
            <div className="animate-fade-in-up animation-delay-200">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-8">
                Reconocimientos
              </h2>
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="group bg-white/80 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-soft border border-neutral-200/50 hover:shadow-glow hover:border-primary-300/50 transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 150}ms`}}>
                    <h3 className="text-lg lg:text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-700 transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-primary-700 font-medium mb-3 text-sm lg:text-base">{achievement.organization}</p>
                    <p className="text-neutral-600 text-sm lg:text-base leading-relaxed">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-6">
              ¿Listo para Trabajar Juntos?
            </h2>
            <p className="text-lg lg:text-xl text-primary-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Mi experiencia y dedicación están a tu servicio. Contacta conmigo para 
              una consulta personalizada sobre tu caso.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 animate-fade-in-up animation-delay-200">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="bg-gradient-to-br from-accent-400 to-secondary-400 p-3 rounded-xl">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="text-center md:text-left">
                <p className="font-semibold text-lg">Oficina</p>
                <p className="text-primary-100">Av. Reforma 123, CDMX</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="bg-gradient-to-br from-accent-400 to-secondary-400 p-3 rounded-xl">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="text-center md:text-left">
                <p className="font-semibold text-lg">Teléfono</p>
                <p className="text-primary-100">+52 55 1234 5678</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="bg-gradient-to-br from-accent-400 to-secondary-400 p-3 rounded-xl">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="text-center md:text-left">
                <p className="font-semibold text-lg">Email</p>
                <p className="text-primary-100">contacto@mariagonzalez.mx</p>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in-up animation-delay-300">
            <a
              href="/contact"
              className="group bg-gradient-to-r from-accent-500 to-secondary-500 text-white px-8 lg:px-12 py-4 lg:py-6 rounded-2xl font-semibold text-lg lg:text-xl hover:from-accent-600 hover:to-secondary-600 transition-all duration-300 inline-flex items-center shadow-glow hover:shadow-xl hover:scale-105"
            >
              <Calendar className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Agendar Consulta Gratuita
            </a>
          </div>
        </div>
      </section>
    </Page>
  )
}