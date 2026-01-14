// Zoom Meeting Details
export const ZOOM_MEETING = {
  link: "https://us04web.zoom.us/j/6679291100?pwd=joYqzB59tVSa4HAay56YXWEiPuE4hI.1",
  meetingId: "667 929 1100",
  passcode: "EAvc7L",
};

// Generate Google Calendar URL
export function generateGoogleCalendarUrl(
  title: string,
  date: string, // ISO string
  time: string, // e.g., "10:00 AM"
  durationMinutes: number = 15
): string {
  // Parse the time
  const [timePart, period] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);
  
  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }
  
  // Create start date
  const startDate = new Date(date);
  startDate.setHours(hours, minutes, 0, 0);
  
  // Create end date
  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + durationMinutes);
  
  // Format dates for Google Calendar (YYYYMMDDTHHmmssZ)
  const formatDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  };
  
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
    details: `Join Zoom Meeting:\n${ZOOM_MEETING.link}\n\nMeeting ID: ${ZOOM_MEETING.meetingId}\nPasscode: ${ZOOM_MEETING.passcode}`,
    location: ZOOM_MEETING.link,
  });
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
