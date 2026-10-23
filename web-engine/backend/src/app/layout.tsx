import type { Metadata } from "next";
import Link from "next/link";
import "./style.css";

export const metadata: Metadata = {
  title: "Omoluabi | Editorial workspace",
  description: "Human-governed research, evidence, review, and publication workspace.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <a className="skip" href="#main">Skip to main content</a>
    <header className="top"><Link className="brand" href="/">OMOLUABI <span>WEB ENGINE</span></Link><nav aria-label="Primary"><Link href="/">Investigations</Link><Link href="/intake">Temporary intake</Link></nav></header>
    <main id="main" tabIndex={-1}>{children}</main>
    <footer>Evidence persists. Unknowns remain visible. A person decides.</footer>
  </body></html>;
}
