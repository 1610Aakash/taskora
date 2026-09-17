export async function forgotPasswordRequest({ email }) {
  await new Promise((r) => setTimeout(r, 900));
  return { message: `Reset link sent to ${email}` };
}
