import { ContentItem } from "../types";

export const dummyContent: ContentItem[] = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  title: `Sample Article ${i + 1}`,
  author: ["Dr. Emily Carter", "Prof. David Lee", "Ms. Olivia Chen", "Mr. Ethan Clark"][i % 4],
  status: i % 2 === 0 ? "Approved" : "Pending",
  date: `2024-02-${(i % 28) + 1}`,
  description: "This is a sample description for demo content moderation data.",
  images: i % 3 === 0 ? [`/img${i}_1.jpg`, `/img${i}_2.jpg`] : [],
  pdfs: i % 4 === 0 ? [`/doc${i}_1.pdf`] : [],
  videos: i % 5 === 0 ? [`/video${i}_1.mp4`] : [],
}));
