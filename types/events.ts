export type EventType = {
  id: number;
  name: string;
  eventDate: Date[]; // Assuming an array of DateTime values
  eventDetails?: string;
  eventCategory: string;
  rsvpName?: string;
  rsvpTel?: string;
  eventImage: string;
  state: string;
  address: string;
  userId?: number | null; // Optional user ID if associated with a user
  xata_id: string; // Uni  x Date of last update
  eventLogo?: string;
  socialMediaLinks?: Record<string, string>;
  user?: User; // Assuming JSON object with key-value pairs for social media links
};

export type User = {
  organizationName: string;
};
