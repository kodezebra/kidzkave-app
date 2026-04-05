import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from 'lucide-react'
import { Icon } from '@iconify/react'
import { Section, Field } from '../common'
import { MediaPicker } from '../../MediaPicker'

export function TestimonialsInspector({ content, onUpdateContent }: { content: any, onUpdateContent: (c: any) => void }) {
  const updateItem = (index: number, value: any) => {
    const newItems = [...(content.items || [])]
    newItems[index] = { ...newItems[index], ...value }
    onUpdateContent({ ...content, items: newItems })
  }

  const addItem = () => {
    const newItems = [...(content.items || []), { name: 'Client Name', role: 'CEO', text: 'Feedback here', image: '' }]
    onUpdateContent({ ...content, items: newItems })
  }

  const removeItem = (index: number) => {
    const newItems = content.items.filter((_: any, i: number) => i !== index)
    onUpdateContent({ ...content, items: newItems })
  }

  return (
    <>
      <Section title="Header">
        <Field label="Tagline"><Input value={content.tagline || ''} onChange={(e) => onUpdateContent({ ...content, tagline: e.target.value })} /></Field>
        <Field label="Title"><Input value={content.title || ''} onChange={(e) => onUpdateContent({ ...content, title: e.target.value })} /></Field>
      </Section>
      <Section title="Testimonials">
        <div className="space-y-2">
          {content.items?.map((item: any, i: number) => (
            <div key={i} className="p-3 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{item.name || `Client ${i+1}`}</p>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <Field label="Photo URL">
                <div className="flex items-center gap-2">
                  <Input value={item.image || ''} onChange={(e) => updateItem(i, { image: e.target.value })} className="flex-1" />
                  <MediaPicker onSelect={(url) => updateItem(i, { image: url })} trigger={<Button variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>} />
                </div>
              </Field>
              <p className="text-xs text-muted-foreground border-t pt-2">
                Edit name, role & text on canvas
              </p>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full gap-2 border-dashed" onClick={addItem}>
            <Plus className="h-3 w-3" /> Add Testimonial
          </Button>
        </div>
      </Section>
    </>
  )
}
