import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icon } from '@iconify/react'
import { Section, Field, ItemAccordion } from '../common'
import { IconPicker } from '../../IconPicker'

export function ProgramsInspector({ 
  content, 
  onUpdateContent, 
  openItem, 
  onToggleItem 
}: { 
  content: any, 
  onUpdateContent: (c: any) => void,
  openItem: number | null,
  onToggleItem: (i: number) => void
}) {
  const updateItem = (key: string, index: number, value: any) => {
    const newItems = [...(content[key] || [])]
    newItems[index] = { ...newItems[index], ...value }
    onUpdateContent({ ...content, [key]: newItems })
  }

  const addItem = (key: string, defaultValue: any) => {
    const newItems = [...(content[key] || []), defaultValue]
    onUpdateContent({ ...content, [key]: newItems })
    onToggleItem(newItems.length - 1)
  }

  const removeItem = (key: string, index: number) => {
    const newItems = content[key].filter((_: any, i: number) => i !== index)
    onUpdateContent({ ...content, [key]: newItems })
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
    onToggleItem(itemIndex)
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
        <Field label="Subtitle"><textarea className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm" value={content.subtitle || ''} onChange={(e) => onUpdateContent({ ...content, subtitle: e.target.value })} /></Field>
      </Section>
      <Section title="Programs">
        <div className="space-y-2">
          {content.items?.map((item: any, i: number) => (
            <ItemAccordion key={i} title={item.title || `Program ${i+1}`} onRemove={() => removeItem('items', i)} isOpen={openItem === i} onToggle={() => onToggleItem(i)}>
              <Field label="Icon">
                <IconPicker value={item.icon} onSelect={(icon) => updateItem('items', i, { icon })} />
              </Field>
              <Field label="Title"><Input value={item.title || ''} onChange={(e) => updateItem('items', i, { title: e.target.value })} /></Field>
              <Field label="Description (Optional)">
                <textarea 
                  className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm" 
                  value={item.description || ''} 
                  onChange={(e) => updateItem('items', i, { description: e.target.value })} 
                  placeholder="Brief description before the list..."
                />
              </Field>
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
                        <Icon icon="ph:x-fill" className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full gap-2 text-xs"
                    onClick={() => addListItem(i)}
                  >
                    <Icon icon="ph:plus-fill" className="h-3 w-3" /> Add Item
                  </Button>
                </div>
              </Field>
            </ItemAccordion>
          ))}
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full gap-2 border-dashed" 
            onClick={() => addItem('items', { 
              icon: 'graduation-cap', 
              title: 'New Program', 
              description: '', 
              list: ['Item 1', 'Item 2'] 
            })}
          >
            <Icon icon="ph:plus-fill" className="h-3 w-3" /> Add Program
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
