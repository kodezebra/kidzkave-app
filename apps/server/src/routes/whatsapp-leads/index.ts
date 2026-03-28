import { Hono } from 'hono'
import { getDb } from '@/lib/db'
import { eq, desc } from 'drizzle-orm'
import { whatsappLeads } from '@/db/schema'
import { z } from 'zod'
import { authMiddleware, requireRole } from '@/middleware/auth'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

const inquiryTypes = ['admissions', 'fees', 'tour', 'general'] as const
const statuses = ['new', 'contacted', 'converted'] as const

// Schema for public POST
const leadSchema = z.object({
  phone: z.string().optional(),
  inquiryType: z.enum(inquiryTypes),
  message: z.string().min(1, 'Message is required'),
  sourcePage: z.string().min(1, 'Source page is required'),
})

// 1. PUBLIC: Create WhatsApp Lead
app.post('/', async (c) => {
  const db = getDb(c)
  
  try {
    const body = await c.req.json()
    const validation = leadSchema.safeParse(body)
    
    if (!validation.success) {
      return c.json({ error: 'Validation failed', details: validation.error.format() }, 400)
    }

    const { phone, inquiryType, message, sourcePage } = validation.data

    const [newLead] = await db.insert(whatsappLeads).values({
      phone: phone || null,
      inquiryType,
      message,
      sourcePage,
    }).returning()

    return c.json({ 
      success: true, 
      id: newLead.id 
    })
  } catch (e) {
    console.error('WhatsApp lead error:', e)
    return c.json({ error: 'Failed to save lead' }, 500)
  }
})

// --- ADMIN ROUTES (require auth) ---
app.use('/*', authMiddleware)

// 2. ADMIN: List all leads
app.get('/', requireRole('owner', 'admin'), async (c) => {
  const db = getDb(c)
  const status = c.req.query('status')
  
  if (status && statuses.includes(status as typeof statuses[number])) {
    const results = await db.select()
      .from(whatsappLeads)
      .where(eq(whatsappLeads.status, status as typeof statuses[number]))
      .orderBy(desc(whatsappLeads.createdAt))
    return c.json(results)
  }
  
  const results = await db.select()
    .from(whatsappLeads)
    .orderBy(desc(whatsappLeads.createdAt))
  return c.json(results)
})

// 3. ADMIN: Update lead status
app.patch('/:id', requireRole('owner', 'admin'), async (c) => {
  const id = c.req.param('id')
  const { status } = await c.req.json()

  if (!statuses.includes(status)) {
    return c.json({ error: 'Invalid status' }, 400)
  }

  const db = getDb(c)
  const [updated] = await db.update(whatsappLeads)
    .set({ status })
    .where(eq(whatsappLeads.id, id))
    .returning()

  if (!updated) return c.notFound()
  return c.json(updated)
})

// 4. ADMIN: Delete a lead
app.delete('/:id', requireRole('owner', 'admin'), async (c) => {
  const id = c.req.param('id')
  const db = getDb(c)
  
  const deleted = await db.delete(whatsappLeads)
    .where(eq(whatsappLeads.id, id))
    .returning()

  if (deleted.length === 0) return c.notFound()
  return c.json({ success: true })
})

export default app
