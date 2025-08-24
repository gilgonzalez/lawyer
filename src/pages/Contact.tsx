import React, { useState } from 'react'
import { Page } from '../components/layout/Layout'
import { supabase } from '../lib/supabase'
import { MapPin, Phone, Mail, Clock, Calendar, Send, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react'

interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  consultation_type: string
  preferred_contact: string
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consultation_type: 'general',
    preferred_contact: 'email'
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const consultationTypes = [
    { value: 'general', label: 'Consulta General' },
    { value: 'civil', label: 'Derecho Civil' },
    { value: 'penal', label: 'Derecho Penal' },
    { value: 'familiar', label: 'Derecho Familiar' },
    { value: 'laboral', label: 'Derecho Laboral' },
    { value: 'empresarial', label: 'Derecho Empresarial' },
    { value: 'migratorio', label: 'Derecho Migratorio' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Por favor completa todos los campos requeridos')
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Por favor ingresa un email válido')
      }

      // Submit to Supabase
      const { error: submitError } = await supabase
        .from('contact_inquiries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            subject: formData.subject || 'Consulta desde sitio web',
            message: formData.message,
            consultation_type: formData.consultation_type,
            preferred_contact: formData.preferred_contact,
            status: 'pending'
          }
        ])

      if (submitError) throw submitError

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        consultation_type: 'general',
        preferred_contact: 'email'
      })

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)

    } catch (error: any) {
      setError(error.message || 'Error al enviar el mensaje. Por favor intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const officeHours = [
    { day: 'Lunes - Viernes', hours: '9:00 AM - 6:00 PM' },
    { day: 'Sábados', hours: '9:00 AM - 2:00 PM' },
    { day: 'Domingos', hours: 'Cerrado' }
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: 'Teléfono',
      value: '+1 (555) 123-4567',
      description: 'Llamadas de lunes a viernes',
      action: 'tel:+15551234567'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'contacto@dramariaabogada.com',
      description: 'Respuesta en 24 horas',
      action: 'mailto:contacto@dramariaabogada.com'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      value: '+1 (555) 123-4567',
      description: 'Mensajes las 24 horas',
      action: 'https://wa.me/15551234567'
    }
  ]

  return (
    <Page 
      title="Contacto - Consulta Legal Gratuita"
      description="Contacta con la Dra. María González para una consulta legal gratuita. Oficina en el centro de la ciudad con horarios flexibles."
      keywords="contacto, consulta legal, abogada, asesoría jurídica, consulta gratuita"
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-accent-900/90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent">
              Contacto
            </h1>
            <p className="text-xl lg:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Estamos aquí para ayudarte. Agenda tu consulta gratuita y obtén 
              la asesoría legal que necesitas.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Múltiples Formas de Contacto
            </h2>
            <p className="text-xl lg:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Elige la forma que más te convenga para comunicarte con nosotros.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <div key={index} className="group text-center p-8 lg:p-10 bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft hover:shadow-glow border border-neutral-200/50 hover:border-primary-300/50 transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
                  <div className="bg-gradient-to-br from-primary-100 to-accent-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-10 w-10 text-primary-600" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-display font-bold text-neutral-900 mb-4">{method.title}</h3>
                  <a 
                    href={method.action}
                    className="text-primary-700 font-semibold text-lg lg:text-xl hover:text-primary-800 transition-colors block mb-3 group-hover:scale-105 transition-transform duration-300"
                  >
                    {method.value}
                  </a>
                  <p className="text-neutral-600 text-sm lg:text-base leading-relaxed">{method.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-glow border border-neutral-200/50 p-8 lg:p-12 animate-fade-in-up">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Envíanos un Mensaje
              </h2>
              
              {success && (
                <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-2xl shadow-soft">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">¡Mensaje enviado exitosamente!</p>
                      <p className="text-green-700 text-sm">Te contactaremos pronto para agendar tu consulta gratuita.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-800 rounded-2xl shadow-soft">
                  <div className="flex items-center">
                    <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
                    <p className="font-semibold">{error}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  <div className="animate-fade-in-up" style={{animationDelay: '200ms'}}>
                    <label htmlFor="name" className="block text-sm lg:text-base font-semibold text-neutral-700 mb-3">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 border border-neutral-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 text-lg"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  
                  <div className="animate-fade-in-up" style={{animationDelay: '300ms'}}>
                    <label htmlFor="email" className="block text-sm lg:text-base font-semibold text-neutral-700 mb-3">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 border border-neutral-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 text-lg"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  <div className="animate-fade-in-up" style={{animationDelay: '400ms'}}>
                    <label htmlFor="phone" className="block text-sm lg:text-base font-semibold text-neutral-700 mb-3">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border border-neutral-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 text-lg"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div className="animate-fade-in-up" style={{animationDelay: '500ms'}}>
                    <label htmlFor="consultation_type" className="block text-sm lg:text-base font-semibold text-neutral-700 mb-3">
                      Tipo de Consulta
                    </label>
                    <select
                      id="consultation_type"
                      name="consultation_type"
                      value={formData.consultation_type}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border border-neutral-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 text-lg appearance-none cursor-pointer"
                    >
                      {consultationTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="animate-fade-in-up" style={{animationDelay: '600ms'}}>
                  <label htmlFor="subject" className="block text-sm lg:text-base font-semibold text-neutral-700 mb-3">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border border-neutral-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 text-lg"
                    placeholder="Breve descripción del asunto"
                  />
                </div>
                
                <div className="animate-fade-in-up" style={{animationDelay: '700ms'}}>
                  <label htmlFor="message" className="block text-sm lg:text-base font-semibold text-neutral-700 mb-3">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-6 py-4 border border-neutral-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/80 text-lg resize-vertical"
                    placeholder="Describe tu situación legal con el mayor detalle posible..."
                  />
                </div>
                
                <div className="animate-fade-in-up" style={{animationDelay: '800ms'}}>
                  <label className="block text-sm lg:text-base font-semibold text-neutral-700 mb-4">
                    Método de Contacto Preferido
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <label className="group flex items-center p-4 lg:p-5 border border-neutral-300 rounded-2xl cursor-pointer hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 bg-white/50 backdrop-blur-sm">
                      <input
                        type="radio"
                        name="preferred_contact"
                        value="email"
                        checked={formData.preferred_contact === 'email'}
                        onChange={handleInputChange}
                        className="mr-4 text-primary-600 focus:ring-primary-500 w-5 h-5"
                      />
                      <div className="flex items-center">
                        <Mail className="h-6 w-6 text-neutral-600 group-hover:text-primary-600 mr-3 transition-colors duration-300" />
                        <span className="text-sm lg:text-base font-semibold text-neutral-900 group-hover:text-primary-900 transition-colors duration-300">Email</span>
                      </div>
                    </label>
                    <label className="group flex items-center p-4 lg:p-5 border border-neutral-300 rounded-2xl cursor-pointer hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 bg-white/50 backdrop-blur-sm">
                      <input
                        type="radio"
                        name="preferred_contact"
                        value="phone"
                        checked={formData.preferred_contact === 'phone'}
                        onChange={handleInputChange}
                        className="mr-4 text-primary-600 focus:ring-primary-500 w-5 h-5"
                      />
                      <div className="flex items-center">
                        <Phone className="h-6 w-6 text-neutral-600 group-hover:text-primary-600 mr-3 transition-colors duration-300" />
                        <span className="text-sm lg:text-base font-semibold text-neutral-900 group-hover:text-primary-900 transition-colors duration-300">Teléfono</span>
                      </div>
                    </label>
                    <label className="group flex items-center p-4 lg:p-5 border border-neutral-300 rounded-2xl cursor-pointer hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 bg-white/50 backdrop-blur-sm">
                      <input
                        type="radio"
                        name="preferred_contact"
                        value="whatsapp"
                        checked={formData.preferred_contact === 'whatsapp'}
                        onChange={handleInputChange}
                        className="mr-4 text-primary-600 focus:ring-primary-500 w-5 h-5"
                      />
                      <div className="flex items-center">
                        <MessageSquare className="h-6 w-6 text-neutral-600 group-hover:text-primary-600 mr-3 transition-colors duration-300" />
                        <span className="text-sm lg:text-base font-semibold text-neutral-900 group-hover:text-primary-900 transition-colors duration-300">WhatsApp</span>
                      </div>
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-5 lg:py-6 px-8 rounded-2xl font-bold text-lg lg:text-xl hover:from-primary-700 hover:to-accent-700 focus:ring-4 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-glow hover:shadow-xl transform hover:scale-[1.02] animate-fade-in-up" style={{animationDelay: '900ms'}}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-6 w-6 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Consulta Inicial Gratuita:</strong> La primera consulta es completamente gratuita 
                  y sin compromiso. Te contactaremos dentro de 24 horas.
                </p>
              </div>
            </div>
            
            {/* Office Information */}
            <div className="space-y-8">
              {/* Office Location */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-glow border border-neutral-200/50 p-8 lg:p-12 animate-fade-in-up" style={{animationDelay: '300ms'}}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-8 flex items-center">
                  <div className="bg-gradient-to-br from-primary-100 to-accent-100 w-14 h-14 rounded-2xl flex items-center justify-center mr-6">
                    <MapPin className="h-7 w-7 text-primary-600" />
                  </div>
                  Nuestra Oficina
                </h3>
                
                <div className="space-y-6 mb-8">
                  <div className="group">
                    <h4 className="font-display font-bold text-neutral-900 mb-3 text-lg">Dirección:</h4>
                    <p className="text-neutral-600 leading-relaxed">
                      Av. Reforma 123, Piso 15<br />
                      Col. Centro, Ciudad de México<br />
                      C.P. 06000, México
                    </p>
                  </div>
                  
                  <div className="group">
                    <h4 className="font-display font-bold text-neutral-900 mb-3 text-lg">Referencias:</h4>
                    <p className="text-neutral-600 leading-relaxed">
                      Entre Av. Juárez y Calle Madero<br />
                      Frente al Palacio de Bellas Artes<br />
                      Edificio Torre Reforma, Piso 15
                    </p>
                  </div>
                </div>
                
                {/* Map placeholder */}
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">Mapa de ubicación</p>
                    <p className="text-xs">Av. Reforma 123, Centro, CDMX</p>
                  </div>
                </div>
              </div>
              
              {/* Office Hours */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-glow border border-neutral-200/50 p-8 lg:p-12 animate-fade-in-up" style={{animationDelay: '400ms'}}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-8 flex items-center">
                  <div className="bg-gradient-to-br from-primary-100 to-accent-100 w-14 h-14 rounded-2xl flex items-center justify-center mr-6">
                    <Clock className="h-7 w-7 text-primary-600" />
                  </div>
                  Horarios de Atención
                </h3>
                
                <div className="space-y-4">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-neutral-50 to-primary-50/30 rounded-2xl border border-neutral-200/50 hover:shadow-soft transition-all duration-300">
                      <span className="font-display font-bold text-neutral-900 text-lg">{schedule.day}</span>
                      <span className="text-neutral-700 font-semibold">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-2xl">
                  <p className="text-primary-800 font-semibold flex items-center">
                    <AlertCircle className="h-5 w-5 mr-3" />
                    <strong>Citas de Emergencia:</strong> Disponibles fuera del horario regular 
                    para casos urgentes. Contacta por WhatsApp.
                  </p>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-glow border border-neutral-200/50 p-8 lg:p-12 animate-fade-in-up" style={{animationDelay: '500ms'}}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-8 flex items-center">
                  <div className="bg-gradient-to-br from-primary-100 to-accent-100 w-14 h-14 rounded-2xl flex items-center justify-center mr-6">
                    <Calendar className="h-7 w-7 text-primary-600" />
                  </div>
                  Acciones Rápidas
                </h3>
                
                <div className="space-y-4">
                  <a
                    href="tel:+15551234567"
                    className="group w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center shadow-glow hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    <Phone className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Llamar Ahora
                  </a>
                  
                  <a
                    href="https://wa.me/15551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center shadow-glow hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    <MessageSquare className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    WhatsApp
                  </a>
                  
                  <a
                    href="mailto:contacto@dramariaabogada.com"
                    className="group w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:from-primary-700 hover:to-accent-700 transition-all duration-300 flex items-center justify-center shadow-glow hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    <Mail className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Enviar Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl lg:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Respuestas a las dudas más comunes sobre nuestros servicios.
            </p>
          </div>
          
          <div className="space-y-6 lg:space-y-8">
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-soft hover:shadow-glow border border-neutral-200/50 hover:border-primary-300/50 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0ms'}}>
              <h3 className="text-xl lg:text-2xl font-display font-bold text-neutral-900 mb-4 group-hover:text-primary-800 transition-colors duration-300">
                ¿La primera consulta es realmente gratuita?
              </h3>
              <p className="text-neutral-700 leading-relaxed text-base lg:text-lg">
                Sí, ofrecemos una consulta inicial completamente gratuita de hasta 30 minutos 
                para evaluar tu caso y explicarte tus opciones legales.
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-soft hover:shadow-glow border border-neutral-200/50 hover:border-primary-300/50 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '100ms'}}>
              <h3 className="text-xl lg:text-2xl font-display font-bold text-neutral-900 mb-4 group-hover:text-primary-800 transition-colors duration-300">
                ¿Cuánto tiempo toma obtener una respuesta?
              </h3>
              <p className="text-neutral-700 leading-relaxed text-base lg:text-lg">
                Nos comprometemos a responder todas las consultas dentro de 24 horas. 
                Para casos urgentes, contáctanos por WhatsApp para una respuesta más rápida.
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-soft hover:shadow-glow border border-neutral-200/50 hover:border-primary-300/50 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '200ms'}}>
              <h3 className="text-xl lg:text-2xl font-display font-bold text-neutral-900 mb-4 group-hover:text-primary-800 transition-colors duration-300">
                ¿Manejan casos en otras ciudades?
              </h3>
              <p className="text-neutral-700 leading-relaxed text-base lg:text-lg">
                Sí, podemos manejar casos en todo el territorio nacional. Para casos fuera 
                de la Ciudad de México, ofrecemos consultas virtuales y coordinamos con 
                corresponsales locales cuando es necesario.
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-soft hover:shadow-glow border border-neutral-200/50 hover:border-primary-300/50 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '300ms'}}>
              <h3 className="text-xl lg:text-2xl font-display font-bold text-neutral-900 mb-4 group-hover:text-primary-800 transition-colors duration-300">
                ¿Qué documentos debo traer a la consulta?
              </h3>
              <p className="text-neutral-700 leading-relaxed text-base lg:text-lg">
                Trae todos los documentos relacionados con tu caso: contratos, 
                correspondencia, identificaciones, y cualquier evidencia relevante. 
                Te proporcionaremos una lista específica al agendar tu cita.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}