import { signIn } from "../actions";
export default async function Login({searchParams}:{searchParams:Promise<{error?:string;sent?:string}>}) {
  const {error,sent}=await searchParams;
  return <section className="card" style={{maxWidth:520,margin:"3rem auto"}}><div className="eyebrow">Private workspace</div><h1>Sign in to Omoluabi</h1><p>Access is limited to people invited as workspace members. We’ll email you a secure sign-in link.</p>{error&&<p className="error" role="alert">{error}</p>}{sent&&<p className="notice" role="status">Check your email for a secure sign-in link. You can close this page while you wait.</p>}<form action={signIn}><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required/><p><button type="submit">Email me a sign-in link</button></p></form></section>;
}
