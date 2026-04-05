import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from 'lucide-react'
import { Section, Field } from '../common'
import { IconPicker } from '../../IconPicker'

export function ProgramsInspector({ content, onUpdateContent }: { content: any, onUpdateContent: (c: any) => void }) {
  const updateItem = (index: number, value: any) => {
    const newItems = [...(content.items || [])]
    newItems[index] = { ...newItems[index], ...value }
    onUpdateContent({ ...content, items: newItems })
  }

  const addItem = () => {
    const newItems = [...(content.items || []), { icon: 'graduation-cap', title: 'New Program', description: '', list: ['Item 1', 'Item 2'] }]
    onUpdateContent({ ...content, items: newItems })
  }

  const removeItem = (index: number) => {
    const newItems = content.items.filter((_: any, i: number) => i !== index)
    onUpdateContent({ ...content, items: newItems })
  }

  const updateListItem = (itemIndex: number, listIndex: number, value: string) => {
    const newItems = [...(content.items || [])]
    const newList = [...(newItems[itemIndex].list || [])]
    newList[listIndex] = value
    newItems[itemIndex] = { ...newItems[itemIndex], list: newList }
    onUpdateContent({ ...content, items: newItems })
  }

  const addListItem = (itemIndex: number) => {
    const newItems = [...(content.items || [])]
    const newList = [...(newItems[itemIndex].list || []), '']
    newItems[itemIndex] = { ...newItems[itemIndex], list: newList }
    onUpdateContent({ ...content, items: newItems })
  }

  const removeListItem = (itemIndex: number, listIndex: number) => {
    const newItems = [...(content.items || [])]
    const newList = (newItems[itemIndex].list || []).filter((_: any, i: number) => i !== listIndex)
    newItems[itemIndex] = { ...newItems[itemIndex], list: newList }
    onUpdateContent({ ...content, items: newItems })
  }

  return (
    <>
      <Section title="Header">
        <Field label="Tagline"><Input value={content.tagline || ''} onChange={(e) => onUpdateContent({ ...content, tagline: e.target.value })} /></Field>
        <Field label="Title"><Input value={content.title || ''} onChange={(e) => onUpdateContent({ ...content, title: e.target.value })} /></Field>
      </Section>
      <Section title="Programs">
        <div className="space-y-2">
          {content.items?.map((item: any, i: number) => (
            <div key={i} className="p-3 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{item.title || `Program ${i+1}`}</p>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <Field label="Icon">
                <IconPicker value={item.icon} onSelect={(icon) => updateItem(i, { icon })} />
              </Field>
              <p className="text-xs text-muted-foreground border-t pt-2">
                Edit title & description on canvas
              </p>
              <Field label="Checklist Items">
                <div className="space-y-2">
                  {(item.list || []).map((listItem: string, j: number) => (
                    <div key={j} className="flex items-center gap-2">
                      <span className="text-primary font-bold">✓</span>
                      <Input 
                        value={listItem} 
                        onChange={(e) => updateListItem(i, j, e.target.value)}
                        className="flex-1"
                        placeholder="Enter item..."
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => removeListItem(i, j)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full gap-2 text-xs"
                    onClick={() => addListItem(i)}
                  >
                    <Plus className="h-3 w-3" /> Add Item
                  </Button>
                </div>
              </Field>
            </div>
          ))}
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full gap-2 border-dashed" 
            onClick={addItem}
          >
            <Plus className="h-3 w-3" /> Add Program
          </Button>
        </div>
      </Section>
      <Section title="Call to Action">
        <Field label="Button Label">
          <Input 
            value={content.cta?.label || ''} 
            onChange={(e) => onUpdateContent({ ...content, cta: { ...content.cta, label: e.target.value, href: content.cta?.href || '#' } })} 
            placeholder="Learn More"
          />
        </Field>
        <Field label="Button Link">
          <Input 
            value={content.cta?.href || ''} 
            onChange={(e) => onUpdateContent({ ...content, cta: { ...content.cta, label: content.cta?.label || '', href: e.target.value } })} 
            placeholder="/programs"
          />
        </Field>
      </Section>
    </>
  )
}
