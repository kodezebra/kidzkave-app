import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Section, Field } from '../common'
import { IconPicker } from '../../IconPicker'
import { Trash2, Plus } from 'lucide-react'

export function ServicesInspector({ content, onUpdateContent }: { content: any, onUpdateContent: (c: any) => void }) {
  const addItem = () => {
    const newItems = [...(content.items || []), { icon: 'zap', title: 'New Service', description: '', link: '' }]
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
    <>
      <Section title="Layout">
        <Field label="Style">
          <select
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            value={content.layout || 'grid'}
            onChange={(e) => onUpdateContent({ ...content, layout: e.target.value })}
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
          </select>
        </Field>
      </Section>

      <Section title="Services">
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
              <Input 
                value={item.link || ''} 
                onChange={(e) => {
                  const newItems = [...(content.items || [])]
                  newItems[i] = { ...newItems[i], link: e.target.value }
                  onUpdateContent({ ...content, items: newItems })
                }} 
                placeholder="Link (optional)"
              />
              <p className="text-xs text-muted-foreground border-t pt-2">
                Edit title & description on canvas
              </p>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full gap-2 border-dashed" onClick={addItem}>
            <Plus className="h-3 w-3" /> Add Service
          </Button>
        </div>
      </Section>
    </>
  )
}