import { IconSvg } from '../utils'

export const Navbar = ({ content, settings }: { content: any; settings?: any }) => {
  const logoText = content.logoText || settings?.logoText || "KZ Cloud"
  const logoIcon = content.logoIcon || settings?.logoIcon || "layout"
  const logoType = content.logoType || settings?.logoType || "icon"
  const logoImage = content.logoImage || settings?.logoImage || ""
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            {logoType === 'image' && logoImage ? (
              <img src={logoImage} alt={logoText} className="h-9 w-auto object-contain" />
            ) : (
              <IconSvg icon={logoIcon} className="text-primary w-12 h-12" />
            )}
            <span className="text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
              {logoText}
            </span>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-8">
              {content.links?.map((link: any, index: number) => (
                link.children && link.children.length > 0 ? (
                  <div key={link.label} className="relative">
                    <button 
                      className="flex items-center gap-1 text-base font-medium hover:text-primary transition-colors py-6"
                      onclick={`document.getElementById('dropdown-${index}').classList.toggle('hidden'); document.getElementById('dropdown-${index}').classList.toggle('block')`}
                    >
                      {link.label}
                      <IconSvg icon="chevron-down" className="text-base" />
                    </button>
                    <div id={`dropdown-${index}`} className="hidden absolute top-full left-0 mt-2 w-56 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50">
                      {link.children.map((child: any) => (
                        <a 
                          key={child.label} 
                          href={child.href}
                          className="block px-4 py-2.5 text-base text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 whitespace-nowrap"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a key={link.label} href={link.href} className="text-base font-medium hover:text-primary transition-colors py-6">
                    {link.label}
                  </a>
                )
              ))}
              <button 
                onclick="window.toggleTheme()"
                className="p-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors cursor-pointer flex-shrink-0"
                title="Toggle Theme"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" className="hidden dark:block w-5 h-5">
                  <g fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="6"/>
                    <path stroke-linecap="round" d="M12 2v1m0 18v1m10-10h-1M3 12H2"/>
                    <path stroke-linecap="round" d="m19.07 4.93l-.392.393M5.322 18.678l-.393.393m14.141-.001l-.392-.393M5.322 5.322l-.393-.393" opacity="0.5"/>
                  </g>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" className="block dark:hidden w-5 h-5">
                  <path d="M21 12.808c-.5 5.347-5.849 9.14-11.107 7.983C-.078 18.6 1.15 3.909 11.11 3C6.395 9.296 14.619 17.462 21 12.808"/>
                </svg>
              </button>
              {content.cta && (
                <a
                  href={content.cta.href}
                  className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:brightness-110 hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  {content.cta.label}
                </a>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button 
              onclick="window.toggleTheme()"
              className="p-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors cursor-pointer flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" className="hidden dark:block w-5 h-5">
                <g fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="6"/>
                  <path stroke-linecap="round" d="M12 2v1m0 18v1m10-10h-1M3 12H2"/>
                  <path stroke-linecap="round" d="m19.07 4.93l-.392.393M5.322 18.678l-.393.393m14.141-.001l-.392-.393M5.322 5.322l-.393-.393" opacity="0.5"/>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" className="block dark:hidden w-5 h-5">
                <path d="M21 12.808c-.5 5.347-5.849 9.14-11.107 7.983C-.078 18.6 1.15 3.909 11.11 3C6.395 9.296 14.619 17.462 21 12.808"/>
              </svg>
            </button>
            <button 
              id="mobile-menu-button"
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              onclick="document.getElementById('mobile-menu').classList.toggle('hidden')"
            >
              <IconSvg icon="menu" className="w-10 h-10" />
            </button>
          </div>
        </div>
      </div>
      
      <div id="mobile-menu" className="hidden md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-in slide-in-from-top duration-300">
        <div className="px-4 pt-2 pb-6 space-y-1">
          {content.links?.map((link: any, index: number) => (
            <div key={link.label}>
              {link.children && link.children.length > 0 ? (
                <div>
                  <button 
                    className="flex items-center justify-between w-full px-3 py-4 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
                    onclick={`document.getElementById('mobile-dropdown-${index}').classList.toggle('hidden')`}
                  >
                    {link.label}
                    <IconSvg icon="chevron-down" className="w-5 h-5" />
                  </button>
                  <div id={`mobile-dropdown-${index}`} className="hidden pl-4 space-y-1">
                    {link.children.map((child: any) => (
                      <a 
                        key={child.label}
                        href={child.href} 
                        className="block px-3 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a 
                  href={link.href} 
                  className="block px-3 py-4 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
                >
                  {link.label}
                </a>
              )}
            </div>
          ))}
          {content.cta && (
            <div className="pt-4 px-3">
              <a
                href={content.cta.href}
                className="block w-full text-center bg-primary text-white px-6 py-3.5 rounded-xl text-base font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
              >
                {content.cta.label}
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
