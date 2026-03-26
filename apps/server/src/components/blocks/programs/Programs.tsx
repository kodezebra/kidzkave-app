import { html, raw } from 'hono/html'
import { getPadding, renderIcon } from '../utils'

export const Programs = ({ content }: { content: any }) => {
  const paddingStyleStr = content.styles?.paddingY !== undefined 
    ? `padding-top: ${content.styles.paddingY}px; padding-bottom: ${content.styles.paddingY}px;` 
    : ''

  return html`
    <section class="py-24 relative overflow-hidden" data-animate="fade-up" style="${paddingStyleStr}">
      <div class="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900/50 dark:via-slate-900 dark:to-slate-900/50"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center max-w-3xl mx-auto mb-16" data-animate-item>
          ${content.tagline ? html`<span class="section-tagline font-display font-bold tracking-[0.2em] uppercase text-sm mb-4 block">${content.tagline}</span>` : ''}
          <h2 class="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6 decorative-line">
            ${content.title || "Our Programs"}
          </h2>
          ${content.subtitle ? html`<p class="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">${content.subtitle}</p>` : ''}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${(content.items || []).map((item: any, index: number) => raw(`
            <div class="group relative" data-animate-item>
              <div class="absolute -inset-4 bg-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              <div class="relative flex flex-col gap-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-8 hover:border-primary/30 transition-all duration-300">
                ${item.icon ? `
                  <div class="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl flex items-center justify-center border border-primary/20">
                    ${renderIcon(item.icon, 'w-8 h-8 text-primary')}
                  </div>
                ` : ''}
                <div class="flex flex-col gap-3">
                  <h4 class="text-slate-900 dark:text-slate-100 text-xl font-bold group-hover:text-primary transition-colors duration-300">${item.title || "Program"}</h4>
                  ${item.description ? html`<p class="text-slate-600 dark:text-slate-400 leading-relaxed">${item.description}</p>` : ''}
                  ${item.list && item.list.length > 0 ? `
                    <ul class="space-y-2.5 pt-1">
                      ${item.list.filter((li: string) => li && li.trim()).map((li: string) => raw(`
                        <li class="flex items-start gap-2.5 text-slate-600 dark:text-slate-400">
                          <span class="text-primary mt-0.5 flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                            </svg>
                          </span>
                          <span class="leading-relaxed">${li}</span>
                        </li>
                      `)).join('')}
                    </ul>
                  ` : ''}
                </div>
                <div class="absolute bottom-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  ${item.icon ? renderIcon(item.icon, 'w-full h-full text-primary') : ''}
                </div>
              </div>
            </div>
          `))}
        </div>
        ${content.cta && content.cta.label ? `
          <div class="text-center mt-16" data-animate-item>
            <a href="${content.cta.href || '#'}" class="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5">
              ${content.cta.label}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        ` : ''}
      </div>
    </section>
  `
}
