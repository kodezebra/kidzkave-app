import { Button } from "@/components/ui/button"
import {
  Plus, Layers, MousePointer2, Box,
  ChevronUp, ChevronDown
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"
import { getBlockDefinition } from './blockRegistry'
import { BlockPicker } from './BlockPicker'

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
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

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
    <div className="w-[200px] border-r bg-card flex flex-col h-full shadow-sm transition-all duration-200">
      <div className="p-4 border-b flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-xs uppercase tracking-widest">Layers</h2>
        </div>

        <BlockPicker onAddBlock={onAddBlock} />
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
