/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_HTTP_BASIC_USER: string;
  readonly VITE_HTTP_BASIC_PASS: string;
  readonly VITE_USER: string;
  readonly VITE_PASS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
