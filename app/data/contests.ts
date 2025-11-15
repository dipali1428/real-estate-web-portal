export type Contest = {
  title: string;
  desc: string;
  img: string;
  images?: string[];
};

// Success Contest Data with multiple images
export const successContests: Contest[] = [
  { 
    title: "Vietnam 2025", 
    desc: "Vietnam Contest – Successfully Conquered! A journey of excellence, teamwork, and unforgettable memories. Congratulations to all achievers who made this milestone truly special! #InfinityArthvishva #VietnamConest2025 #Succes", 
    img: "/Vietnaam1.jpeg",
    images: [
      "/Vietnaam1.jpeg",
      "/Vietnaam2.jpeg", 
      "/Vietnaam3.jpeg",
      "/Vietnaam4.jpeg"
    ]
  },
  { 
    title: "Thailand 2025", 
    desc: "Thailand Achievement Unlocked!Our journey of passion, purpose, and performance reached new heights in Thailand.Proud of every achiever who made this global success possible! #InfinityArthvishva #ThailandAchievement2025 #ProudMoment", 
    img: "/Thailand.jpeg",
    images: [
      "/Thailand.jpeg",
      "/Thailand2.jpeg",
      "/Thailand3.jpeg",
    ]
  },
];