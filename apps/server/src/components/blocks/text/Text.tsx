import { html } from 'hono/html'
import { getPadding } from '../utils'

export const Text = ({ content }: { content: any }) => {
  const paddingStyleStr = content.styles?.paddingY !== undefined 
    ? `padding-top: ${content.styles.paddingY}px; padding-bottom: ${content.styles.paddingY}px;` 
    : ''

  return html`
    <section class="py-16 relative overflow-hidden" data-animate="fade-up" style="${paddingStyleStr}">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
          ${content.text || ""}
        </p>
      </div>
    </section>
  `
}
