export interface YouTubeVideo {
  videoId?: string; // Made optional
  image?: string;   // Added for image-based stories
  title: string;
  description: string;
}

export const featuredVideos: YouTubeVideo[] = [
  {
    videoId: "GYC5b8OoK3I",
    title: "The wait is over! 🎧 Success Talk with Rajesh Parkhi & Rahul Kangane — out now!🔥",
    description: "Don’t forget to Like, Share & Subscribe for more inspiring stories!"
  },
  {
    image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/ET-Business-Award/ET-Business-Award.jpeg`,
    title: "🏆 Winner at ET Business Awards 2025 – Pune",
    description: "A milestone achievement celebrating vision, execution, and excellence"
  }
];