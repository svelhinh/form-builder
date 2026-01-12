import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailVerification: {
    enabled: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "Form Builder <onboarding@resend.dev>",
        to: user.email,
        subject: "Hello World",
        html: `
          <p>Click the link to confirm your email:</p>
          <p><a href="${url}">Confirm email</a></p>
        `,
      });
    },
    sendOnSignUp: true,
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Form Builder <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        html: `
          <p>Click the link to reset your password:</p>
          <p><a href="${url}">Reset password</a></p>
        `,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
