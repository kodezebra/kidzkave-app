// Hero section rendering on the editor canvas
import { useThemeClasses } from '../../useThemeClasses'

export function HeroBlock({ content }: { content: any }) {
  const { primary, primaryWithOpacity, accent } = useThemeClasses()

  return (
    <div 
      className="text-center py-20 px-12 space-y-8 relative overflow-hidden mx-8 my-12 rounded-3xl text-white"
      style={content.image ? { 
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('${content.image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : { 
        backgroundColor: primary,
        background: `linear-gradient(to bottom right, ${primaryWithOpacity(0.85)}, ${primary})`
      }}
    >
      {!content.image && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl -z-10 opacity-30" style={{ backgroundColor: accent }}></div>
      )}
      
      <div className="relative z-10">
        {content.badge && (
          <div className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold tracking-wider uppercase" style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span>{content.badge}</span>
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
          {content.title}
        </h1>
        <p className="text-xl max-w-2xl mx-auto leading-relaxed mt-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
          {content.subtitle}
        </p>
        <div className="flex justify-center gap-4 pt-6">
          <div className="text-white px-8 py-4 rounded-2xl font-bold shadow-xl" style={{ backgroundColor: accent, boxShadow: `0 10px 25px -5px ${accent}50` }}>
            {content.primaryCta?.label}
          </div>
          {content.secondaryCta?.label && (
            <div className="bg-white px-8 py-4 rounded-2xl font-bold shadow-xl" style={{ color: primary }}>
              {content.secondaryCta?.label}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
