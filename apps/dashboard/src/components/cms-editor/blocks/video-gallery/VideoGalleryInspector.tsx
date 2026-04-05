import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { Section, Field } from '../common'
import { MediaPicker } from '../../MediaPicker'
import type { VideoPlatform } from '../../types'

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function VideoGalleryInspector({ content, onUpdateContent }: { content: any, onUpdateContent: (c: any) => void }) {
  const [processingUrl, setProcessingUrl] = useState<number | null>(null)

  const apiBase = import.meta.env.VITE_API_URL || '/api'

  const updateItem = (index: number, value: any) => {
    const newItems = [...(content.items || [])]
    newItems[index] = { ...newItems[index], ...value }
    onUpdateContent({ ...content, items: newItems })
  }

  const addItem = () => {
    const newItems = [...(content.items || []), { 
      id: generateId(),
      platform: 'youtube' as VideoPlatform, 
      videoId: '', 
      url: '', 
      embedUrl: '', 
      thumbnail: '', 
      embedAllowed: true,
      title: 'New Video' 
    }]
    onUpdateContent({ ...content, items: newItems })
  }

  const removeItem = (index: number) => {
    const newItems = content.items.filter((_: any, i: number) => i !== index)
    onUpdateContent({ ...content, items: newItems })
  }

  const handleUrlChange = async (index: number, url: string) => {
    updateItem(index, { url })
    
    if (!url) {
      updateItem(index, { 
        platform: undefined, 
        videoId: '', 
        embedUrl: '', 
        thumbnail: '',
        embedAllowed: true 
      })
      return
    }

    setProcessingUrl(index)
    
    try {
      const response = await fetch(`${apiBase}/video/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      
      if (response.ok) {
        const data = await response.json()
        const video = data.block
        
        updateItem(index, {
          id: video.id,
          platform: video.platform,
          videoId: video.videoId,
          embedUrl: video.embedUrl,
          thumbnail: video.thumbnail,
          embedAllowed: video.embedAllowed ?? true,
          title: video.title || content.items[index]?.title || (video.platform === 'tiktok' ? 'TikTok Video' : 'YouTube Video'),
        })
      } else {
        updateItem(index, { platform: 'youtube' as VideoPlatform, embedAllowed: true })
      }
    } catch (e) {
      console.error('Failed to parse video URL:', e)
      updateItem(index, { platform: 'youtube' as VideoPlatform, embedAllowed: true })
    }
    
    setProcessingUrl(null)
  }

  return (
    <>
      <Section title="Layout">
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {[
            { value: 'compact', label: 'Compact' },
            { value: 'standard', label: 'Standard' },
            { value: 'list', label: 'List' },
          ].map((layout) => (
            <button
              key={layout.value}
              onClick={() => onUpdateContent({ ...content, layout: layout.value })}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors ${
                (content.layout || 'compact') === layout.value
                  ? 'bg-background shadow-sm text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {layout.label}
            </button>
          ))}
        </div>
      </Section>
      <Section title="Videos">
        <div className="space-y-2">
          {content.items?.map((item: any, i: number) => (
            <div key={item.id || i} className="p-3 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{item.title || `Video ${i+1}`}</p>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              
              <Field label="Video URL">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input 
                      value={item.url || ''} 
                      onChange={(e) => handleUrlChange(i, e.target.value)} 
                      placeholder="https://youtube.com/watch?v=... or https://tiktok.com/..."
                      className="pr-8"
                    />
                    {processingUrl === i && (
                      <Icon icon="ph:spinner" className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                  {item.platform && (
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      item.platform === 'tiktok' 
                        ? 'bg-cyan-500/20 text-cyan-600' 
                        : 'bg-red-500/20 text-red-600'
                    }`}>
                      {item.platform}
                    </div>
                  )}
                </div>
              </Field>

              <Field label="Custom Thumbnail (Optional)">
                <div className="flex items-center gap-2">
                  <Input value={item.thumbnail || ''} onChange={(e) => updateItem(i, { thumbnail: e.target.value })} className="flex-1" placeholder="Leave empty to use auto-generated" />
                  <MediaPicker onSelect={(url) => updateItem(i, { thumbnail: url })} trigger={<Button variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>} />
                </div>
              </Field>
              <p className="text-xs text-muted-foreground border-t pt-2">
                Edit title on canvas
              </p>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full gap-2 border-dashed" onClick={addItem}>
            <Plus className="h-3 w-3" /> Add Video
          </Button>
        </div>
      </Section>
    </>
  )
}