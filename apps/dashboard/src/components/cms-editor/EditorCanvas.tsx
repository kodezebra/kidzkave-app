import { Button } from "@/components/ui/button"
import {
  Monitor, Smartphone, Tablet, Plus, PanelLeft, PanelRight,
  Copy, Trash2
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import type { Block } from './types'
import { getCanvasComponent } from './blockRegistry'
import { BlockPicker } from './BlockPicker'

export function EditorCanvas({
  blocks,
  onSelectBlock,
  selectedBlockId,
  onToggleLeft,
  onToggleRight,
  leftOpen,
  rightOpen,
  onDuplicateBlock,
  onRemoveBlock,
  onAddBlock,
  onUpdateBlockContent,
  onSelectCta,
  device
}: {
  blocks: Block[],
  onSelectBlock: (id: string) => void,
  selectedBlockId: string | null,
  onToggleLeft: () => void,
  onToggleRight: () => void,
  leftOpen: boolean,
  rightOpen: boolean,
  onDuplicateBlock: (id: string) => void,
  onRemoveBlock: (id: string) => void,
  onAddBlock: (type: string, index?: number) => void,
  onUpdateBlockContent: (id: string, content: any) => void,
  onSelectCta?: (blockId: string, ctaType: string) => void,
  device: 'desktop' | 'tablet' | 'mobile'
}) {
  const blockRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    if (selectedBlockId && blockRefs.current[selectedBlockId]) {
      blockRefs.current[selectedBlockId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [selectedBlockId])

  const containerWidths = {
    desktop: 'w-full max-w-[1400px] mx-auto',
    tablet: 'w-[768px] mx-auto',
    mobile: 'w-[375px] mx-auto'
  }

  const renderBlock = (block: Block) => {
    const CanvasComponent = getCanvasComponent(block.type)
    
    if (!CanvasComponent) {
      return (
        <div className="px-12 py-16 border-2 border-dashed rounded-2xl m-6 text-center bg-muted/30 border-muted-foreground/10">
          <div className="h-12 w-12 rounded-full bg-background border shadow-sm flex items-center justify-center mx-auto mb-4">
            <Plus className="h-6 w-6 text-muted-foreground/40" />
          </div>
          <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">
            {block.type} Component
          </div>
          <div className="text-xs text-muted-foreground/60 max-w-[200px] mx-auto italic">
            This component is currently being updated or is not yet available in the preview canvas.
          </div>
        </div>
      )
    }

    return <CanvasComponent content={block.content} onChange={(content) => onUpdateBlockContent(block.id, content)} onSelectCta={(ctaType) => onSelectCta?.(block.id, ctaType)} />
  }

  const AddBlockButton = ({ index }: { index: number }) => (
    <div className="relative h-4 group/add-btn z-20">
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/add-btn:opacity-100 transition-opacity">
        <div className="w-full h-[1px] bg-primary/20 absolute" />
        <BlockPicker 
          onAddBlock={(type) => onAddBlock(type, index)} 
          trigger={
            <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full bg-primary text-white shadow-sm hover:scale-110 transition-transform">
              <Plus className="h-3.5 w-3.5" />
            </Button>
          }
        />
      </div>
    </div>
  )

  return (
    <TooltipProvider>
      <div className="flex-1 bg-muted/20 h-full flex flex-col items-center overflow-y-auto overflow-x-hidden relative group/canvas py-8">
        {/* The Stage - Enhanced with framing for focus mode */}
        <div className={cn(
          "bg-white shadow-2xl min-h-[calc(100vh-140px)] transition-all duration-300 relative rounded-sm border-2 border-slate-200/50 mb-20",
          containerWidths[device]
        )}>
          {/* Canvas top edge indicator */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover/canvas:opacity-100 transition-opacity" />
          
          {/* Empty state hint */}
          {blocks.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-500 mb-2">No blocks yet</p>
                <p className="text-xs text-slate-400">Click the + button in Layers to add your first block</p>
                <div className="mt-6">
                  <BlockPicker 
                    onAddBlock={(type) => onAddBlock(type)} 
                    trigger={
                      <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add First Block
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {blocks.map((block, index) => {
            const isSelected = selectedBlockId === block.id
            const styles = (block.content as any).styles || {}
            const paddingY = styles.paddingY !== undefined ? `${styles.paddingY}px` : '48px'

            return (
              <div key={block.id}>
                {index === 0 && <AddBlockButton index={0} />}
                
                <div
                  ref={(el) => { blockRefs.current[block.id] = el }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectBlock(block.id)
                  }}
                  style={{ paddingTop: paddingY, paddingBottom: paddingY }}
                  className={cn(
                    "relative transition-all group/block",
                    isSelected ? "ring-2 ring-primary ring-inset z-10" : "hover:bg-slate-50/50"
                  )}
                >
                  {/* Selected Block Label */}
                  {isSelected && (
                    <div className="absolute -top-2 left-4 px-2 py-0.5 bg-primary text-[9px] font-bold text-white uppercase tracking-widest rounded shadow-sm z-20">
                      {block.type}
                    </div>
                  )}

                  {/* Block Actions */}
                  <div className="absolute -right-2 top-2 opacity-0 group-hover/block:opacity-100 transition-opacity flex items-center gap-1 z-20">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 bg-background border shadow-sm hover:border-primary"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDuplicateBlock(block.id)
                      }}
                      title="Duplicate block"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 bg-background border shadow-sm hover:border-destructive text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemoveBlock(block.id)
                      }}
                      title="Delete block"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  {/* Render Block Content */}
                  <div className="group/block relative">
                    {renderBlock(block)}
                  </div>
                </div>

                <AddBlockButton index={index + 1} />
              </div>
            )
          })}
        </div>
      </div>
    </TooltipProvider>
  )
}
