'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'  
import {
  LayoutDashboard,
  Image as ImageIcon,
  FolderKanban,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Upload,
  ExternalLink,
  Menu,
  ChevronLeft,
} from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  description: { es: string; en: string; pt: string }
  url: string
  github?: string
  tags: string[]
  image: string
}

interface GalleryImage {
  id: number
  src: string
  alt: string
}

type TabType = 'dashboard' | 'projects' | 'gallery'

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  // Projects state
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: {
        es: 'Plataforma de comercio electrónico con IA',
        en: 'E-commerce platform with AI',
        pt: 'Plataforma de e-commerce com IA',
      },
      url: 'https://example.com',
      github: 'https://github.com',
      tags: ['Next.js', 'TypeScript', 'AI'],
      image: '/projects/project-1.jpg',
    },
  ])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showProjectForm, setShowProjectForm] = useState(false)

  // Gallery state
  const [gallery, setGallery] = useState<GalleryImage[]>([
    { id: 1, src: '/gallery/photo-1.jpg', alt: 'Photo 1' },
    { id: 2, src: '/gallery/photo-2.jpg', alt: 'Photo 2' },
  ])
  const [showGalleryForm, setShowGalleryForm] = useState(false)

const checkAuth = useCallback(() => {
  try {
    const isLoggedIn = typeof window !== 'undefined' 
      ? localStorage.getItem('admin_auth') === 'true'
      : false

    if (!isLoggedIn) {
      router.push('/admin/login')
      return
    }

    setIsLoading(false)
  } catch {
    router.push('/admin/login')
  }
}, [router])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  // Project CRUD
  const handleSaveProject = (project: Project) => {
    if (editingProject) {
      setProjects(projects.map((p) => (p.id === project.id ? project : p)))
    } else {
      setProjects([...projects, { ...project, id: Date.now() }])
    }
    setShowProjectForm(false)
    setEditingProject(null)
  }

  const handleDeleteProject = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      setProjects(projects.filter((p) => p.id !== id))
    }
  }

  // Gallery CRUD
  const handleAddGalleryImage = (src: string, alt: string) => {
    setGallery([...gallery, { id: Date.now(), src, alt }])
    setShowGalleryForm(false)
  }

  const handleDeleteGalleryImage = (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta imagen?')) {
      setGallery(gallery.filter((img) => img.id !== id))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="fixed lg:relative z-40 w-64 h-screen glass border-r border-border flex flex-col"
          >
            {/* Logo */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-bold text-foreground">Admin Panel</h1>
                  <p className="text-xs text-muted-foreground">Lic. Pedro R.</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'projects', label: 'Proyectos', icon: FolderKanban },
                { id: 'gallery', label: 'Galería', icon: ImageIcon },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground glow-cyan-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border space-y-2">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Ver sitio</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 glass border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-lg font-semibold text-foreground capitalize">{activeTab}</h2>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <StatCard
                    title="Proyectos"
                    value={projects.length}
                    icon={FolderKanban}
                    color="primary"
                  />
                  <StatCard
                    title="Imágenes"
                    value={gallery.length}
                    icon={ImageIcon}
                    color="accent"
                  />
                  <StatCard
                    title="Estado"
                    value="Activo"
                    icon={LayoutDashboard}
                    color="primary"
                  />
                </div>

                <div className="glass border-glow rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Bienvenido al Panel de Administración</h3>
                  <p className="text-muted-foreground">
                    Desde aquí puedes gestionar tu portafolio, agregar nuevos proyectos,
                    administrar tu galería de fotos y más.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Gestionar Proyectos</h3>
                  <button
                    onClick={() => {
                      setEditingProject(null)
                      setShowProjectForm(true)
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Proyecto</span>
                  </button>
                </div>

                <div className="grid gap-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="glass border-glow rounded-xl p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                          <FolderKanban className="w-8 h-8 text-primary/50" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{project.title}</h4>
                          <p className="text-sm text-muted-foreground">{project.description.es}</p>
                          <div className="flex gap-2 mt-2">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProject(project)
                            setShowProjectForm(true)
                          }}
                          className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'gallery' && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Gestionar Galería</h3>
                  <button
                    onClick={() => setShowGalleryForm(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Subir Imagen</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.map((image) => (
                    <div
                      key={image.id}
                      className="relative aspect-square rounded-xl overflow-hidden glass border-glow group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary/30">{image.id}</span>
                      </div>
                      <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => handleDeleteGalleryImage(image.id)}
                          className="p-3 rounded-full bg-destructive text-white hover:bg-destructive/90 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Project Form Modal */}
      <AnimatePresence>
        {showProjectForm && (
          <ProjectFormModal
            project={editingProject}
            onSave={handleSaveProject}
            onClose={() => {
              setShowProjectForm(false)
              setEditingProject(null)
            }}
          />
        )}
      </AnimatePresence>

      {/* Gallery Form Modal */}
      <AnimatePresence>
        {showGalleryForm && (
          <GalleryFormModal
            onSave={handleAddGalleryImage}
            onClose={() => setShowGalleryForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string
  value: string | number
  icon: React.ElementType
  color: 'primary' | 'accent'
}) {
  return (
    <div className="glass border-glow rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-${color}/20 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}`} />
        </div>
      </div>
      <div className="text-3xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
    </div>
  )
}

function ProjectFormModal({
  project,
  onSave,
  onClose,
}: {
  project: Project | null
  onSave: (project: Project) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState<Project>(
    project || {
      id: 0,
      title: '',
      description: { es: '', en: '', pt: '' },
      url: '',
      github: '',
      tags: [],
      image: '',
    }
  )
  const [tagInput, setTagInput] = useState('')

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-auto glass border-glow rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">
            {project ? 'Editar Proyecto' : 'Nuevo Proyecto'}
          </h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSave(formData)
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass border border-border focus:border-primary outline-none"
              required
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Descripción (ES)</label>
              <textarea
                value={formData.description.es}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: { ...formData.description, es: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl glass border border-border focus:border-primary outline-none resize-none h-24"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Descripción (EN)</label>
              <textarea
                value={formData.description.en}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: { ...formData.description, en: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl glass border border-border focus:border-primary outline-none resize-none h-24"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Descripción (PT)</label>
              <textarea
                value={formData.description.pt}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: { ...formData.description, pt: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl glass border border-border focus:border-primary outline-none resize-none h-24"
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">URL del Proyecto</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass border border-border focus:border-primary outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">GitHub (opcional)</label>
              <input
                type="url"
                value={formData.github || ''}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass border border-border focus:border-primary outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="flex-1 px-4 py-2 rounded-xl glass border border-border focus:border-primary outline-none"
                placeholder="Agregar tag..."
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm"
                >
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl border border-border hover:bg-muted/50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              <Save className="w-4 h-4" />
              Guardar
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

function GalleryFormModal({
  onSave,
  onClose,
}: {
  onSave: (src: string, alt: string) => void
  onClose: () => void
}) {
  const [src, setSrc] = useState('')
  const [alt, setAlt] = useState('')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md glass border-glow rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Nueva Imagen</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSave(src, alt)
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Ruta de la imagen</label>
            <input
              type="text"
              value={src}
              onChange={(e) => setSrc(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass border border-border focus:border-primary outline-none"
              placeholder="/gallery/mi-foto.jpg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Texto alternativo</label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass border border-border focus:border-primary outline-none"
              placeholder="Descripción de la imagen"
              required
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl border border-border hover:bg-muted/50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              <Upload className="w-4 h-4" />
              Subir
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
