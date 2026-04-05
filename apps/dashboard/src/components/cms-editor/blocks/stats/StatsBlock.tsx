// Stats grid rendering for the editor canvas
import { useThemeClasses } from '../../useThemeClasses'
import { EditableText } from '../editable/EditableText'

export function StatsBlock({ content, onChange }: { content: any; onChange?: (content: any) => void }) {
  const { primary, primaryWithOpacity } = useThemeClasses()

  const updateItem = (index: number, field: string, value: string) => {
    if (onChange) {
      const newItems = [...(content.items || [])]
      newItems[index] = { ...newItems[index], [field]: value }
      onChange({ ...content, items: newItems })
    }
  }

  return (
    <div className="py-16 px-12 text-white mx-8 rounded-3xl grid grid-cols-4 gap-8 text-center shadow-xl" style={{ backgroundColor: primary, boxShadow: `0 25px 50px -12px ${primaryWithOpacity(0.2)}` }}>
      {content.items?.map((item: any, i: number) => (
        <div key={i}>
          <EditableText 
            value={item.value} 
            onChange={onChange ? (v) => updateItem(i, 'value', v) : undefined}
            className="text-3xl font-black mb-1"
          />
          <EditableText 
            value={item.label} 
            onChange={onChange ? (v) => updateItem(i, 'label', v) : undefined}
            className="text-[10px] font-bold uppercase tracking-widest opacity-70"
          />
        </div>
      ))}
    </div>
  )
}
