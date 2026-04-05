import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { getAllBlocks } from './blockRegistry'

interface BlockPickerProps {
  onAddBlock: (type: string) => void
  trigger?: React.ReactNode
}

export function BlockPicker({ onAddBlock, trigger }: BlockPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const availableBlocks = getAllBlocks()

  const handleSelect = (type: string) => {
    onAddBlock(type)
    setIsOpen(false)
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
      <DialogContent className="sm:max-w-[650px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-bold">Add Block</DialogTitle>
          <DialogDescription>
            Click a block to add it to your page.
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 max-h-[400px] overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {availableBlocks.map((block) => {
              const Icon = block.icon
              
              return (
                <button
                  key={block.type}
                  onClick={() => handleSelect(block.type)}
                  className="group flex flex-col rounded-lg border overflow-hidden text-left transition-all hover:border-primary hover:shadow-md"
                >
                  <div className={cn(
                    "h-24 flex items-center justify-center bg-gradient-to-br",
                    block.color
                  )}>
                    {block.preview === 'placeholder' ? (
                      <Icon className="h-8 w-8 text-white/80" />
                    ) : (
                      <img src={block.preview} alt={block.label} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-3 bg-background">
                    <span className="text-sm font-medium">{block.label}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="px-6 py-3 border-t bg-muted/30 text-[10px] text-muted-foreground">
          {availableBlocks.length} blocks available
        </div>
      </DialogContent>
    </Dialog>
  )
}
