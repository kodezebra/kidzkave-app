import { Button } from "@/components/ui/button"
import {
  Settings2, MousePointer2, Trash2, Copy, AlertCircle
} from 'lucide-react'
import type { Block } from './types'
import { getInspectorComponent } from './blockRegistry'

export function EditorInspector({
  selectedBlock,
  onUpdateContent,
  onRemoveBlock,
  onDuplicateBlock,
  selectedCta
}: {
  selectedBlock: Block | null,
  onUpdateContent: (content: any) => void,
  onRemoveBlock: (id: string) => void,
  onDuplicateBlock: (id: string) => void,
  selectedCta?: { blockId: string; ctaType: string } | null
}) {
  if (!selectedBlock) {
    return (
      <div className="w-full border-l bg-card flex flex-col items-center justify-center text-muted-foreground/30 p-12 text-center h-full">
        <MousePointer2 className="h-10 w-10 mb-4 opacity-5" />
        <p className="text-sm font-medium italic">Select a layer to edit.</p>
      </div>
    )
  }

  // Validation: Check for empty required fields
  const hasEmptyRequired = !(selectedBlock.content as any).title && 
    !(selectedBlock.content as any).text && 
    selectedBlock.type !== 'stats'

  const content = selectedBlock.content

  const renderInspector = () => {
    const InspectorComponent = getInspectorComponent(selectedBlock.type)
    
    if (!InspectorComponent) {
      return <div className="p-4 text-xs text-muted-foreground italic">No specialized inspector for this block type.</div>
    }

    return <InspectorComponent content={content} onUpdateContent={onUpdateContent} selectedCta={selectedCta} />
  }

  return (
    <div className="w-[280px] border-l bg-card flex flex-col h-full shadow-lg font-sans">
      <div className="p-4 border-b flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-2">
           <Settings2 className="h-4 w-4 text-primary" />
           <h2 className="font-bold text-[10px] uppercase tracking-widest">{selectedBlock.type}</h2>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => onDuplicateBlock(selectedBlock.id)}
            title="Duplicate block"
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            onClick={() => onRemoveBlock(selectedBlock.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Validation Warning */}
      {hasEmptyRequired && (
        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
            This block appears to be empty. Add some content to make it visible.
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {renderInspector()}
      </div>

      <div className="p-4 border-t bg-muted/10 text-[9px] text-center text-muted-foreground font-medium uppercase tracking-tighter">
        Draft auto-saved
      </div>
    </div>
  )
}