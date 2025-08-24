import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Page } from '../components/layout/Layout'
import { supabase } from '../lib/supabase'
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Mail, ChevronRight } from 'lucide-react'
import type { BlogPost } from '../lib/supabase'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug])

  const fetchPost = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch the main post
      const { data: postData, error: postError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (postError) {
        if (postError.code === 'PGRST116') {
          setError('Artículo no encontrado')
        } else {
          throw postError
        }
        return
      }

      setPost(postData)

      // Fetch related posts
      const { data: relatedData, error: relatedError } = await supabase
        .from('blog_posts')
        .select('id, title, slug, content, excerpt, featured_image, category, tags, published, published_at, created_at, updated_at')
        .eq('category', postData.category)
        .eq('published', true)
        .neq('id', postData.id)
        .order('created_at', { ascending: false })
        .limit(3)

      if (relatedError) throw relatedError
      setRelatedPosts(relatedData || [])

    } catch (error) {
      console.error('Error fetching post:', error)
      setError('Error al cargar el artículo')
    } finally {
      setLoading(false)
    }
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
    const categories: { [key: string]: string } = {
      'derecho-civil': 'Derecho Civil',
      'derecho-penal': 'Derecho Penal',
      'derecho-familiar': 'Derecho Familiar',
      'derecho-laboral': 'Derecho Laboral',
      'noticias-legales': 'Noticias Legales',
      'consejos-legales': 'Consejos Legales'
    }
    return categories[category] || category
  }

  const sharePost = (platform: string) => {
    const url = window.location.href
    const title = post?.title || ''
    const text = post?.excerpt || ''

    let shareUrl = ''
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      // You could add a toast notification here
      alert('Enlace copiado al portapapeles')
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  if (loading) {
    return (
      <Page title="Cargando artículo..." description="Cargando contenido del blog">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900"></div>
        </div>
      </Page>
    )
  }

  if (error || !post) {
    return (
      <Page title="Artículo no encontrado" description="El artículo solicitado no existe">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
            <p className="text-xl text-gray-600 mb-8">{error}</p>
            <div className="space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Volver
              </button>
              <Link
                to="/blog"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Ver Blog
              </Link>
            </div>
          </div>
        </div>
      </Page>
    )
  }

  return (
    <Page 
      title={post.title}
      description={post.excerpt}
      keywords={post.tags.join(', ')}
    >
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-900">Inicio</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/blog" className="hover:text-blue-900">Blog</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{post.title}</span>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="bg-white py-4 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-blue-900 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </button>
        </div>
      </div>

      {/* Article Header */}
      <header className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {getCategoryLabel(post.category)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-gray-200">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Dra. María González</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{getReadingTime(post.content)} min de lectura</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 mr-2">Compartir:</span>
              <button
                onClick={() => sharePost('facebook')}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Compartir en Facebook"
              >
                <Facebook className="h-4 w-4" />
              </button>
              <button
                onClick={() => sharePost('twitter')}
                className="p-2 text-gray-600 hover:text-blue-400 transition-colors"
                title="Compartir en Twitter"
              >
                <Twitter className="h-4 w-4" />
              </button>
              <button
                onClick={() => sharePost('linkedin')}
                className="p-2 text-gray-600 hover:text-blue-700 transition-colors"
                title="Compartir en LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </button>
              <button
                onClick={() => sharePost('email')}
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                title="Compartir por email"
              >
                <Mail className="h-4 w-4" />
              </button>
              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                title="Copiar enlace"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="prose prose-lg max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-blue-900 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:my-4 prose-ol:my-4
              prose-li:text-gray-700 prose-li:mb-1
              prose-blockquote:border-l-4 prose-blockquote:border-blue-900 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
              prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Tags */}
      {post.tags.length > 0 && (
        <section className="bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiquetas:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center bg-white text-gray-700 px-3 py-1 rounded-full text-sm border">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Artículos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {relatedPost.featured_image && (
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={relatedPost.featured_image}
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {getCategoryLabel(relatedPost.category)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      <Link 
                        to={`/blog/${relatedPost.slug}`}
                        className="hover:text-blue-900 transition-colors"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(relatedPost.created_at)}
                      </div>
                      <Link
                        to={`/blog/${relatedPost.slug}`}
                        className="text-blue-900 font-semibold hover:text-blue-700 transition-colors"
                      >
                        Leer más →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas Asesoría Legal?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Si tienes dudas sobre este tema o necesitas asesoría legal personalizada, 
            no dudes en contactarnos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors"
            >
              Consulta Gratuita
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>
    </Page>
  )
}