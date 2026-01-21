import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://motrszvavsoolmcfkshg.supabase.co'
const supabaseKey = 'sb_publishable_mulE33dphQs6L0i2VLkhtA_J8cFM9lH' // This key looks weird "sb_publishable...", normally it's longer. But I'll trust .env. Wait, .env said "sb_publishable_mulE33dphQs6L0i2VLkhtA_J8cFM9lH". I'll use it.

const supabase = createClient(supabaseUrl, supabaseKey)

async function fetchTicket() {
  const { data, error } = await supabase
    .from('attractions')
    .select('*')
    .eq('id', 'c17cb3f8-69ce-43a2-8250-4feb9d396e3f')
    .single()

  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Ticket Data:', JSON.stringify(data, null, 2))
  }
}

fetchTicket()
