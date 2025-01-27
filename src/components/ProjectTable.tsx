import { useState } from 'react'
import { MoreHorizontal, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react'
import { Project } from '../types'

interface ProjectTableProps {
  projects: Project[]
}

const ProjectTable = ({ projects }: ProjectTableProps) => {
  const [sortField, setSortField] = useState<keyof Project | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filters, setFilters] = useState({
    project: '',
    subProject: '',
    status: '',
    version: ''
  })

  const handleSort = (field: keyof Project) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200'
      case 'awaiting approval':
        return 'bg-purple-50 text-purple-700 border border-purple-200'
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200'
    }
  }

  const SortIcon = ({ field }: { field: keyof Project }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
  }

  const filteredProjects = projects.filter(project => {
    return (
      project.project.toLowerCase().includes(filters.project.toLowerCase()) &&
      project.subProject.toLowerCase().includes(filters.subProject.toLowerCase()) &&
      project.status.toLowerCase().includes(filters.status.toLowerCase()) &&
      project.version.toLowerCase().includes(filters.version.toLowerCase())
    )
  })

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <button className="flex items-center gap-2 text-blue-600 font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
          <span className="text-xl">+</span> Add New
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-100">
        <thead>
          <tr className="bg-gray-50/50">
            {['Project', 'Sub-Project', 'Status', 'Version'].map((header, index) => (
              <th key={header} scope="col" className="px-6 py-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                       onClick={() => handleSort(header.toLowerCase().replace('-', '') as keyof Project)}>
                    <span>{header}</span>
                    <SortIcon field={header.toLowerCase().replace('-', '') as keyof Project} />
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-2 py-1">
                    <Search size={14} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder={`Filter ${header}`}
                      className="w-full text-sm border-none focus:ring-0 p-0 placeholder-gray-400"
                      value={filters[header.toLowerCase().replace('-', '') as keyof typeof filters]}
                      onChange={(e) => handleFilterChange(header.toLowerCase().replace('-', ''), e.target.value)}
                    />
                    <Filter size={14} className="text-gray-400" />
                  </div>
                </div>
              </th>
            ))}
            <th scope="col" className="relative px-6 py-4">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {filteredProjects.map((project, index) => (
            <tr key={index} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{project.project}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{project.subProject}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 text-sm rounded-full inline-flex items-center ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {project.version}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProjectTable
