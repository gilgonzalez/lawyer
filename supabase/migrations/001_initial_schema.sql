-- Lawyer Web Application Database Schema
-- This migration creates all the necessary tables for the lawyer web application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table to extend Supabase auth.users
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    role VARCHAR(20) DEFAULT 'client' CHECK (role IN ('admin', 'client')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Create clients table
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on clients
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Clients policies
CREATE POLICY "Admins can manage all clients" ON clients FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Clients can view own data" ON clients FOR SELECT USING (auth.uid() = user_id);

-- Clients indexes
CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_clients_email ON clients(email);

-- Create cases table
CREATE TABLE cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    case_type VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'closed', 'pending')),
    start_date DATE NOT NULL,
    end_date DATE,
    billing_rate DECIMAL(10,2),
    total_hours DECIMAL(8,2) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on cases
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- Cases policies
CREATE POLICY "Admins can manage all cases" ON cases FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Clients can view own cases" ON cases FOR SELECT USING (
    client_id IN (SELECT id FROM clients WHERE user_id = auth.uid())
);

-- Cases indexes
CREATE INDEX idx_cases_client_id ON cases(client_id);
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_start_date ON cases(start_date DESC);

-- Create appointments table
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id),
    case_id UUID REFERENCES cases(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    type VARCHAR(50) DEFAULT 'consultation' CHECK (type IN ('consultation', 'court', 'meeting', 'deadline')),
    location VARCHAR(255),
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on appointments
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Appointments policies
CREATE POLICY "Admins can manage all appointments" ON appointments FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Clients can view own appointments" ON appointments FOR SELECT USING (
    client_id IN (SELECT id FROM clients WHERE user_id = auth.uid())
);

-- Appointments indexes
CREATE INDEX idx_appointments_client_id ON appointments(client_id);
CREATE INDEX idx_appointments_case_id ON appointments(case_id);
CREATE INDEX idx_appointments_start_time ON appointments(start_time);

-- Create documents table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id),
    client_id UUID REFERENCES clients(id),
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    description TEXT,
    is_client_accessible BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on documents
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Documents policies
CREATE POLICY "Admins can manage all documents" ON documents FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Clients can view accessible documents" ON documents FOR SELECT USING (
    is_client_accessible = TRUE AND 
    client_id IN (SELECT id FROM clients WHERE user_id = auth.uid())
);

-- Documents indexes
CREATE INDEX idx_documents_case_id ON documents(case_id);
CREATE INDEX idx_documents_client_id ON documents(client_id);
CREATE INDEX idx_documents_uploaded_at ON documents(uploaded_at DESC);

-- Create blog_posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(500),
    category VARCHAR(100),
    tags JSONB DEFAULT '[]',
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog posts policies
CREATE POLICY "Anyone can view published posts" ON blog_posts FOR SELECT USING (published = TRUE);
CREATE POLICY "Admins can manage all posts" ON blog_posts FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Blog posts indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Create contact_inquiries table
CREATE TABLE contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    service_type VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on contact_inquiries
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Contact inquiries policies
CREATE POLICY "Admins can manage all inquiries" ON contact_inquiries FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Anyone can create inquiries" ON contact_inquiries FOR INSERT WITH CHECK (true);

-- Contact inquiries indexes
CREATE INDEX idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON profiles TO anon, authenticated;
GRANT ALL PRIVILEGES ON profiles TO authenticated;

GRANT SELECT ON clients TO anon, authenticated;
GRANT ALL PRIVILEGES ON clients TO authenticated;

GRANT SELECT ON cases TO anon, authenticated;
GRANT ALL PRIVILEGES ON cases TO authenticated;

GRANT SELECT ON appointments TO anon, authenticated;
GRANT ALL PRIVILEGES ON appointments TO authenticated;

GRANT SELECT ON documents TO anon, authenticated;
GRANT ALL PRIVILEGES ON documents TO authenticated;

GRANT SELECT ON blog_posts TO anon, authenticated;
GRANT ALL PRIVILEGES ON blog_posts TO authenticated;

GRANT SELECT ON contact_inquiries TO anon, authenticated;
GRANT ALL PRIVILEGES ON contact_inquiries TO authenticated;

-- Insert initial blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, category, published, published_at) VALUES
('Welcome to Our Legal Practice', 'welcome-to-our-legal-practice', 
 'Welcome to our law firm blog where we share insights on legal matters, recent case studies, and important updates in the legal field. Our experienced team is dedicated to providing you with valuable information to help you understand your rights and navigate complex legal situations.', 
 'An introduction to our legal practice and what we offer to our clients.', 
 'General', TRUE, NOW()),
('Understanding Your Rights in Personal Injury Cases', 'understanding-your-rights-personal-injury', 
 'Personal injury cases can be complex and overwhelming. It is important to understand your rights and the legal process involved. This comprehensive guide will walk you through the key aspects of personal injury law, including what constitutes a valid claim, the statute of limitations, and how to protect your interests throughout the legal process.', 
 'A comprehensive guide to understanding your basic legal rights in personal injury cases.', 
 'Personal Injury', TRUE, NOW()),
('Estate Planning Essentials: Protecting Your Legacy', 'estate-planning-essentials', 
 'Estate planning is crucial for protecting your assets and ensuring your wishes are carried out after your passing. This article covers the essential documents you need, including wills, trusts, and power of attorney designations. We also discuss strategies for minimizing estate taxes and protecting your beneficiaries.', 
 'Essential information about estate planning and protecting your family''s future.', 
 'Estate Planning', TRUE, NOW());