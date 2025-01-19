import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database.types'

// Valores por defecto para desarrollo local
const supabaseUrl = 'https://xyzcompany.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true
    }
  }
)