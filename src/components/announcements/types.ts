export interface Announcement {
  id: number;
  title: string;
  content: string;
  imageUrl?: string | null;
  publishDate?: string;
  isPast?: boolean;
}
