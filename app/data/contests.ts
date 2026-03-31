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
    // desc: "Vietnam Contest – Successfully Conquered! A journey of excellence, teamwork, and unforgettable memories. Congratulations to all achievers who made this milestone truly special! #InfinityArthvishva #VietnamConest2025 #Succes",
    desc: "Vietnam Contest – Successfully Conquered! A journey of excellence, teamwork, and unforgettable memories. Congratulations to all achievers who made this milestone truly special!", 

    img: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/Vietnaam1.jpeg`,
    images: [
      `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/Vietnaam/Vietnaam1.jpeg`,
      `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/Vietnaam/Vietnaam2.jpeg`, 
      `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/Vietnaam/Vietnaam4.jpeg`
    ]
  },
  { 
    title: "Thailand 2025", 
    // desc: "Thailand Achievement Unlocked!Our journey of passion, purpose, and performance reached new heights in Thailand.Proud of every achiever who made this global success possible! #InfinityArthvishva #ThailandAchievement2025 #ProudMoment",
    desc: "Thailand Achievement Unlocked!Our journey of passion, purpose, and performance reached new heights in Thailand.Proud of every achiever who made this global success possible!", 
    img: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/Thailand.jpeg`,
    images: [
      `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/Thailand/Thailand2.jpeg`,
      `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/Thailand/Thailand3.jpeg`,
    ]
  },
];