import { Section } from '../common'

export function ContactFormInspector({ content, onUpdateContent }: { content: any, onUpdateContent: (c: any) => void }) {
  return (
    <>
      <p className="text-xs text-muted-foreground border-t pt-4 px-4">
        Edit tagline, title, subtitle & button label on canvas
      </p>
    </>
  )
}
