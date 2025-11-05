export interface ContentItem {
  id: number;
  title: string;
  author: string;
  status: "Pending" | "Approved";
  date: string;
  description?: string;
  images?: string[];
  pdfs?: string[];
  videos?: string[];
}
