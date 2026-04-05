import { Button } from "@/components/ui/button"
import {
  Plus, Layers, MousePointer2, Box,
  ChevronUp, ChevronDown
} from 'lucide-react'
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { getAllBlocks, getBlockDefinition } from './blockRegistry'

export function EditorSidebar({
  blocks,
  activeBlockId,
  onSelectBlock,
  onAddBlock,
  onMoveBlock,
  onMoveBlockUp,
  onMoveBlockDown
}: {
  blocks: any[],
  activeBlockId: string | null,
  onSelectBlock: (id: string) => void,
  onAddBlock: (type: string) => void,
  onMoveBlock: (fromIndex: number, toIndex: number) => void,
  onMoveBlockUp: (index: number) => void,
  onMoveBlockDown: (index: number) => void
}) {
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const availableBlocks = getAllBlocks()

  const handleAddBlock = (type: string) => {
    onAddBlock(type)
    setIsPickerOpen(false)
  }

  // Keyboard shortcuts for moving layers (Alt+ArrowUp/ArrowDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeBlockId) return

      const currentIndex = blocks.findIndex(b => b.id === activeBlockId)
      if (currentIndex === -1) return

      // Alt + ArrowUp to move up
      if (e.altKey && e.key === 'ArrowUp') {
        e.preventDefault()
        onMoveBlockUp(currentIndex)
      }
      // Alt + ArrowDown to move down
      if (e.altKey && e.key === 'ArrowDown') {
        e.preventDefault()
        onMoveBlockDown(currentIndex)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeBlockId, blocks, onMoveBlockUp, onMoveBlockDown])

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return
    onMoveBlock(draggedIndex, index)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="w-[280px] border-r bg-card flex flex-col h-full shadow-sm">
      <div className="p-4 border-b flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-xs uppercase tracking-widest">Layers</h2>
        </div>

        <Dialog open={isPickerOpen} onOpenChange={setIsPickerOpen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px] p-0 gap-0 overflow-hidden">
            <DialogHeader className="p-6 pb-4 border-b">
              <DialogTitle className="text-xl font-bold">Add Block</DialogTitle>
              <DialogDescription>
                Click a block to add it to your page.
              </DialogDescription>
            </DialogHeader>
            
            {/* Blocks Grid */}
            <div className="p-6 max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {availableBlocks.map((block) => {
                  const Icon = block.icon
                  
                  return (
                    <button
                      key={block.type}
                      onClick={() => handleAddBlock(block.type)}
                      className="group flex flex-col rounded-lg border overflow-hidden text-left transition-all hover:border-primary hover:shadow-md"
                    >
                      {/* Preview Area */}
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
                      {/* Label */}
                      <div className="p-3 bg-background">
                        <span className="text-sm font-medium">{block.label}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t bg-muted/30 text-[10px] text-muted-foreground">
              {availableBlocks.length} blocks available
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {blocks.map((block, index) => {
          const isActive = activeBlockId === block.id
          const blockDef = getBlockDefinition(block.type)
          const Icon = blockDef?.icon || Box
          const isFirst = index === 0
          const isLast = index === blocks.length - 1

          return (
            <div
              key={block.id}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-all group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md scale-[1.02] z-10"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground",
                draggedIndex === index ? "opacity-50" : "",
                "cursor-grab active:cursor-grabbing"
              )}
            >
              {/* Move Handle */}
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={cn(
                  "h-full flex items-center justify-center w-6 shrink-0 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity",
                  isActive ? "text-white/60" : "text-muted-foreground/40"
                )}
                title="Drag to reorder"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M9 3h6M9 7h6M9 11h6M9 15h6M9 19h6" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Move Up/Down Buttons */}
              <div className="flex flex-col gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); onMoveBlockUp(index); }}
                  disabled={isFirst}
                  className={cn(
                    "h-4 w-4 flex items-center justify-center rounded transition-colors",
                    isFirst
                      ? "text-muted-foreground/20 cursor-not-allowed"
                      : isActive
                        ? "text-white/80 hover:text-white hover:bg-white/20"
                        : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/50"
                  )}
                  title="Move up (Alt+↑)"
                >
                  <ChevronUp className="h-3 w-3" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onMoveBlockDown(index); }}
                  disabled={isLast}
                  className={cn(
                    "h-4 w-4 flex items-center justify-center rounded transition-colors",
                    isLast
                      ? "text-muted-foreground/20 cursor-not-allowed"
                      : isActive
                        ? "text-white/80 hover:text-white hover:bg-white/20"
                        : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/50"
                  )}
                  title="Move down (Alt+↓)"
                >
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              {/* Icon and Label */}
              <button
                onClick={(e) => { e.stopPropagation(); onSelectBlock(block.id); }}
                className={cn(
                  "flex-1 flex items-center gap-3 min-w-0",
                  isActive ? "text-white" : ""
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : "text-muted-foreground/60")} />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-tight truncate">
                    {blockDef?.label || block.type}
                  </div>
                  <div className={cn(
                    "text-[10px] truncate opacity-60 font-medium",
                    isActive ? "text-white" : "text-muted-foreground"
                  )}>
                    {block.content.title || block.content.text || `Block ${index + 1}`}
                  </div>
                </div>
              </button>
            </div>
          )
        })}

        {blocks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center px-6">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4 opacity-50">
               <MousePointer2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-medium">No layers yet. Click the <Plus className="inline h-3 w-3" /> button above to start.</p>
          </div>
        )}
      </div>
    </div>
  )
}
