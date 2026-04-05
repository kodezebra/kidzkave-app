import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MediaPicker } from './MediaPicker'
import { Upload, X } from 'lucide-react'

interface ImagePickerProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function ImagePicker({ value, onChange, label }: ImagePickerProps) {
  const handleRemove = (e: React.MouseEvent) => {
    console.log('ImagePicker handleRemove clicked')
    e.stopPropagation()
    onChange('')
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleUrlClear = () => {
    onChange('')
  }

  return (
    <div className="space-y-2">
      {label && (
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
      )}
      
      {value && (
        <div className="relative rounded-lg overflow-hidden border">
          <img src={value} alt="" className="w-full h-20 object-cover" />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 bg-background/80 hover:bg-background"
            onClick={handleRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {!value && (
        <MediaPicker
          onSelect={(url: string) => {
            onChange(url)
          }}
          trigger={
            <Button type="button" variant="outline" size="sm" className="w-full gap-2">
              <Upload className="h-4 w-4" />
              Upload or select
            </Button>
          }
        />
      )}

      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={value}
          onChange={handleUrlChange}
          placeholder="Or paste image URL..."
          className="text-xs"
        />
        {value && (
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-0"
            onClick={handleUrlClear}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  )
}