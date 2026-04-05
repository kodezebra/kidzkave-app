import { Button } from "@/components/ui/button"
import { Section } from '../common'
import { IconPicker } from '../../IconPicker'
import { Trash2, Plus } from 'lucide-react'

export function ValuesInspector({ content, onUpdateContent }: { content: any, onUpdateContent: (c: any) => void }) {
  const addItem = (defaultValue: any) => {
    const newItems = [...(content.items || []), defaultValue]
    onUpdateContent({ ...content, items: newItems })
  }

  const removeItem = (index: number) => {
    const newItems = content.items.filter((_: any, i: number) => i !== index)
    onUpdateContent({ ...content, items: newItems })
  }

  const updateItemIcon = (index: number, icon: string) => {
    const newItems = [...(content.items || [])]
    newItems[index] = { ...newItems[index], icon }
    onUpdateContent({ ...content, items: newItems })
  }

  return (
    <Section title="Values">
      <div className="space-y-2">
        {content.items?.map((item: any, i: number) => (
          <div key={i} className="p-3 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{item.title}</p>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(i)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            <IconPicker value={item.icon} onSelect={(icon) => updateItemIcon(i, icon)} />
            <div className="text-xs text-muted-foreground border-t pt-2">
              Edit title & description on canvas
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full gap-2 border-dashed" onClick={() => addItem({ icon: 'star', title: 'New Value', description: '' })}>
          <Plus className="h-3 w-3" /> Add Value
        </Button>
      </div>
    </Section>
  )
}