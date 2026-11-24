import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <strong>CAMPUS EVENTS</strong>
      <div>
        <Link href="/">Home</Link>
        <Link href="/events">Events</Link>
        <Link href="/create-event">Create</Link>
      </div>
    </nav>
  );
}