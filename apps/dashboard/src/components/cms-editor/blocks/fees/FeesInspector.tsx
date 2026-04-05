import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from 'lucide-react'
import { Section, Field } from '../common'
import { PageSelector } from '../../PageSelector'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const SECTION_STYLES = [
  { value: 'list', label: 'List', description: 'Simple rows with name and price' },
  { value: 'table', label: 'Table', description: 'Grid table with columns' },
  { value: 'checklist', label: 'Checklist', description: 'Items with checkmarks, no prices' },
]

export function FeesInspector({ content, onUpdateContent }: { content: any, onUpdateContent: (c: any) => void }) {
  const updateSection = (index: number, value: any) => {
    const newSections = [...(content.sections || [])]
    newSections[index] = { ...newSections[index], ...value }
    onUpdateContent({ ...content, sections: newSections })
  }

  const addSection = () => {
    const newSections = [...(content.sections || []), {
      title: 'New Section',
      style: 'list',
      items: [{ name: '', price: '', note: '' }]
    }]
    onUpdateContent({ ...content, sections: newSections })
  }

  const removeSection = (index: number) => {
    const newSections = (content.sections || []).filter((_: any, i: number) => i !== index)
    onUpdateContent({ ...content, sections: newSections })
  }

  const updateSectionItem = (sectionIndex: number, itemIndex: number, value: any) => {
    const section = content.sections?.[sectionIndex]
    if (!section) return
    
    const newItems = [...(section.items || [])]
    newItems[itemIndex] = { ...newItems[itemIndex], ...value }
    updateSection(sectionIndex, { items: newItems })
  }

  const addSectionItem = (sectionIndex: number) => {
    const section = content.sections?.[sectionIndex]
    if (!section) return
    
    const newItems = [...(section.items || []), { name: '', price: '', note: '' }]
    updateSection(sectionIndex, { items: newItems })
  }

  const removeSectionItem = (sectionIndex: number, itemIndex: number) => {
    const section = content.sections?.[sectionIndex]
    if (!section) return
    
    const newItems = section.items.filter((_: any, i: number) => i !== itemIndex)
    updateSection(sectionIndex, { items: newItems })
  }

  return (
    <>
      <Section title="Currency">
        <Select value={content.currency || 'UGX'} onValueChange={(val) => onUpdateContent({ ...content, currency: val })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="UGX">UGX (Uganda Shilling)</SelectItem>
            <SelectItem value="$">USD ($)</SelectItem>
            <SelectItem value="£">GBP (£)</SelectItem>
            <SelectItem value="€">EUR (€)</SelectItem>
            <SelectItem value="KES">KES (Kenya Shilling)</SelectItem>
            <SelectItem value="TZS">TZS (Tanzania Shilling)</SelectItem>
          </SelectContent>
        </Select>
      </Section>
      <Section title="Fee Sections">
        <div className="space-y-4">
          {content.sections?.map((section: any, i: number) => (
            <div key={i} className="p-3 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{section.title || `Section ${i+1}`}</p>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeSection(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <Field label="Style">
                <Select value={section.style || 'list'} onValueChange={(val) => updateSection(i, { style: val })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTION_STYLES.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        <div>
                          <div className="font-medium">{style.label}</div>
                          <div className="text-xs text-muted-foreground">{style.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              
              {section.style !== 'checklist' && (
                <div className="border-t pt-3 space-y-2">
                  <span className="text-xs font-medium text-muted-foreground">Items</span>
                  {section.items?.map((item: any, j: number) => (
                    <div key={j} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-1">
                        <Input 
                          value={item.name || ''} 
                          onChange={(e) => updateSectionItem(i, j, { name: e.target.value })} 
                          placeholder="Name (e.g., Registration)"
                          className="text-xs"
                        />
                        <div className="flex gap-1">
                          <Input 
                            value={item.price || ''} 
                            onChange={(e) => updateSectionItem(i, j, { price: e.target.value })} 
                            placeholder="Price"
                            className="text-xs flex-1"
                          />
                          <Input 
                            value={item.note || ''} 
                            onChange={(e) => updateSectionItem(i, j, { note: e.target.value })} 
                            placeholder="Note"
                            className="text-xs flex-1"
                          />
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeSectionItem(i, j)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => addSectionItem(i)}>
                    <Plus className="h-3 w-3 mr-1" /> Add Item
                  </Button>
                </div>
              )}
              
              {section.style === 'checklist' && (
                <div className="border-t pt-3 space-y-2">
                  <span className="text-xs font-medium text-muted-foreground">Included Items</span>
                  {section.items?.map((item: any, j: number) => (
                    <div key={j} className="flex gap-2 items-center">
                      <Input 
                        value={item.name || ''} 
                        onChange={(e) => updateSectionItem(i, j, { name: e.target.value })} 
                        placeholder="Item name (e.g., Swimming Lessons)"
                        className="flex-1 text-xs"
                      />
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeSectionItem(i, j)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => addSectionItem(i)}>
                    <Plus className="h-3 w-3 mr-1" /> Add Item
                  </Button>
                </div>
              )}
              <p className="text-xs text-muted-foreground border-t pt-2">
                Edit section title on canvas
              </p>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full gap-2 border-dashed" onClick={addSection}>
            <Plus className="h-3 w-3" /> Add Section
          </Button>
        </div>
      </Section>
      <Section title="Call to Action (Optional)">
        <Field label="Link">
          <PageSelector
            value={content.ctaHref || ''}
            onChange={(url) => onUpdateContent({ ...content, ctaHref: url })}
            placeholder="Select a page..."
          />
        </Field>
      </Section>
      <p className="text-xs text-muted-foreground border-t pt-4 px-4">
        Edit tagline, title, subtitle & CTA label on canvas
      </p>
    </>
  )
}
