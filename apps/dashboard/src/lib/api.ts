import { API_URL } from '@/config';

export async function apiFetch(path: string, options: RequestInit = {}) {
  const baseUrl = API_URL.replace(/\/+$/, '');
  const cleanPath = path.replace(/^\/+/, '');
  const url = path.startsWith('http') ? path : `${baseUrl}/${cleanPath}`;
  
  const headers: any = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: options.credentials || 'include',
  });

  return response;
}

export interface WhatsAppLead {
  id: string
  phone: string | null
  inquiryType: 'admissions' | 'fees' | 'tour' | 'general'
  message: string
  sourcePage: string
  status: 'new' | 'contacted' | 'converted'
  createdAt: string
}

export async function getWhatsAppLeads(status?: string): Promise<WhatsAppLead[]> {
  const url = status ? `whatsapp-leads?status=${status}` : 'whatsapp-leads'
  const res = await apiFetch(url)
  if (!res.ok) throw new Error('Failed to fetch WhatsApp leads')
  return res.json()
}

export async function updateWhatsAppLead(id: string, status: string): Promise<WhatsAppLead> {
  const res = await apiFetch(`whatsapp-leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Failed to update lead')
  return res.json()
}

export async function deleteWhatsAppLead(id: string): Promise<void> {
  const res = await apiFetch(`whatsapp-leads/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete lead')
}
