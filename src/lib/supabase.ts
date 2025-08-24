import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type exports for easier importing
export type Client = Database['public']['Tables']['clients']['Row']
export type Case = Database['public']['Tables']['cases']['Row']
export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type Document = Database['public']['Tables']['documents']['Row']
export type Appointment = Database['public']['Tables']['appointments']['Row']
export type ContactInquiry = Database['public']['Tables']['contact_inquiries']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']

// Database types based on our schema
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'admin' | 'client'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'admin' | 'client'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'admin' | 'client'
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          user_id: string | null
          first_name: string
          last_name: string
          email: string
          phone: string | null
          client_type: 'individual' | 'business'
          company_name: string | null
          position: string | null
          identification_type: string | null
          identification_number: string | null
          date_of_birth: string | null
          address: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          country: string | null
          active: boolean
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          client_type?: 'individual' | 'business'
          company_name?: string | null
          position?: string | null
          identification_type?: string | null
          identification_number?: string | null
          date_of_birth?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          active?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          client_type?: 'individual' | 'business'
          company_name?: string | null
          position?: string | null
          identification_type?: string | null
          identification_number?: string | null
          date_of_birth?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          active?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cases: {
        Row: {
          id: string
          client_id: string
          title: string
          description: string | null
          case_type: string | null
          status: 'active' | 'closed' | 'pending'
          start_date: string
          end_date: string | null
          billing_rate: number | null
          total_hours: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          title: string
          description?: string | null
          case_type?: string | null
          status?: 'active' | 'closed' | 'pending'
          start_date: string
          end_date?: string | null
          billing_rate?: number | null
          total_hours?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          title?: string
          description?: string | null
          case_type?: string | null
          status?: 'active' | 'closed' | 'pending'
          start_date?: string
          end_date?: string | null
          billing_rate?: number | null
          total_hours?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          client_id: string | null
          case_id: string | null
          title: string
          description: string | null
          start_time: string
          end_time: string
          type: 'consultation' | 'court' | 'meeting' | 'deadline'
          location: string | null
          reminder_sent: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id?: string | null
          case_id?: string | null
          title: string
          description?: string | null
          start_time: string
          end_time: string
          type?: 'consultation' | 'court' | 'meeting' | 'deadline'
          location?: string | null
          reminder_sent?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string | null
          case_id?: string | null
          title?: string
          description?: string | null
          start_time?: string
          end_time?: string
          type?: 'consultation' | 'court' | 'meeting' | 'deadline'
          location?: string | null
          reminder_sent?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          case_id: string | null
          client_id: string | null
          filename: string
          file_path: string
          file_size: number
          mime_type: string
          description: string | null
          is_client_accessible: boolean
          uploaded_at: string
        }
        Insert: {
          id?: string
          case_id?: string | null
          client_id?: string | null
          filename: string
          file_path: string
          file_size: number
          mime_type: string
          description?: string | null
          is_client_accessible?: boolean
          uploaded_at?: string
        }
        Update: {
          id?: string
          case_id?: string | null
          client_id?: string | null
          filename?: string
          file_path?: string
          file_size?: number
          mime_type?: string
          description?: string | null
          is_client_accessible?: boolean
          uploaded_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          featured_image: string | null
          category: string | null
          tags: string[]
          published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          featured_image?: string | null
          category?: string | null
          tags?: string[]
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          featured_image?: string | null
          category?: string | null
          tags?: string[]
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contact_inquiries: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          service_type: string | null
          message: string
          status: 'new' | 'contacted' | 'converted' | 'closed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          service_type?: string | null
          message: string
          status?: 'new' | 'contacted' | 'converted' | 'closed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          service_type?: string | null
          message?: string
          status?: 'new' | 'contacted' | 'converted' | 'closed'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}