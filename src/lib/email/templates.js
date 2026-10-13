import { getAppUrl } from "./resend";

const BRAND = "#6366f1";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function layout(content) {
  return `
  <div style="background:#f4f5fb;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;padding:32px;border:1px solid #e5e7eb;">
      <h2 style="margin:0 0 24px;color:${BRAND};font-size:22px;">Taskora</h2>
      ${content}
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0 16px;" />
      <p style="margin:0;color:#9ca3af;font-size:12px;">You're receiving this email because of activity on your Taskora account.</p>
    </div>
  </div>`;
}

function button(href, label) {
  return `<a href="${href}" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;">${label}</a>`;
}

const p = (text) =>
  `<p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">${text}</p>`;

export function verificationEmail({ fullName, verifyUrl }) {
  return {
    subject: "Verify your Taskora email",
    html: layout(`
      ${p(`Hi ${escapeHtml(fullName)},`)}
      ${p("Welcome to Taskora! Please confirm your email address to finish setting up your account.")}
      <div style="margin:24px 0;">${button(verifyUrl, "Verify email")}</div>
      ${p("This link expires in 24 hours. If you didn't create an account, you can ignore this email.")}
    `),
  };
}

export function loginAlertEmail({ fullName, time, device, ip }) {
  return {
    subject: "New sign-in to your Taskora account",
    html: layout(`
      ${p(`Hi ${escapeHtml(fullName)},`)}
      ${p("Your Taskora account was just signed in to.")}
      <table style="margin:0 0 16px;font-size:14px;color:#374151;">
        <tr><td style="padding:2px 16px 2px 0;color:#6b7280;">Time</td><td>${escapeHtml(time)}</td></tr>
        <tr><td style="padding:2px 16px 2px 0;color:#6b7280;">IP</td><td>${escapeHtml(ip)}</td></tr>
        <tr><td style="padding:2px 16px 2px 0;color:#6b7280;vertical-align:top;">Device</td><td>${escapeHtml((device || "").slice(0, 120))}</td></tr>
      </table>
      ${p("If this was you, no action is needed. If not, reset your password right away.")}
      <div style="margin:24px 0;">${button(`${getAppUrl()}/forgot-password`, "Reset password")}</div>
    `),
  };
}

export function resetPasswordEmail({ fullName, resetUrl }) {
  return {
    subject: "Reset your Taskora password",
    html: layout(`
      ${p(`Hi ${escapeHtml(fullName)},`)}
      ${p("We received a request to reset your password. Click the button below to choose a new one.")}
      <div style="margin:24px 0;">${button(resetUrl, "Reset password")}</div>
      ${p("This link expires in 1 hour. If you didn't request this, you can safely ignore this email.")}
    `),
  };
}

export function passwordChangedEmail({ fullName, viaReset = false }) {
  return {
    subject: "Your Taskora password was changed",
    html: layout(`
      ${p(`Hi ${escapeHtml(fullName)},`)}
      ${p(`Your Taskora password was ${viaReset ? "reset" : "changed"} successfully.`)}
      ${p("If you didn't do this, reset your password immediately or contact your admin.")}
      <div style="margin:24px 0;">${button(`${getAppUrl()}/forgot-password`, "Reset password")}</div>
    `),
  };
}

export function accountCreatedEmail({ fullName, setPasswordUrl }) {
  return {
    subject: "Your Taskora account is ready",
    html: layout(`
      ${p(`Hi ${escapeHtml(fullName)},`)}
      ${p("An admin has created a Taskora account for you. Set your password to get started.")}
      <div style="margin:24px 0;">${button(setPasswordUrl, "Set your password")}</div>
      ${p("This link expires in 48 hours.")}
    `),
  };
}
