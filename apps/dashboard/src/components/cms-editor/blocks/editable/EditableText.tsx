interface EditableTextProps {
  value: string
  onChange?: (value: string) => void
  className?: string
}

export function EditableText({ value, onChange, className }: EditableTextProps) {
  if (!onChange) {
    return <span className={className}>{value}</span>
  }

  const handleBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    const newValue = e.currentTarget.textContent || ''
    if (newValue !== value) {
      onChange(newValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  return (
    <span
      contentEditable
      suppressContentEditableWarning
      className={className}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {value}
    </span>
  )
}