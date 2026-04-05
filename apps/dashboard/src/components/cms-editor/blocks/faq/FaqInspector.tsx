import { Button } from "@/components/ui/button"
import { Trash2, Plus } from 'lucide-react'
import { Section } from '../common'

export function FaqInspector({ content, onUpdateContent }: { content: any, onUpdateContent: (c: any) => void }) {
  const addItem = (defaultValue: any) => {
    const newItems = [...(content.items || []), defaultValue]
    onUpdateContent({ ...content, items: newItems })
  }

  const removeItem = (index: number) => {
    const newItems = content.items.filter((_: any, i: number) => i !== index)
    onUpdateContent({ ...content, items: newItems })
  }

  return (
    <Section title="Questions">
      <div className="space-y-2">
        {content.items?.map((item: any, i: number) => (
          <div key={i} className="p-3 border rounded-lg relative group">
            <Button variant="ghost" size="icon" className="h-6 w-6 absolute top-1 right-1 opacity-0 group-hover:opacity-100" onClick={() => removeItem(i)}>
              <Trash2 className="h-3 w-3" />
            </Button>
            <p className="text-sm font-medium pr-6">{item.question}</p>
            <div className="text-xs text-muted-foreground border-t pt-2">
              Edit on canvas
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full gap-2 border-dashed" onClick={() => addItem({ question: 'New Question', answer: 'Answer goes here' })}>
          <Plus className="h-3 w-3" /> Add Question
        </Button>
      </div>
    </Section>
  )
}