import Link from "next/link";
import type { Event } from "@/types/event";

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>Location: {event.location}</p>
      <p>Date: {new Date(event.eventDate).toLocaleString()}</p>
      <p>Category: {event.category}</p>
      <p>Status: {event.isPublished ? "Published" : "Draft"}</p>
      <Link href={`/events/${event.id}`} className="btn">View Details</Link>
    </div>
  );
}