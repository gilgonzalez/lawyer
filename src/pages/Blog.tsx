import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Page } from '../components/layout/Layout'
import { supabase } from '../lib/supabase'
import { Calendar, Clock, User, Search, Filter, ChevronRight, Tag, Mail } from 'lucide-react'
import type { BlogPost } from '../lib/supabase'

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const categories = [
    { value: 'all', label: 'Todos los Artículos' },
    { value: 'derecho-civil', label: 'Derecho Civil' },
    { value: 'derecho-penal', label: 'Derecho Penal' },
    { value: 'derecho-familiar', label: 'Derecho Familiar' },
    { value: 'derecho-laboral', label: 'Derecho Laboral' },
    { value: 'noticias-legales', label: 'Noticias Legales' },
    { value: 'consejos-legales', label: 'Consejos Legales' }
  ]

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchTerm, selectedCategory])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredPosts(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category)
    return cat ? cat.label : category
  }

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (loading) {
    return (
      <Page title="Blog - Cargando..." description="Cargando artículos del blog">
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-primary-50">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-primary-600 border-t-transparent"></div>
        </div>
      </Page>
    )
  }

  return (
    <Page 
      title="Blog Legal - Artículos y Consejos Jurídicos"
      description="Mantente informado con nuestros artículos sobre derecho civil, penal, familiar y laboral. Consejos legales y análisis de casos actuales."
      keywords="blog legal, artículos jurídicos, consejos legales, derecho civil, derecho penal, noticias legales"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6">
              Blog Legal
            </h1>
            <p className="text-lg lg:text-xl text-primary-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Mantente informado con nuestros artículos especializados, análisis de casos 
              y consejos legales actualizados.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 lg:py-12 bg-gradient-to-b from-white to-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center justify-between animate-fade-in-up">
            {/* Search */}
            <div className="relative flex-1 max-w-md lg:max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-neutral-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white/80 backdrop-blur-sm shadow-soft transition-all duration-300 hover:shadow-glow text-sm lg:text-base"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-neutral-200 shadow-soft">
              <div className="bg-gradient-to-br from-primary-100 to-accent-100 p-2 rounded-xl">
                <Filter className="h-5 w-5 text-primary-600" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border-0 rounded-xl focus:ring-2 focus:ring-primary-500 bg-transparent text-sm lg:text-base font-medium text-neutral-700 cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 text-sm lg:text-base text-neutral-600 animate-fade-in-up animation-delay-200">
            {filteredPosts.length === 0 ? (
              'No se encontraron artículos'
            ) : (
              `Mostrando ${indexOfFirstPost + 1}-${Math.min(indexOfLastPost, filteredPosts.length)} de ${filteredPosts.length} artículos`
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentPosts.length === 0 ? (
            <div className="text-center py-16 lg:py-24 animate-fade-in-up">
              <div className="bg-gradient-to-br from-neutral-100 to-primary-100 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 mb-4">
                No se encontraron artículos
              </h3>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto leading-relaxed">
                Intenta con otros términos de búsqueda o selecciona una categoría diferente.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-300 shadow-glow hover:shadow-xl hover:scale-105"
              >
                Ver Todos los Artículos
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {currentPosts.map((post, index) => (
                  <article key={post.id} className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft overflow-hidden hover:shadow-glow border border-neutral-200/50 hover:border-primary-300/50 transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                    {post.featured_image ? (
                      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-48 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 lg:h-56 bg-gradient-to-br from-primary-100 via-accent-100 to-secondary-100 flex items-center justify-center">
                        <div className="text-primary-400">
                          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6 lg:p-8">
                      {/* Category Badge */}
                      <div className="mb-4">
                        <span className="inline-block bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 text-xs lg:text-sm font-semibold px-3 py-1.5 rounded-full border border-primary-200">
                          {getCategoryLabel(post.category)}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-xl lg:text-2xl font-display font-bold text-neutral-900 mb-4 line-clamp-2 group-hover:text-primary-700 transition-colors">
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="hover:text-primary-700 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      
                      {/* Excerpt */}
                      <p className="text-neutral-600 mb-6 line-clamp-3 leading-relaxed text-sm lg:text-base">
                        {post.excerpt}
                      </p>
                      
                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span key={tagIndex} className="inline-flex items-center text-xs text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full border border-neutral-200">
                                <Tag className="h-3 w-3 mr-1.5" />
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-xs text-neutral-500 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-200">+{post.tags.length - 3} más</span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-neutral-500 mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-primary-500" />
                            {formatDate(post.created_at)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-accent-500" />
                            {getReadingTime(post.content)} min
                          </div>
                        </div>
                      </div>
                      
                      {/* Read More Link */}
                      <Link
                        to={`/blog/${post.slug}`}
                        className="group inline-flex items-center text-primary-700 font-semibold hover:text-primary-800 transition-colors"
                      >
                        Leer más
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-3 mt-16 lg:mt-20">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center px-6 py-3 text-sm font-semibold text-neutral-600 bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl hover:bg-white hover:text-primary-700 hover:border-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-soft hover:shadow-glow"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
                    Anterior
                  </button>
                  
                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-glow'
                            : 'text-neutral-700 bg-white/80 backdrop-blur-sm border border-neutral-200 hover:bg-white hover:text-primary-700 hover:border-primary-300 shadow-soft hover:shadow-glow'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-6 py-3 text-sm font-semibold text-neutral-600 bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl hover:bg-white hover:text-primary-700 hover:border-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-soft hover:shadow-glow"
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-glow p-8 lg:p-12 border border-neutral-200/50 animate-fade-in-up">
            <div className="mb-8">
              <div className="bg-gradient-to-br from-primary-100 to-accent-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                 <Mail className="h-10 w-10 text-primary-600" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Mantente Informado
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed text-lg">
                Suscríbete a nuestro boletín para recibir las últimas actualizaciones legales, 
                consejos prácticos y análisis de casos relevantes directamente en tu correo.
              </p>
            </div>
            
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-6 py-4 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white/80 backdrop-blur-sm transition-all duration-300 text-neutral-900 placeholder-neutral-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-300 whitespace-nowrap shadow-glow hover:shadow-xl hover:scale-105"
                >
                  Suscribirse
                </button>
              </div>
              <p className="text-xs text-neutral-500 mt-4 leading-relaxed">
                Al suscribirte, aceptas recibir correos de nuestra parte. Puedes darte de baja en cualquier momento.
              </p>
            </form>
          </div>
        </div>
      </section>
    </Page>
  )
}