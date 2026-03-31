import { Icon } from '@iconify/react'
import { useState } from 'react'
import type { VideoItem } from '../../types'
import { useThemeClasses } from '../../useThemeClasses'

type LayoutMode = 'compact' | 'standard' | 'list'

export function VideoGalleryBlock({ content }: { content: any }) {
  const { primary } = useThemeClasses()
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [tiktokFailed, setTiktokFailed] = useState<Record<number, boolean>>({})
  const items = (content.items || []) as VideoItem[]
  const layout = (content.layout || 'compact') as LayoutMode

  const handlePlay = (index: number, item: VideoItem) => {
    if (item.platform === 'tiktok') {
      window.open(item.url, '_blank')
    } else {
      setPlayingIndex(index)
    }
  }

  const handleClose = () => {
    setPlayingIndex(null)
    setTiktokFailed({})
  }

  const handleTikTokFallback = (url: string) => {
    window.open(url, '_blank')
  }

  const gridClass = {
    compact: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4',
    standard: 'grid grid-cols-2 gap-6 sm:gap-8',
    list: 'grid grid-cols-1 gap-4',
  }[layout]

  const cardClass = {
    compact: 'aspect-video rounded-xl overflow-hidden',
    standard: 'aspect-video rounded-3xl',
    list: 'flex gap-4 aspect-video rounded-xl overflow-hidden',
  }[layout]

  const titlePosition = {
    compact: 'below',
    standard: 'overlay',
    list: 'right',
  }[layout]

  return (
    <div className="py-20 px-12 bg-white">
      <div className="text-center mb-16">
        <div className="font-bold text-xs uppercase tracking-widest mb-2" style={{ color: primary }}>{content.tagline}</div>
        <h2 className="text-4xl font-black text-slate-900">{content.title}</h2>
      </div>
      <div className={gridClass}>
        {items.map((item: VideoItem, i: number) => {
          const isPlaying = playingIndex === i
          const showFallback = tiktokFailed[i]
          const isPortrait = item.platform === 'tiktok'
          const aspectClass = isPortrait ? 'aspect-[9/16] max-h-[80vh]' : 'aspect-video'

          const renderCard = () => (
            <>
              {!isPlaying && !showFallback ? (
                <>
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt="" className={`w-full object-cover ${layout === 'compact' ? 'opacity-70 group-hover:opacity-80' : 'opacity-60 group-hover:scale-105'} transition-all`} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">
                      {item.platform === 'tiktok' ? 'TikTok Video' : 'YouTube Video'}
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {item.platform === 'tiktok' ? (
                      <button
                        onClick={() => handlePlay(i, item)}
                        className="flex items-center gap-2 px-5 py-3 bg-slate-900/90 backdrop-blur-md rounded-full border border-slate-700 cursor-pointer hover:bg-slate-800 hover:scale-105 transition-all shadow-xl"
                      >
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.10z"/>
                        </svg>
                        <span className="text-white font-semibold text-sm">Watch on TikTok</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePlay(i, item)}
                        className={`bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform cursor-pointer ${
                          layout === 'compact' ? 'w-10 h-10' : 'w-16 h-16'
                        }`}
                      >
                        <Icon icon="ph:play-fill" className={`text-slate-900 ${layout === 'compact' ? 'w-4 h-4 ml-0.5' : 'h-6 w-6 ml-1'}`} />
                      </button>
                    )}
                  </div>
                  {titlePosition === 'overlay' && (
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white font-bold text-lg">{item.title}</h3>
                    </div>
                  )}
                </>
              ) : isPlaying && item.platform !== 'tiktok' ? (
                <>
                  <iframe
                    className="w-full h-full"
                    src={item.embedUrl || ''}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </>
              ) : showFallback ? (
                <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-8 h-8 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.10z"/>
                      </svg>
                    </div>
                    <p className="text-white font-medium mb-2">Unable to embed video</p>
                    <button
                      onClick={() => handleTikTokFallback(item.url)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-full transition-colors"
                    >
                      <Icon icon="ph:arrow-square-out" className="h-4 w-4" />
                      Watch on TikTok
                    </button>
                    <button
                      onClick={handleClose}
                      className="block mx-auto mt-3 text-slate-400 hover:text-white text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          )

          if (layout === 'list') {
            return (
              <div key={item.id || i} className="flex gap-4 bg-slate-900 rounded-xl overflow-hidden group">
                <div className={`${aspectClass} min-w-[200px] relative overflow-hidden`}>
                  {renderCard()}
                </div>
                <div className="flex-1 p-4 flex flex-col justify-center">
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  <p className="text-white/60 text-sm mt-1">{item.platform === 'tiktok' ? 'TikTok' : 'YouTube'}</p>
                </div>
              </div>
            )
          }

          return (
            <div key={item.id || i} className={`${cardClass} bg-slate-900 relative overflow-hidden group`}>
              {renderCard()}
              {(titlePosition === 'below' || titlePosition === 'right') && (
                <div className="p-2 sm:p-3">
                  <h3 className="text-slate-900 dark:text-white font-semibold text-sm line-clamp-2">{item.title}</h3>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
