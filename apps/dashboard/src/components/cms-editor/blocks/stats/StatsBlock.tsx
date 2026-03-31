// Stats grid rendering for the editor canvas
import { useThemeClasses } from '../../useThemeClasses'

export function StatsBlock({ content }: { content: any }) {
  const { primary, primaryWithOpacity } = useThemeClasses()

  return (
    <div className="py-16 px-12 text-white mx-8 rounded-3xl grid grid-cols-4 gap-8 text-center shadow-xl" style={{ backgroundColor: primary, boxShadow: `0 25px 50px -12px ${primaryWithOpacity(0.2)}` }}>
      {content.items?.map((item: any, i: number) => (
        <div key={i}>
          <div className="text-3xl font-black mb-1">{item.value}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
