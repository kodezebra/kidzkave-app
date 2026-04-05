import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from 'lucide-react'
import { Section, Field } from '../common'

export function GalleryInspector({ content, onUpdateContent }: { content: any, onUpdateContent: (c: any) => void }) {
  const addImage = () => {
    const newImage = {
      src: '/placeholder.jpg',
      alt: 'Gallery image',
      caption: '',
    }
    const newImages = [...(content.images || []), newImage]
    onUpdateContent({ ...content, images: newImages })
  }

  const updateImage = (index: number, value: any) => {
    const newImages = [...content.images]
    newImages[index] = { ...newImages[index], ...value }
    onUpdateContent({ ...content, images: newImages })
  }

  const removeImage = (index: number) => {
    const newImages = content.images.filter((_: any, i: number) => i !== index)
    onUpdateContent({ ...content, images: newImages })
  }

  return (
    <>
      <Section title="Layout">
        <Field label="Layout">
          <select
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            value={content.layout || 'default'}
            onChange={(e) => onUpdateContent({ ...content, layout: e.target.value })}
          >
            <option value="default">Default (2 columns)</option>
            <option value="grid">Grid (4 columns)</option>
            <option value="masonry">Masonry</option>
          </select>
        </Field>
      </Section>
      <Section title="Gallery Images">
        <div className="space-y-3">
          {content.images?.map((image: any, i: number) => (
            <div key={i} className="p-3 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Image {i + 1}</span>
                <Button variant="ghost" size="icon" onClick={() => removeImage(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <Field label="Image URL"><Input value={image.src || ''} onChange={(e) => updateImage(i, { src: e.target.value })} /></Field>
              <Field label="Alt Text"><Input value={image.alt || ''} onChange={(e) => updateImage(i, { alt: e.target.value })} /></Field>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full gap-2 border-dashed" onClick={addImage}>
            <Plus className="h-3 w-3" /> Add Image
          </Button>
        </div>
      </Section>
      <p className="text-xs text-muted-foreground border-t pt-4 px-4">
        Edit title, tagline & subtitle on canvas
      </p>
    </>
  )
}
