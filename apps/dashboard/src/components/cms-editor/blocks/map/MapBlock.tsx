import { MapPin, Navigation } from 'lucide-react'
import { useThemeClasses } from '../../useThemeClasses'
import { EditableText } from '../editable/EditableText'

interface MapContent {
  title?: string
  height?: 'small' | 'medium' | 'large' | 'full'
  showDirections?: boolean
  directionsLabel?: string
  styles?: { paddingY?: number }
}

export function MapBlock({ content, onChange }: { content: MapContent, onChange?: (content: MapContent) => void }) {
  const { primary, primaryWithOpacity } = useThemeClasses()
  
  const updateField = (field: string, value: any) => {
    onChange?.({ ...content, [field]: value })
  }
  
  const heightMap = {
    small: '200px',
    medium: '300px',
    large: '400px',
    full: '500px'
  }
  
  const mapHeight = heightMap[content.height || 'medium']
  const directionsLabel = content.directionsLabel || 'Get Directions'

  return (
    <div className="px-12">
      {content.title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            <EditableText value={content.title} onChange={onChange ? (v) => updateField('title', v) : undefined} />
          </h2>
        </div>
      )}
      
      <div className="rounded-xl overflow-hidden border shadow-sm">
        <div 
          className="w-full bg-slate-100 flex items-center justify-center relative"
          style={{ height: mapHeight }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }} />
          </div>
          
          <div className="relative flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full flex items-center justify-center" style={{ backgroundColor: primaryWithOpacity(0.1) }}>
              <MapPin className="h-8 w-8" style={{ color: primary }} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600">School Location</p>
              <p className="text-xs text-slate-400 mt-1">Configure coordinates in School Settings</p>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span>Google Maps</span>
              <span className="text-slate-300">•</span>
              <span>Interactive</span>
            </div>
          </div>
        </div>
        
        {content.showDirections && (
          <div className="bg-white p-4 border-t">
            <a
              href="https://maps.google.com?q=0.0,0.0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors"
              style={{ backgroundColor: primary }}
            >
              <Navigation className="h-4 w-4" />
              <EditableText value={directionsLabel} onChange={onChange ? (v) => updateField('directionsLabel', v) : undefined} />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
