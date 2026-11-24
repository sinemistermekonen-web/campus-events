"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/services/eventservice";
import EventCard from "@/components/eventcard";
import type { Event } from "@/types/event";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [isPublished, setIsPublished] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  // Runs on first load AND whenever any value in the [] list changes
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getEvents({
          category, location, isPublished, sortBy, order,
          page: String(page),
          limit: "6",
        });
        setEvents(data.items);
        setTotalPages(data.totalPages);
      } catch {
        setError("Could not load events. Is the backend running?");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [category, location, isPublished, sortBy, order, page]);

  // Filtering changes the results, so go back to page 1
  function change(setter: (v: string) => void, value: string) {
    setter(value);
    setPage(1);
  }

  // Search is frontend-only: filter the events we already fetched
  const visible = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1>All Events</h1>

      <div className="filters">
        <input placeholder="Search by title" value={search} onChange={(e) => setSearch(e.target.value)} />
        <input placeholder="Category" value={category} onChange={(e) => change(setCategory, e.target.value)} />
        <input placeholder="Location" value={location} onChange={(e) => change(setLocation, e.target.value)} />

        <select value={isPublished} onChange={(e) => change(setIsPublished, e.target.value)}>
          <option value="">All status</option>
          <option value="true">Published</option>
          <option value="false">Draft</option>
        </select>

        <select value={sortBy} onChange={(e) => change(setSortBy, e.target.value)}>
          <option value="">Sort by</option>
          <option value="eventDate">Date</option>
          <option value="title">Title</option>
        </select>

        <select value={order} onChange={(e) => change(setOrder, e.target.value)}>
          <option value="">Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && visible.length === 0 && <p>No events found. Check back later!</p>}

      <div className="grid">
        {visible.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <div className="pagination">
        <button className="btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button className="btn" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </>
  );
}