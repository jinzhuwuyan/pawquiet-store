import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell" style={{ padding: "3rem 0" }}>
      <h1>Page not found</h1>
      <p>That page is not part of the PawQuiet shop.</p>
      <Link className="btn btnPrimary" href="/">
        Back home
      </Link>
    </main>
  );
}
