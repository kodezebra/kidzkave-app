import { useState, useMemo } from 'react'
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
  DialogDescription 
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SOCIAL_ICONS, UI_ICONS, BADGE_ICONS, getPhosphorIconComponent, type PhosphorIconEntry } from './phosphor-icons'

type IconCollection = 'social' | 'ui' | 'badge'

export function IconPicker({ 
  value, 
  onSelect,
  trigger,
  defaultTab = 'social'
}: { 
  value?: string,
  onSelect: (iconName: string) => void,
  trigger?: React.ReactNode,
  defaultTab?: IconCollection
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<IconCollection>(defaultTab)

  const icons = useMemo(() => {
    switch (activeTab) {
      case 'social': return SOCIAL_ICONS
      case 'badge': return BADGE_ICONS
      default: return UI_ICONS
    }
  }, [activeTab])

  const filteredIcons = useMemo(() => {
    if (!searchTerm.trim()) return icons
    const term = searchTerm.toLowerCase()
    return icons.filter(icon => 
      icon.name.toLowerCase().includes(term) ||
      icon.label.toLowerCase().includes(term)
    )
  }, [icons, searchTerm])

  const handleSelect = (icon: PhosphorIconEntry) => {
    onSelect(icon.name)
    setIsOpen(false)
    setSearchTerm('')
  }

  const CurrentIcon = value ? getPhosphorIconComponent(value) : null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            {CurrentIcon ? (
              <CurrentIcon className="h-4 w-4" />
            ) : (
              <MagnifyingGlassIcon className="h-4 w-4" />
            )}
            <span className="capitalize">{value || 'Select Icon'}</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px] h-[480px] flex flex-col p-0 overflow-hidden">
        <div className="p-6 border-b space-y-4">
          <DialogHeader>
            <DialogTitle>Select an Icon</DialogTitle>
            <DialogDescription>
              Choose from social brands or UI icons.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as IconCollection)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="badge">Badges</TabsTrigger>
              <TabsTrigger value="ui">UI</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search icons..." 
              className="pl-9 pr-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchTerm('')}
              >
                <XIcon className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-muted/10">
          {filteredIcons.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground italic text-sm">
              <p>No icons found matching "{searchTerm}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-2">
              {filteredIcons.map((icon) => {
                const IconComponent = icon.Component
                return (
                  <button
                    key={icon.name}
                    className={`
                      flex flex-col items-center justify-center p-3 rounded-lg border bg-card hover:border-primary hover:bg-primary/5 transition-all group
                      ${value === icon.name ? 'border-primary bg-primary/10 ring-1 ring-primary' : ''}
                    `}
                    onClick={() => handleSelect(icon)}
                    title={icon.label}
                  >
                    <div className={`mb-1.5 group-hover:scale-110 transition-transform ${value === icon.name ? 'text-primary' : 'text-foreground'}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] truncate w-full text-center text-muted-foreground">
                      {icon.label}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-card flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
