import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute, UnauthorizedPage } from "./components/ProtectedRoute";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import AdminLayout from "@/components/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import BlogManagement from "@/pages/admin/BlogManagement";
import BlogEditor from "@/pages/admin/BlogEditor";
import ClientManagement from "@/pages/admin/ClientManagement";
import ClientEditor from "@/pages/admin/ClientEditor";
import ClientDetail from "@/pages/admin/ClientDetail";
import CaseManagement from "@/pages/admin/CaseManagement";
import CaseEditor from "@/pages/admin/CaseEditor";
import CaseDetail from "@/pages/admin/CaseDetail";
import DocumentManagement from "@/pages/admin/DocumentManagement";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute requireAdmin>
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/blog" element={<BlogManagement />} />
                  <Route path="/blog/new" element={<BlogEditor />} />
                  <Route path="/blog/edit/:id" element={<BlogEditor />} />
                  <Route path="/clients" element={<ClientManagement />} />
                  <Route path="/clients/new" element={<ClientEditor />} />
                  <Route path="/clients/edit/:id" element={<ClientEditor />} />
                  <Route path="/clients/:id" element={<ClientDetail />} />
                  <Route path="/cases" element={<CaseManagement />} />
                  <Route path="/cases/new" element={<CaseEditor />} />
                  <Route path="/cases/edit/:id" element={<CaseEditor />} />
                  <Route path="/cases/:id" element={<CaseDetail />} />
                  <Route path="/documents" element={<DocumentManagement />} />
                  <Route path="*" element={<div className="text-center text-xl">Admin Page - Coming Soon</div>} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          {/* Client Routes */}
          <Route path="/client/*" element={
            <ProtectedRoute requireClient>
              <div className="text-center text-xl">Client Portal - Coming Soon</div>
            </ProtectedRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600">Página no encontrada</p>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
