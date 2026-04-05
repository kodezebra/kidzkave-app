import { Button } from "@/components/ui/button"
import { Plus, Search, Layout, Type, MousePointer2, Image as ImageIcon } from 'lucide-react'
import { useState, useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { getAllBlocks } from './blockRegistry'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BlockPickerProps {
  onAddBlock: (type: string) => void
  trigger?: React.ReactNode
}

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Plus },
  { id: 'layout', label: 'Layout', icon: Layout },
  { id: 'content', label: 'Content', icon: Type },
  { id: 'media', label: 'Media', icon: ImageIcon },
  { id: 'interactive', label: 'Interactive', icon: MousePointer2 },
]

export function BlockPicker({ onAddBlock, trigger }: BlockPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  
  const availableBlocks = getAllBlocks()

  const filteredBlocks = useMemo(() => {
    return availableBlocks.filter(block => {
      const matchesSearch = block.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           block.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTab = activeTab === 'all' || block.category === activeTab
      return matchesSearch && matchesTab
    })
  }, [availableBlocks, searchQuery, activeTab])

  const handleSelect = (type: string) => {
    onAddBlock(type)
    setIsOpen(false)
    setSearchQuery('')
    setActiveTab('all')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-4 pb-2 bg-muted/20">
          <DialogTitle className="text-lg font-bold tracking-tight">Add a Block</DialogTitle>
          
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
            <Input 
              placeholder="Search components..." 
              className="pl-9 h-9 bg-background/50 border-muted-foreground/10 focus-visible:ring-primary/50 text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 border-b bg-muted/5 flex items-center justify-between">
            <TabsList className="h-10 w-full justify-start bg-transparent p-0 gap-4">
              {CATEGORIES.map(cat => (
                <TabsTrigger 
                  key={cat.id} 
                  value={cat.id}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 pb-3 pt-3 text-[10px] font-bold uppercase tracking-wider transition-all"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="p-4 max-h-[380px] overflow-y-auto bg-background/50 scrollbar-thin">
            {filteredBlocks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {filteredBlocks.map((block) => {
                  const Icon = block.icon
                  
                  return (
                    <button
                      key={block.type}
                      onClick={() => handleSelect(block.type)}
                      className="group flex flex-col rounded-lg border border-muted-foreground/10 bg-card overflow-hidden text-left transition-all hover:border-primary hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                    >
                      {/* Preview Area - Even more compact */}
                      <div className={cn(
                        "h-14 flex items-center justify-center bg-gradient-to-br transition-all group-hover:opacity-90",
                        block.color
                      )}>
                        {block.preview === 'placeholder' ? (
                          <Icon className="h-5 w-5 text-white/90 drop-shadow-sm" />
                        ) : (
                          <img src={block.preview} alt={block.label} className="w-full h-full object-cover" />
                        )}
                      </div>
                      {/* Label - Compact */}
                      <div className="p-2 border-t border-muted-foreground/5">
                        <div className="text-[9px] font-bold uppercase tracking-tight truncate leading-tight group-hover:text-primary transition-colors">{block.label}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-14 w-14 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-muted-foreground/30" />
                </div>
                <p className="text-sm font-semibold text-muted-foreground">No matches for your search</p>
                <p className="text-xs text-muted-foreground/60 mt-1 max-w-[200px]">Try using different keywords or checking another category.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-6 text-[10px] font-bold uppercase tracking-widest h-8"
                  onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                >
                  Reset filters
                </Button>
              </div>
            )}
          </div>
        </Tabs>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-muted/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="h-1.5 w-1.5 rounded-full bg-primary" />
             <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
               {filteredBlocks.length} Available
             </span>
          </div>
          <span className="text-[9px] font-medium text-muted-foreground/40 italic">
            v1.0 Block Library
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
