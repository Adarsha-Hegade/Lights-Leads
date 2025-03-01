/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SMTP2GO_API_KEY: string
  readonly SMTP2GO_USER: string
  readonly SMTP2GO_PASS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}