require("dotenv").config();

import { google } from "googleapis";

/**
 * Documentation GOOGLE API
 * @link {https://googleapis.dev/nodejs/google-auth-library/5.10.1/classes/GoogleAuth.html}
 */

const auth = new google.auth.GoogleAuth({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    type: process.env.GCP_TYPE,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.GCP_CLIENT_EMAIL,
    client_id: process.env.GCP_CLIENT_ID,
    token_url: process.env.GCP_TOKEN_URI,
    client_secret: process.env.GCP_CLIENT_X509_CERT_URL,
    universe_domain: process.env.GCP_UNIVERSE_DOMAIN,
  },
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const googleSheets = google.sheets({ version: "v4", auth });

export { googleSheets, auth };
