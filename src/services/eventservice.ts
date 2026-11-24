import type {
Event, 
Session,
PaginatedEvents,
} from "@/types/event";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!; 
export async function getEvents(): Promise<PaginatedEvents> 
{ const response = await fetch(`${API_URL}/events`, {
cache: "no-store",
});
if (!response.ok) {
throw new Error("Failed to fetch events");
}
return response.json();
}
export async function getUpcomingEvents(): Promise<Event[]> 
{ const response = await fetch(`${API_URL}/events/upcoming`, {

});
if (!response.ok) {
throw new Error("Failed to fetch upcoming events");
}
return response.json();
}
export async function getEventById(id: string): Promise<Event> 
{ const response = await fetch(`${API_URL}/events/${id}`, 
{ cache: "no-store",
});
if (!response.ok) {
throw new Error("Failed to fetch event");
}
return response.json();
}
export async function 
getEventSessions( id: string

): Promise<Session[]> {
const response = await fetch(
`${API_URL}/events/${id}/sessions`,
{ cache: "no-store" }
);
if (!response.ok) {
throw new Error("Failed to fetch sessions");
}
return response.json();
}
export async function 
createEvent( event: Omit<Event, 
"id">
): Promise<Event> {
const response = await fetch(`${API_URL}/events`, 
{ method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(event),
});
if (!response.ok) {
throw new Error("Failed to create event");
}
return response.json();
}
