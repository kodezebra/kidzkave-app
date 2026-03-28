import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { useToast } from '@/components/ui/toast'
import {
  MessageCircle,
  Phone,
  CheckCircle,
  Loader2,
  Inbox,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Trash2,
  Clock,
  MapPin,
  Copy,
  Check
} from 'lucide-react'
import { getWhatsAppLeads, updateWhatsAppLead, deleteWhatsAppLead, type WhatsAppLead } from '@/lib/api'

export const Route = createFileRoute('/_dashboard/whatsapp-leads')({
  component: WhatsAppLeadsPage,
})

const inquiryTypeLabels: Record<string, { label: string; emoji: string }> = {
  admissions: { label: 'Admissions', emoji: '📚' },
  fees: { label: 'Fees', emoji: '💰' },
  tour: { label: 'Tour', emoji: '🏫' },
  general: { label: 'General', emoji: '💬' }
}

const statusConfig: Record<string, { label: string; color: string; next: string }> = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200', next: 'contacted' },
  contacted: { label: 'Contacted', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-amber-200', next: 'converted' },
  converted: { label: 'Converted', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200', next: 'new' }
}

function formatRelativeTime(date: string): string {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return then.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function LeadCard({ lead }: { lead: WhatsAppLead }) {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      updateWhatsAppLead(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp-leads'] })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteWhatsAppLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp-leads'] })
      toast({ title: 'Lead deleted', variant: 'success' })
    }
  })

  const cycleStatus = () => {
    const next = statusConfig[lead.status].next
    updateMutation.mutate({ id: lead.id, status: next })
  }

  const copyMessage = () => {
    navigator.clipboard.writeText(lead.message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const phoneNumber = lead.phone?.replace(/\D/g, '') || ''

  return (
    <Card className={`transition-all ${lead.status === 'new' ? 'border-l-4 border-l-blue-500' : ''}`}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Clickable Status Badge */}
              <button
                onClick={cycleStatus}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[lead.status].color} hover:opacity-80 transition-opacity cursor-pointer`}
                title="Click to change status"
              >
                {statusConfig[lead.status].label}
              </button>
              
              {/* Inquiry Type */}
              <span className="text-sm">
                {inquiryTypeLabels[lead.inquiryType].emoji} {inquiryTypeLabels[lead.inquiryType].label}
              </span>
              
              {/* Time */}
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatRelativeTime(lead.createdAt)}
              </span>
            </div>
          </div>

          {/* Phone & Actions Row */}
          <div className="flex items-center gap-2 flex-wrap">
            {lead.phone ? (
              <>
                <a 
                  href={`tel:${lead.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {lead.phone}
                </a>
                <a 
                  href={`https://wa.me/${phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 text-[#25D366] rounded-full text-sm font-medium hover:bg-[#25D366]/20 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </>
            ) : (
              <span className="text-xs text-muted-foreground italic">No phone provided</span>
            )}
          </div>

          {/* Message Section */}
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">Message</span>
              <button
                onClick={copyMessage}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className={`text-sm ${expanded ? '' : 'line-clamp-2'}`}>
              {lead.message}
            </p>
            {lead.message.length > 150 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-primary hover:underline mt-1 flex items-center gap-1"
              >
                {expanded ? (
                  <>
                    <ChevronUp className="h-3 w-3" /> Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3" /> Show more
                  </>
                )}
              </button>
            )}
          </div>

          {/* Source & Delete Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              From: <span className="font-mono">{lead.sourcePage || '/'}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm('Delete this lead? This cannot be undone.')) {
                  deleteMutation.mutate(lead.id)
                }
              }}
              className="text-muted-foreground hover:text-destructive h-7 px-2"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function WhatsAppLeadsPage() {
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined)

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['whatsapp-leads', statusFilter],
    queryFn: () => getWhatsAppLeads(statusFilter)
  })

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <Breadcrumb items={[
          { label: 'Settings', href: '/settings' },
          { label: 'WhatsApp Leads' }
        ]} />
        <h1 className="text-3xl font-bold mt-2">WhatsApp Leads</h1>
        <p className="text-muted-foreground mt-1">Track and manage inquiries from your WhatsApp button</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === undefined ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setStatusFilter(undefined)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-muted-foreground/40" />
            </div>
          </CardContent>
        </Card>
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === 'new' ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => setStatusFilter('new')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">New</p>
                <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
              </div>
              <Inbox className="h-8 w-8 text-blue-500/40" />
            </div>
          </CardContent>
        </Card>
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === 'contacted' ? 'ring-2 ring-amber-500' : ''}`}
          onClick={() => setStatusFilter('contacted')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600 font-medium">Contacted</p>
                <p className="text-2xl font-bold text-amber-600">{stats.contacted}</p>
              </div>
              <Phone className="h-8 w-8 text-amber-500/40" />
            </div>
          </CardContent>
        </Card>
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${statusFilter === 'converted' ? 'ring-2 ring-green-500' : ''}`}
          onClick={() => setStatusFilter('converted')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Converted</p>
                <p className="text-2xl font-bold text-green-600">{stats.converted}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500/40" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips (show when no leads) */}
      {leads.length === 0 && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-100">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              Getting Started with WhatsApp Leads
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0">1</span>
                <p>Go to <strong>Settings &gt; Marketing</strong> to add your WhatsApp number</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0">2</span>
                <p>A floating WhatsApp button will appear on your website</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0">3</span>
                <p>When visitors click it, their inquiry is saved here automatically</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter hint */}
      {statusFilter && leads.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <strong>{statusConfig[statusFilter].label.toLowerCase()}</strong> leads
          </p>
          <Button variant="ghost" size="sm" onClick={() => setStatusFilter(undefined)}>
            Clear filter
          </Button>
        </div>
      )}

      {/* Leads List */}
      {leads.length === 0 && statusFilter && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="h-12 w-12 text-green-500/40 mb-4" />
            <h3 className="font-medium text-lg mb-1">No {statusConfig[statusFilter].label.toLowerCase()} leads</h3>
            <p className="text-muted-foreground text-sm text-center">
              All caught up! No leads with this status.
            </p>
          </CardContent>
        </Card>
      )}

      {leads.length > 0 && (
        <div className="space-y-3">
          {leads.map((lead: WhatsAppLead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  )
}
