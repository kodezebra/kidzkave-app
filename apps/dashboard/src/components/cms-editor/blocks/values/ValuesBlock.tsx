import { renderDynamicIcon } from '../utils'
import { useThemeClasses } from '../../useThemeClasses'

export function ValuesBlock({ content }: { content: any }) {
  const { primary, primaryWithOpacity } = useThemeClasses()

  return (
    <div className="py-20 px-12 bg-white">
      <div className="text-center mb-16">
        <div className="font-bold text-xs uppercase tracking-widest mb-2" style={{ color: primary }}>{content.tagline}</div>
        <h2 className="text-4xl font-black text-slate-900">{content.title}</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
        {content.items?.map((item: any, i: number) => (
          <div key={i} className="text-center p-6 space-y-4 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto" style={{ backgroundColor: primaryWithOpacity(0.1), color: primary }}>
              {renderDynamicIcon(item.icon || 'heart', 'h-8 w-8')}
            </div>
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm text-slate-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
