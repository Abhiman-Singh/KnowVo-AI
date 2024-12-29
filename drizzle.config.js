import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:6jUiM4FCtLWb@ep-patient-dream-a5wcu6og.us-east-2.aws.neon.tech/knowvo?sslmode=require",
  }
});
