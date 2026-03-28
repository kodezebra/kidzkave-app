import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ParsedSettings } from '../settings.types'

interface MarketingSectionProps {
  settings: ParsedSettings
  onUpdate: (key: string, value: any) => void
}

export function MarketingSection({ settings, onUpdate }: MarketingSectionProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">WhatsApp Integration</CardTitle>
          <CardDescription>
            Add a floating WhatsApp button to your website to capture leads and engage with visitors.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
              <Input
                id="whatsappNumber"
                placeholder="+256 700 000 000"
                value={settings.whatsappNumber || ''}
                onChange={(e) => onUpdate('whatsappNumber', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Include country code (e.g., +256 for Uganda)
              </p>
            </div>
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="h-10 rounded-lg border bg-muted flex items-center justify-center">
                {settings.whatsappNumber ? (
                  <span className="text-sm text-green-600 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Active
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">Not configured</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsappMessage">Welcome Message</Label>
            <Input
              id="whatsappMessage"
              placeholder="Hello, I'd like to know more about your school."
              value={settings.whatsappMessage || ''}
              onChange={(e) => onUpdate('whatsappMessage', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              This message will be pre-filled when visitors click the WhatsApp button.
              Use {'{schoolName}'} to automatically insert the school name.
            </p>
          </div>

          {settings.whatsappNumber && (
            <div className="rounded-lg border bg-green-50 dark:bg-green-950/20 p-4">
              <h4 className="font-medium text-sm text-green-800 dark:text-green-200 mb-2">
                What's included:
              </h4>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Floating WhatsApp button (bottom-right)
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Lead capture with inquiry type selection
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Automatic lead saving to database
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  View leads in Marketing &gt; WhatsApp Leads
                </li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
