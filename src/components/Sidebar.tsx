import { ChevronDown } from 'lucide-react'

interface MenuItem {
  title: string
  items?: string[]
}

interface SidebarProps {
  lng: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'Project',
    items: ['SIP', 'Tender', 'Contract']
  },
  {
    title: 'Partenaires',
    items: ['Partner', 'Overview']
  },
  {
    title: 'DEV',
    items: ['Prospection']
  },
  {
    title: 'Administration',
    items: ['User management', 'Partner management', 'Project management']
  }
]

const Sidebar = ({ lng }: SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-12">
      <nav className="p-4 space-y-2">
        {menuItems.map((section, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between p-2 bg-[#FFE5CC] rounded-lg text-[#FF6600] font-medium">
              <span>{section.title}</span>
              <ChevronDown size={16} className="text-[#FF6600]" />
            </div>
            {section.items && (
              <div className="ml-2 pl-2 border-l-2 border-gray-100 space-y-1">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
