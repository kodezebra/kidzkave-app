interface EditableTextProps {
  value: string
  onChange?: (value: string) => void
  className?: string
}

export function EditableText({ value, onChange, className }: EditableTextProps) {
  if (!onChange) {
    return <div className={className}>{value}</div>
  }

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.textContent || ''
    if (newValue !== value) {
      onChange(newValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  return (
    <div
      contentEditable
      suppressContentEditableWarning
      className={className}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {value}
    </div>
  )
}