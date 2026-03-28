import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Building2, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import type { ParsedSettings } from '../settings.types'

interface SchoolSectionProps {
  settings: ParsedSettings
  onUpdate: (key: keyof ParsedSettings | Partial<ParsedSettings>, value?: unknown) => void
}

export function SchoolSection({ settings, onUpdate }: SchoolSectionProps) {
  const whatsappEnabled = settings.whatsappEnabled ?? false

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Building2 className="h-5 w-5" />
          School Information
        </CardTitle>
        <CardDescription>Basic details about your school for reports and public site</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="schoolName">School Name</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="schoolName"
                value={settings.schoolName}
                onChange={(e) => onUpdate('schoolName', e.target.value)}
                placeholder="Your School Name"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="schoolEmail">School Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="schoolEmail"
                type="email"
                value={settings.schoolEmail}
                onChange={(e) => onUpdate('schoolEmail', e.target.value)}
                placeholder="info@school.edu"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="schoolPhone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="schoolPhone"
                type="tel"
                value={settings.schoolPhone}
                onChange={(e) => onUpdate('schoolPhone', e.target.value)}
                placeholder="0700 123 456"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="schoolAddress">Physical Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="schoolAddress"
                value={settings.schoolAddress}
                onChange={(e) => onUpdate('schoolAddress', e.target.value)}
                placeholder="123 School Street, City"
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            WhatsApp Integration
          </h3>
          
          <div className="flex items-center justify-between mb-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="whatsappEnabled" className="text-base cursor-pointer">
                Enable WhatsApp Chat
              </Label>
              <p className="text-sm text-muted-foreground">
                Show WhatsApp chat button on your website
              </p>
            </div>
            <Switch
              id="whatsappEnabled"
              checked={whatsappEnabled}
              onCheckedChange={(checked) => onUpdate('whatsappEnabled', checked)}
            />
          </div>

          <div className={`space-y-4 ${!whatsappEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <Input
                    id="whatsappNumber"
                    type="tel"
                    value={settings.whatsappNumber}
                    onChange={(e) => onUpdate('whatsappNumber', e.target.value)}
                    placeholder="0700 123 456"
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Leave empty to use phone number above. Country code +256 is added automatically.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappMessage">Welcome Message</Label>
                <Textarea
                  id="whatsappMessage"
                  value={settings.whatsappMessage}
                  onChange={(e) => onUpdate('whatsappMessage', e.target.value)}
                  placeholder={`Hello, I'd like to know more about ${settings.schoolName || 'your school'}.`}
                  rows={3}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  This message is pre-filled when visitors click the WhatsApp button.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
