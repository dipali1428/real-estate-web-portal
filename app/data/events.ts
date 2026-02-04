export type Event = {
  title: string;
  date: string;
  desc: string;
  city: string;
  id: string;
};

// Actual Business Events Data from the images
export const events: Event[] = [
  // 2024 Events
  { id: "Akola 13 feb 24", title: "Business Event", date: "Feb 13, 2024", desc: "Success starts with strong connections", city: "Akola" },
  { id: "Yavatmal 14 feb 24", title: "Business Event", date: "Feb 14, 2024", desc: "A meet that shaped milestones", city: "Yavatmal" },
  { id: "Kolhapur 22 may 24", title: "Business Event", date: "May 22, 2024", desc: "Great minds, greater outcomes", city: "Kolhapur" },
  { id: "Sangli 5 jun 24", title: "Business Event", date: "Jun 5, 2024", desc: "Collaboration creates success", city: "Sangli" },
  { id: "Sambhajinagar 17 jun 24", title: "Business Event", date: "Jun 17, 2024", desc: "Vision. Strategy. Success", city: "Sambhajinagar" },
  { id: "Sambhajinagar 16 jul 24", title: "Business Event", date: "Jul 16, 2024", desc: "When leaders meet, ideas ignite", city: "Sambhajinagar" },
  { id: "Nashik 20 jul 24", title: "Business Event", date: "Jul 20, 2024", desc: "Building bridges for a better future", city: "Nashik" },
  { id: "Hyderabad 2 aug 24", title: "Business Event", date: "Aug 2, 2024", desc: "Success shared is success multiplied", city: "Hyderabad" },
  { id: "Chiplun 23 aug 24", title: "Business Event", date: "Aug 23, 2024", desc: "Productive minds, powerful results", city: "Chiplun" },
  { id: "Pune 3 sep 24", title: "Business Event", date: "Sep 3, 2024", desc: "Mission accomplished with teamwork", city: "Pune" },
  { id: "Raipur 14 sep 24", title: "Business Event", date: "Sep 14, 2024", desc: "Dream. Discuss. Do", city: "Raipur" },
  { id: "Pune 18 sep 24", title: "Business Event", date: "Sep 18, 2024", desc: "Together, we grow stronger", city: "Pune" },
  { id: "Amravati 14 oct 24", title: "Business Event", date: "Oct 14, 2024", desc: "Setting new benchmarks every meet", city: "Amravati" },
  { id: "Nagpur 16 oct 24", title: "Business Event", date: "Oct 16, 2024", desc: "Turning conversations into achievements", city: "Nagpur" },
  { id: "Nashik 19 oct 24", title: "Business Event", date: "Oct 19, 2024", desc: "The start of many more successes", city: "Nashik" },
  { id: "Kolhapur 7 nov 24", title: "Business Event", date: "Nov 7, 2024", desc: "Empowered minds. Endless possibilities", city: "Kolhapur" },
  { id: "Hyderabad 13 nov 24", title: "Business Event", date: "Nov 13, 2024", desc: "One meet, many milestones", city: "Hyderabad" },
  { id: "Indore 29 nov 24", title: "Business Event", date: "Nov 29, 2024", desc: "Success is best when celebrated together", city: "Indore" },
  { id: "Pune 4 dec 24", title: "Business Event", date: "Dec 4, 2024", desc: "Creating history, one meeting at a time", city: "Pune" },
  { id: "Pune 11 dec 24", title: "Business Event", date: "Dec 11, 2024", desc: "Big ideas. Bold actions", city: "Pune" },
  { id: "Kolhapur 17 dec 24", title: "Business Event", date: "Dec 17, 2024", desc: "Networking that nurtures success", city: "Kolhapur" },
  { id: "Sambhajinagar 19 jul 24", title: "Business Event", date: "Jul 19, 2024", desc: "Networking that nurtures success", city: "Sambhajinagar" },

  // 2025 Events
  { id: "Nashik 3 feb 25", title: "Business Event", date: "Feb 3, 2025", desc: "Teamwork makes the vision work", city: "Nashik" },
  { id: "Gurgaon 6 feb 25", title: "Business Event", date: "Feb 6, 2025", desc: "Stronger together — always", city: "Gurgaon" },
  { id: "Akola 13 feb 25", title: "Business Event", date: "Feb 13, 2025", desc: "United for a common goal", city: "Akola" },
  { id: "Yavatmal 14 feb 25", title: "Business Event", date: "Feb 14, 2025", desc: "Collaboration fuels innovation", city: "Yavatmal" },
  { id: "Amravati 15 feb 25", title: "Business Event", date: "Feb 15, 2025", desc: "Meeting minds, creating magic", city: "Amravati" },
  { id: "Kolkata 21 feb 25", title: "Business Event", date: "Feb 21, 2025", desc: "The power of partnerships in action", city: "Kolkata" },
  { id: "Sangamner 27 feb 25", title: "Business Event", date: "Feb 27, 2025", desc: "From ideas to impact", city: "Sangamner" },
  { id: "Indore 3 mar 25", title: "Business Event", date: "Mar 3, 2025", desc: "Every meet is a new beginning", city: "Indore" },
  { id: "Bhopal 4 mar 25", title: "Business Event", date: "Mar 4, 2025", desc: "Together, we make it happen", city: "Bhopal" },
  { id: "Pune 21 mar 25", title: "Business Event", date: "Mar 21, 2025", desc: "Celebrating a successful business meet", city: "Pune" },
  { id: "Nashik 9 apr 25", title: "Business Event", date: "Apr 9, 2025", desc: "Milestones achieved, many more to go", city: "Nashik" },
  { id: "Goa 18 apr 25", title: "Business Event", date: "Apr 18, 2025", desc: "Proud moments, powerful partnerships", city: "Goa" },
  { id: "Kolkata 23 may 25", title: "Business Event", date: "May 23, 2025", desc: "A successful day of ideas and inspiration", city: "Kolkata" },
  { id: "Nashik 24 jun 25", title: "Business Event", date: "Jun 24, 2025", desc: "Cheers to growth and success", city: "Nashik" },
  { id: "Jaipur 11 jul 25", title: "Business Event", date: "Jul 11, 2025", desc: "The energy of success was everywhere", city: "Jaipur" },
  { id: "Gurgaon 12 jul 25", title: "Business Event", date: "Jul 12, 2025", desc: "Goals discussed, growth decided", city: "Gurgaon" },
  { id: "Nagpur 23 jul 25", title: "Business Event", date: "Jul 23, 2025", desc: "Success stories in the making", city: "Nagpur" },
  { id: "Kolhapur 4 aug 25", title: "Business Event", date: "Aug 4, 2025", desc: "Another successful chapter written", city: "Kolhapur" },
  { id: "Bhopal 7 aug 25", title: "Business Event", date: "Aug 7, 2025", desc: "Meeting success, exceeding goals", city: "Bhopal" },
  { id: "Assam 13 aug 25", title: "Business Event", date: "Aug 13, 2025", desc: "Success unlocked", city: "Assam" },
  { id: "Gurgaon 8 sep 25", title: "Business Event", date: "Sep 8, 2025", desc: "Growth in motion", city: "Gurgaon" },
  { id: "Bhubaneswar 10 sep 25", title: "Business Event", date: "Sep 10, 2025", desc: "Synergy at its best", city: "Bhubaneswar" },
  { id: "Kolhapur 23 sep 25", title: "Business Event", date: "Sep 23, 2025", desc: "Minds aligned, goals defined", city: "Kolhapur" },
  { id: "Nashik 27 oct 25", title: "Business Event", date: "Oct 27, 2025", desc: "Progress. Partnership. Purpose", city: "Nashik" },
  { id: "Sambhajinagar 1 nov 25", title: "Business Event", date: "Nov 1, 2025", desc: "Powerful minds. Purposeful meetings", city: "Surat" },
  { id: "Surat 21 nov 25", title: "Business Event", date: "Nov 21, 2025", desc: "A successful day of ideas and inspiration", city: "Kolkata" },
  { id: "Kanpur 26 nov 25", title: "Business Event", date: "Nov 26, 2024", desc: "One meet, many milestones", city: "Kanpur" },
  { id: "Solapur 14 nov 25", title: "Business Event", date: "Nov 14, 2025", desc: "Teamwork makes the vision work", city: "Solapur" },

  // 2026 Events
  { id: "Sangli 20 jan 25", title: "Business Event", date: "Jan 20, 2026", desc: "Meeting success, exceeding goals", city: "Sangli" },
];

// Sort events by date
export const sortedEvents = [...events].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);

// Group events by year
export const eventsByYear: { [year: string]: Event[] } = {};
sortedEvents.forEach((event) => {
  const year = new Date(event.date).getFullYear();
  if (!eventsByYear[year]) eventsByYear[year] = [];
  eventsByYear[year].push(event);
});