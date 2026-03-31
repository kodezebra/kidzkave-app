import { html, raw } from 'hono/html'
import { getPadding, renderIcon } from '../utils'

export const Cta = ({ content }: { content: any }) => {
  const getEyebrowStyle = (style: string | undefined, text: string) => {
    switch (style) {
      case 'badge':
        return `<span class="inline-block bg-white/15 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20 shadow-sm">${text}</span>`
      case 'minimal':
        return `<span class="inline-block text-sm font-bold uppercase tracking-[0.2em] text-white/80 mb-6">${text}</span>`
      case 'icon':
        return `<div class="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md text-white px-5 py-2 rounded-full mb-6 border border-white/20 shadow-sm">
          <span class="text-lg">${renderIcon(content.eyebrowIcon || 'star', 'w-5 h-5')}</span>
          <span class="text-sm font-semibold uppercase tracking-wider">${text}</span>
        </div>`
      default:
        return text ? `<span class="inline-block text-sm font-bold uppercase tracking-[0.2em] text-white/70 mb-6">${text}</span>` : ''
    }
  }

  return html`
  <section class="py-24 bg-primary mx-4 my-12 rounded-3xl relative overflow-hidden" data-animate="scale-in" style="${getPadding(content.styles)}">
    <div class="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      ${content.eyebrow ? raw(getEyebrowStyle(content.eyebrowStyle, content.eyebrow)) : ''}
      <h2 class="text-4xl font-display font-bold text-white sm:text-5xl mb-8" data-animate-item>
        ${content.title || ""}
      </h2>
      <p class="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium" data-animate-item>
        ${content.subtitle || ""}
      </p>
      <div class="flex justify-center mb-8" data-animate-item>
        <a
          href="${content.cta?.href || content.ctaHref || '#'}"
          class="bg-accent text-white px-12 py-5 rounded-2xl font-display font-bold text-xl hover:brightness-110 hover:scale-[1.05] active:scale-[0.98] transition-all shadow-2xl shadow-black/20 inline-block btn-animated"
        >
          ${content.cta?.label || content.ctaLabel || ""}
        </a>
      </div>
      ${content.secondaryInfo && content.secondaryInfo.length > 0 ? raw(`
        <div class="flex flex-wrap justify-center gap-6 text-white/80 text-sm" data-animate-item>
          ${content.secondaryInfo.map((item: any, index: number) => raw(`
            ${index > 0 ? '<span class="opacity-50">•</span>' : ''}
            ${item.href ? raw(`<a href="${item.href}" class="hover:text-white transition-colors underline underline-offset-2">${item.label}</a>`) : `<span>${item.label}</span>`}
          `)).join('')}
        </div>
      `) : ''}
    </div>
  </section>
  `
}
