import { EditableText } from '../editable/EditableText'

export function TextBlock({ content, onChange }: { content: any; onChange?: (content: any) => void }) {
  const handleTextChange = (newText: string) => {
    if (onChange) {
      onChange({ ...content, text: newText })
    }
  }

  return (
    <div className="px-12 py-8">
      <EditableText
        value={content.text || 'Standard text block...'}
        onChange={onChange ? handleTextChange : undefined}
        className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap"
      />
    </div>
  )
}
