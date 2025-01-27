import { ChevronRight } from 'lucide-react'
import ProjectTable from './components/ProjectTable'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { projects } from './data/projects'

function App() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />
      <div className="flex pt-12">
        <Sidebar />
        <div className="flex-1 ml-64">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
              <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                <span>Projects</span>
                <ChevronRight size={16} className="text-gray-400" />
                <span>Project Management</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
            </div>

            <ProjectTable projects={projects} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
