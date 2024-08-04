declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ADMIN_EMAIL: string;
      ADMIN_PASSWORD: string;

      GOOGLE_SHEET_ID: string;
      GOOGLE_SHEET_RANGE: string;

      GCP_TYPE: string;
      GCP_PROJECT_ID: string;
      GCP_PRIVATE_KEY_ID: string;
      GCP_PRIVATE_KEY: string;
      GCP_CLIENT_EMAIL: string;
      GCP_CLIENT_ID: string;
      GCP_AUTH_URI: string;
      GCP_TOKEN_URI: string;
      GCP_AUTH_PROVIDER_X509_CERT_URL: string;
      GCP_CLIENT_X509_CERT_URL: string;
      GCP_UNIVERSE_DOMAIN: string;
    }
  }
}

export {};
