import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { useToast } from '@/components/ui/toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  MoreVertical,
  MessageCircle,
  Phone,
  Eye,
  CheckCircle,
  Loader2,
  Inbox
} from 'lucide-react'
import { getWhatsAppLeads, updateWhatsAppLead, deleteWhatsAppLead, type WhatsAppLead } from '@/lib/api'

export const Route = createFileRoute('/_dashboard/whatsapp-leads')({
  component: WhatsAppLeadsPage,
})

const inquiryTypeLabels: Record<string, string> = {
  admissions: 'Admissions',
  fees: 'Fees',
  tour: 'Tour',
  general: 'General'
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  contacted: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  converted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
}

const statusLabels: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  converted: 'Converted'
}

function WhatsAppLeadsPage() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined)

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['whatsapp-leads', statusFilter],
    queryFn: () => getWhatsAppLeads(statusFilter)
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      updateWhatsAppLead(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp-leads'] })
      toast({ title: 'Status updated', variant: 'success' })
    },
    onError: () => {
      toast({ title: 'Failed to update status', variant: 'error' })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteWhatsAppLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp-leads'] })
      toast({ title: 'Lead deleted', variant: 'success' })
    },
    onError: () => {
      toast({ title: 'Failed to delete lead', variant: 'error' })
    }
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
    <div className="space-y-6">
      <div>
        <Breadcrumb items={[
          { label: 'Settings', href: '/settings' },
          { label: 'WhatsApp Leads' }
        ]} />
        <h1 className="text-3xl font-bold mt-2">WhatsApp Leads</h1>
        <p className="text-muted-foreground mt-1">Track and manage inquiries from your WhatsApp button</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
            <Inbox className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contacted</CardTitle>
            <Phone className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.contacted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Converted</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.converted}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        <Button
          variant={statusFilter === undefined ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter(undefined)}
        >
          All
        </Button>
        <Button
          variant={statusFilter === 'new' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter('new')}
        >
          New
        </Button>
        <Button
          variant={statusFilter === 'contacted' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter('contacted')}
        >
          Contacted
        </Button>
        <Button
          variant={statusFilter === 'converted' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setStatusFilter('converted')}
        >
          Converted
        </Button>
      </div>

      {/* Leads list */}
      {leads.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageCircle className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="font-medium text-lg mb-1">No leads yet</h3>
            <p className="text-muted-foreground text-sm text-center max-w-sm">
              WhatsApp leads will appear here once visitors start using the chat button on your website.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {leads.map((lead: WhatsAppLead) => (
            <Card key={lead.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={statusColors[lead.status]}>
                        {statusLabels[lead.status]}
                      </Badge>
                      <Badge variant="secondary">
                        {inquiryTypeLabels[lead.inquiryType]}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    
                    {lead.phone && (
                      <div className="flex items-center gap-2 text-sm mb-1">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{lead.phone}</span>
                      </div>
                    )}
                    
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {lead.message}
                    </p>
                    
                    <div className="text-xs text-muted-foreground">
                      From: <span className="font-mono">{lead.sourcePage || '/'}</span>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {lead.status === 'new' && (
                        <DropdownMenuItem onClick={() => updateMutation.mutate({ id: lead.id, status: 'contacted' })}>
                          <Eye className="h-4 w-4 mr-2" />
                          Mark as Contacted
                        </DropdownMenuItem>
                      )}
                      {lead.status !== 'converted' && (
                        <DropdownMenuItem onClick={() => updateMutation.mutate({ id: lead.id, status: 'converted' })}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Converted
                        </DropdownMenuItem>
                      )}
                      {lead.status === 'converted' && (
                        <DropdownMenuItem onClick={() => updateMutation.mutate({ id: lead.id, status: 'contacted' })}>
                          <Eye className="h-4 w-4 mr-2" />
                          Mark as Contacted
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => {
                          if (confirm('Delete this lead?')) {
                            deleteMutation.mutate(lead.id)
                          }
                        }}
                        className="text-destructive"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
