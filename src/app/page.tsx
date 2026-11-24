import Link from "next/link";
import { getUpcomingEvents } from "@/services/eventservice";
import EventCard from "@/components/eventcard";
import type { Event } from "@/types/event";

export default async function HomePage() {
  let events: Event[] = [];
  let error = "";

  try {
    events = await getUpcomingEvents();
  } catch {
    error = "Could not load events. Is the backend running?";
  }

  return (
    <>
      <section className="hero">
        <h1>Discover What&apos;s Happening on Campus</h1>
        <p>Find workshops, technology events and activities.</p>
        <Link href="/events" className="btn">Explore Events</Link>
      </section>

      <h2>Upcoming Events</h2>
      {error && <p className="error">{error}</p>}
      {!error && events.length === 0 && <p>No events found. Check back later!</p>}
      <div className="grid">
        {events.slice(0, 3).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <p><Link href="/events">View All Events →</Link></p>
    </>
  );
}