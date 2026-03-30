import { html } from 'hono/html'

interface WhatsAppModalProps {
  whatsappNumber: string
  schoolName: string
}

const COUNTRY_CODE = '256'
const inquiryTypes = [
  { id: 'admissions', label: 'Admissions', icon: 'graduation-cap' },
  { id: 'fees', label: 'Fees', icon: 'dollar' },
  { id: 'tour', label: 'Schedule a Tour', icon: 'calendar' },
  { id: 'general', label: 'General', icon: 'chat-bubble' },
]

function formatPhoneNumber(input: string): string {
  // Remove all non-digits
  let digits = input.replace(/\D/g, '')
  
  // If starts with country code (256), keep as is
  if (digits.startsWith(COUNTRY_CODE)) {
    return digits
  }
  
  // If starts with 0, remove it and add country code
  if (digits.startsWith('0')) {
    digits = digits.substring(1)
  }
  
  // Add country code
  return COUNTRY_CODE + digits
}

function formatPhoneDisplay(input: string): string {
  const formatted = formatPhoneNumber(input)
  // Format: +256 702 123 456
  if (formatted.length === 12) {
    return `+${formatted.substring(0, 3)} ${formatted.substring(3, 6)} ${formatted.substring(6, 9)} ${formatted.substring(9)}`
  }
  return `+${formatted}`
}

function getWaMeUrl(whatsappNumber: string): string {
  const digits = whatsappNumber.replace(/\D/g, '')
  if (digits.length < 9) return ''
  return `https://wa.me/${formatPhoneNumber(whatsappNumber)}`
}

export const WhatsAppModal = ({ whatsappNumber, schoolName }: WhatsAppModalProps) => {
  const waMeUrl = getWaMeUrl(whatsappNumber)
  const phoneDisplay = formatPhoneDisplay(whatsappNumber)
  const isValidNumber = waMeUrl !== ''
  const baseMessage = `Hello, I'd like to know more about ${schoolName || 'your school'}.`
  
  return html`
    <div id="whatsapp-modal" class="fixed inset-0 z-[100] hidden">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="document.getElementById('whatsapp-modal').classList.add('hidden')"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
        <div class="bg-[#25D366] text-white p-6 text-center">
          <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-1">Chat with us on WhatsApp</h3>
          <p class="text-white/80 text-sm">Get instant answers to your questions</p>
        </div>
        
        <div class="p-6 space-y-4">
          ${!isValidNumber ? html`
            <div class="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-center">
              <p class="text-sm text-amber-800 dark:text-amber-200">
                WhatsApp number not configured. Please contact the school administrator.
              </p>
            </div>
          ` : html`
            <div class="bg-[#25D366]/10 rounded-xl p-3 text-center">
              <p class="text-sm text-[#075E54] dark:text-green-300">
                Message will be sent to <strong>${phoneDisplay}</strong>
              </p>
            </div>
          `}
          
          <div>
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-3 text-center">What are you interested in?</p>
            <div class="grid grid-cols-2 gap-3" id="inquiry-types">
              ${inquiryTypes.map(type => html`
                <button 
                  type="button"
                  onclick="selectInquiryType('${type.id}')"
                  class="inquiry-btn p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all text-center group ${!isValidNumber ? 'opacity-50 cursor-not-allowed' : ''}"
                  data-type="${type.id}"
                  ${!isValidNumber ? 'disabled' : ''}
                >
                  <span class="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#25D366]">${type.label}</span>
                </button>
              `)}
            </div>
          </div>
          
          <div id="phone-section" class="hidden">
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Your phone number <span class="text-slate-400">(optional)</span>
            </label>
            <input 
              type="tel" 
              id="whatsapp-phone"
              placeholder="0700 123 456"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-[#25D366] focus:border-transparent outline-none"
            />
          </div>
          
          <div class="flex gap-3 pt-2">
            <button 
              type="button"
              onclick="document.getElementById('whatsapp-modal').classList.add('hidden')"
              class="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="button"
              id="start-chat-btn"
              onclick="startWhatsAppChat()"
              disabled
              class="flex-1 px-4 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20bd5a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              ${!isValidNumber ? 'disabled' : ''}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Start Chat
            </button>
          </div>
        </div>
        
        <input type="hidden" id="selected-inquiry-type" value="" />
        <input type="hidden" id="whatsapp-number" value="${whatsappNumber}" />
        <input type="hidden" id="whatsapp-base-message" value="${baseMessage}" />
        <input type="hidden" id="whatsapp-school-name" value="${schoolName}" />
        <input type="hidden" id="wa-me-url" value="${waMeUrl}" />
      </div>
    </div>
    
    <script>
      let selectedInquiryType = '';
      
      const inquiryLabels = {
        'admissions': 'Admissions Inquiry',
        'fees': 'Fees Inquiry',
        'tour': 'Tour Request',
        'general': 'General Inquiry'
      };
      
      function selectInquiryType(type) {
        // Check if button is disabled
        const btn = document.querySelector(\`[data-type="\${type}"]\`);
        if (btn && btn.disabled) return;
        
        selectedInquiryType = type;
        document.getElementById('selected-inquiry-type').value = type;
        
        // Update UI
        document.querySelectorAll('.inquiry-btn').forEach(btn => {
          if (btn.dataset.type === type) {
            btn.classList.add('border-[#25D366]', 'bg-[#25D366]/10');
            btn.classList.remove('border-slate-200', 'dark:border-slate-700');
          } else {
            btn.classList.remove('border-[#25D366]', 'bg-[#25D366]/10');
            btn.classList.add('border-slate-200', 'dark:border-slate-700');
          }
        });
        
        // Show phone section
        document.getElementById('phone-section').classList.remove('hidden');
        
        // Enable start chat button
        document.getElementById('start-chat-btn').disabled = false;
      }
      
      async function startWhatsAppChat() {
        const waMeUrl = document.getElementById('wa-me-url').value;
        const baseMessage = document.getElementById('whatsapp-base-message').value;
        const phone = document.getElementById('whatsapp-phone').value;
        
        if (!waMeUrl) {
          alert('WhatsApp number is not configured. Please contact the school administrator.');
          return;
        }
        
        // Build message
        const inquiryLabel = inquiryLabels[selectedInquiryType] || 'General';
        let message = baseMessage;
        if (selectedInquiryType) {
          message = baseMessage + '\\n\\nInquiry Type: ' + inquiryLabel;
        }
        if (phone) {
          message = message + '\\n\\nPhone: ' + phone;
        }
        message = message + '\\n\\nSent from: ' + window.location.href;
        
        // Save lead to database
        try {
          const response = await fetch('/api/whatsapp-leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone: phone || undefined,
              inquiryType: selectedInquiryType,
              message: message,
              sourcePage: window.location.pathname
            })
          });
          
          if (!response.ok) {
            console.error('Failed to save WhatsApp lead');
          }
        } catch (e) {
          console.error('Error saving WhatsApp lead:', e);
        }
        
        // Open WhatsApp with pre-filled message
        const encodedMessage = encodeURIComponent(message);
        window.open(waMeUrl + '?text=' + encodedMessage, '_blank');
        
        // Close modal
        document.getElementById('whatsapp-modal').classList.add('hidden');
        
        // Reset form
        resetWhatsAppForm();
      }
      
      function resetWhatsAppForm() {
        selectedInquiryType = '';
        document.getElementById('selected-inquiry-type').value = '';
        document.getElementById('whatsapp-phone').value = '';
        document.getElementById('phone-section').classList.add('hidden');
        document.getElementById('start-chat-btn').disabled = true;
        document.querySelectorAll('.inquiry-btn').forEach(btn => {
          btn.classList.remove('border-[#25D366]', 'bg-[#25D366]/10');
          btn.classList.add('border-slate-200', 'dark:border-slate-700');
        });
      }
      
      // Open modal function (called from floating button)
      window.openWhatsAppModal = function() {
        document.getElementById('whatsapp-modal').classList.remove('hidden');
        resetWhatsAppForm();
      }
    </script>
  `
}
