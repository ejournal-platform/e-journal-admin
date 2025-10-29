export interface Announcement {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  isPast?: boolean;
}
