import { Event } from './events';

// Mock multiple images for each event
export const getEventImages = (event: Event): string[] => {
  const eventImages: { [key: string]: string[] } = {
    // Events with actual images
    "Akola 13 feb 24": [
      "/Akola-13-Feb-2024/Image-1.jpeg",
      "/Akola-13-Feb-2024/Image-2.jpeg",
      "/Akola-13-Feb-2024/Image-3.jpeg",
      "/Akola-13-Feb-2024/Image-4.jpeg"
    ],
    "Yavatmal 14 feb 24": [
      "/Yavatmal-14-Feb-2025/Image-1.jpg",
      "/Yavatmal-14-Feb-2025/Image-2.jpg",
      "/Yavatmal-14-Feb-2025/Image-3.jpg",
      "/Yavatmal-14-Feb-2025/Image-4.jpg",
      "/Yavatmal-14-Feb-2025/Image-5.jpg"
    ], 
    "Kolhapur 22 may 24": [
      "/Kolhapur-22-May-2024/Image-1.jpeg",
      "/Kolhapur-22-May-2024/Image-2.jpeg",
      "/Kolhapur-22-May-2024/Image-3.jpeg",
      "/Kolhapur-22-May-2024/Image-4.jpeg"
    ],
    "Sangli 5 jun 24": [
      "/Sangli-5-June-2024/Image-2.jpeg",
      "/Sangli-5-June-2024/Image-3.jpeg",
      "/Sangli-5-June-2024/Image-4.jpeg",
    ],
    "Sambhajinagar 17 jun 24": [
      "/Sambhajinagar-1-Nov-2025/Image-1.jpeg",
      "/Sambhajinagar-1-Nov-2025/Image-2.jpeg",
      "/Sambhajinagar-1-Nov-2025/Image-3.jpeg"
    ],
    "Sambhajinagar 16 jul 24": [
        "/Remaining/Image-20.jpeg",
        "/Remaining/Image-21.jpeg",
        "/Remaining/Image-22.jpeg"
    ],
    "Nashik 20 jul 24": [
      "/Remaining/Image-7.jpeg",
      "/Remaining/Image-8.jpeg",
      "/Remaining/Image-9.jpeg"
    ],
    "Hyderabad 2 aug 24": [
      "/Hyderabad-2-Aug-2024/Image-1.jpeg",
      "/Hyderabad-2-Aug-2024/Image-2.jpeg"
    ],
    "Chiplun 23 aug 24": [
      "/Remaining/Image-1.jpeg",
      "/Remaining/Image-2.jpeg",
      "/Remaining/Image-3.jpeg"
    ],
    "Pune 3 sep 24": [
      "/Pune-3-Sept-2024/Image-1.jpeg",
      "/Pune-3-Sept-2024/Image-2.jpeg",
      "/Pune-3-Sept-2024/Image-3.jpeg",
      "/Pune-3-Sept-2024/Image-4.jpeg"
    ],
    "Raipur 14 sep 24": [
      "/Raipur-14-Sep-2024/Image-1.jpeg",
      "/Raipur-14-Sep-2024/Image-2.jpeg",
      "/Raipur-14-Sep-2024/Image-3.jpeg",
      "/Raipur-14-Sep-2024/Image-4.jpeg"
    ],
    "Pune 18 sep 24": [
      "/Remaining/Image-32.jpeg",
      "/Remaining/Image-33.jpeg",
      "/Remaining/Image-34.jpeg"
    ],
    "Amravati 14 oct 24": [
      "/Amravati-14-Oct-2024/Image-1.jpeg",
      "/Amravati-14-Oct-2024/Image-2.jpeg",
      "/Amravati-14-Oct-2024/Image-3.jpeg"
    ],
    "Nagpur 16 oct 24": [
      "/Nagpur-16-Oct-2024/Image-1.jpeg",
      "/Nagpur-16-Oct-2024/Image-2.jpeg",
      "/Nagpur-16-Oct-2024/Image-3.jpeg"
    ],
    "Nashik 19 oct 24": [
      "/Nashik-19-Oct-2024/Image-1.jpeg",
      "/Nashik-19-Oct-2024/Image-2.jpeg",
      "/Nashik-19-Oct-2024/Image-3.jpeg",
      "/Nashik-19-Oct-2024/Image-4.jpeg"
    ],
    "Kolhapur 7 nov 24": [
      "/Kolhapur-7-Nov-2024/Image-1.jpg",
      "/Kolhapur-7-Nov-2024/Image-2.jpg",
      "/Kolhapur-7-Nov-2024/Image-3.jpg",
      "/Kolhapur-7-Nov-2024/Image-4.jpg",
      "/Kolhapur-7-Nov-2024/Image-5.jpg"
    ],
    "Hyderabad 13 nov 24": [
      "/Hyderabad-13-Nov-2024/Image-1.jpeg",
      "/Hyderabad-13-Nov-2024/Image-2.jpeg",
      "/Hyderabad-13-Nov-2024/Image-3.jpeg",
      "/Hyderabad-13-Nov-2024/Image-4.jpeg"
    ],
    "Indore 29 nov 24": [
      "/Indore-29-Nov-2024/Image-1.jpg",
      "/Indore-29-Nov-2024/Image-2.jpg",
      "/Indore-29-Nov-2024/Image-3.jpg",
      "/Indore-29-Nov-2024/Image-4.jpg"
    ],
    "Pune 4 dec 24": [
      "/Pune-4-Dec-2024/Image-1.jpeg",
      "/Pune-4-Dec-2024/Image-2.jpeg",
      "/Pune-4-Dec-2024/Image-3.jpeg",
      "/Pune-4-Dec-2024/Image-4.jpeg"
    ],
    "Pune 11 dec 24": [
      "/Pune-11-Dec-2024/Image-1.jpeg",
      "/Pune-11-Dec-2024/Image-2.jpeg",
      "/Pune-11-Dec-2024/Image-3.jpeg"
    ],
    "Kolhapur 17 dec 24": [
      "/Kolhapur-17-Dec-2024/Image-1.jpg",
      "/Kolhapur-17-Dec-2024/Image-2.jpg",
      "/Kolhapur-17-Dec-2024/Image-3.jpg",
      "/Kolhapur-17-Dec-2024/Image-4.jpg",
      "/Kolhapur-17-Dec-2024/Image-5.jpg",
    ],

    // 2025 Events
    "Nashik 3 feb 25": [
      "/Nashik-19-Oct-2024/Image-1.jpeg",
      "/Nashik-19-Oct-2024/Image-2.jpeg",
      "/Nashik-19-Oct-2024/Image-3.jpeg"
    ],
    "Gurgaon 6 feb 25": [
      "/Gurgaon-6-Feb-2025/Image-1.jpg",
      "/Gurgaon-6-Feb-2025/Image-2.jpg",
      "/Gurgaon-6-Feb-2025/Image-3.jpg",
      "/Gurgaon-6-Feb-2025/Image-4.jpg",
      "/Gurgaon-6-Feb-2025/Image-5.jpg"    
    ],
    "14 aug 24": [
      "/14-Aug-2024/Image-1.jpeg",
      "/14-Aug-2024/Image-2.jpeg",
      "/14-Aug-2024/Image-3.jpeg",
      "/14-Aug-2024/Image-4.jpeg"
    ],
    "13 sep 24": [
      "/13-Sep-2024/Image-1.jpeg",
      "/13-Sep-2024/Image-2.jpeg",
      "/13-Sep-2024/Image-3.jpeg",
      "/13-Sep-2024/Image-4.jpeg"
    ],
    "Sambhajinagar 19 jul 24": [
      "/Sambhajinagar-19-Jul-2024/Image-1.jpeg",
      "/Sambhajinagar-19-Jul-2024/Image-2.jpeg",
      "/Sambhajinagar-19-Jul-2024/Image-3.jpeg",
      "/Sambhajinagar-19-Jul-2024/Image-4.jpeg"
    ],
    "22 oct 24": [
      "/22-Oct-2024/Image-1.jpeg",
      "/22-Oct-2024/Image-2.jpeg",
      "/22-Oct-2024/Image-3.jpeg",
      "/22-Oct-2024/Image-4.jpeg"
    ],
    "30 jul 24": [
      "/30 jul 2024/Image-1.jpeg",
      "/30 jul 2024/Image-2.jpeg",
      "/30 jul 2024/Image-3.jpeg",
      "/30 jul 2024/Image-4.jpeg"
    ],
    "Akola 13 feb 25": [
      "/Akola-13-Feb-2025/Image-1.jpeg",
      "/Akola-13-Feb-2025/Image-2.jpeg",
      "/Akola-13-Feb-2025/Image-3.jpeg",
      // "/Akola-13-Feb-2025/Image-4.jpeg"
    ],
    "Yavatmal 14 feb 25": [
      "/Remaining/Image-44.jpeg",
      "/Remaining/Image-45.jpeg",
      "/Remaining/Image-46.jpeg"
    ],
    "Amravati 15 feb 25": [
      "/Amravati-15-Feb-2025/Image-1.jpeg",
      "/Amravati-15-Feb-2025/Image-2.jpeg",
      "/Amravati-15-Feb-2025/Image-3.jpeg",
      "/Amravati-15-Feb-2025/Image-4.jpeg"
    ],
    "Kolkata 21 feb 25": [
      "/22-Oct-2024/Image-1.jpeg", 
      "/22-Oct-2024/Image-2.jpeg",
      "/22-Oct-2024/Image-3.jpeg"
    ],
    "Sangamner 27 feb 25": [
      "/Remaining/Image-15.jpeg",
      "/Remaining/Image-16.jpeg",
      "/Remaining/Image-17.jpeg"
    ],
    "Indore 3 mar 25": [
      "/Remaining/Image-35.jpeg",
      "/Remaining/Image-36.jpeg",
      "/Remaining/Image-37.jpeg"
    ],
    "Bhopal 4 mar 25": [
      "/Remaining/Image-38.jpeg",
      "/Remaining/Image-39.jpeg",
      "/Remaining/Image-40.jpeg"
    ],
    "Pune 21 mar 25": [
      "/Pune-21-Mar-2025/Image-1.jpg",
      "/Pune-21-Mar-2025/Image-2.jpg",
      "/Pune-21-Mar-2025/Image-3.jpg",
      "/Pune-21-Mar-2025/Image-4.jpg",
      "/Pune-21-Mar-2025/Image-5.jpg"
    ],
    "Nashik 9 apr 25": [
      "/Nashik-9-Apr-2025/Image-1.jpeg",
      "/Nashik-9-Apr-2025/Image-2.jpeg",
      "/Nashik-9-Apr-2025/Image-3.jpeg",
      "/Nashik-9-Apr-2025/Image-4.jpeg",
      "/Nashik-9-Apr-2025/Image-6.jpeg"
    ],
    "Goa 18 apr 25": [
      "/Goa-18-April-2025/Image-1.jpeg",
      "/Goa-18-April-2025/Image-2.jpeg",
      "/Goa-18-April-2025/Image-3.jpeg",
      "/Goa-18-April-2025/Image-4.jpeg"
    ],
    "Satara 9 may 25": [
      "/Satara-9-May-2025/Image-1.jpeg",
      "/Satara-9-May-2025/Image-2.jpeg",
      "/Satara-9-May-2025/Image-3.jpeg",
      "/Satara-9-May-2025/Image-4.jpeg"
    ],
    "Kolkata 23 may 25": [
      "/Kolkata-23-may-2025/Image-1.jpeg",
      "/Kolkata-23-may-2025/Image-2.jpeg",
      "/Kolkata-23-may-2025/Image-3.jpeg",
      "/Kolkata-23-may-2025/Image-4.jpeg"
    ],
    "Nashik 24 jun 25": [
      "/Nashik-24-Jun-2025/Image-1.jpeg",
      "/Nashik-24-Jun-2025/Image-2.jpeg",
      "/Nashik-24-Jun-2025/Image-3.jpeg"
    ],
    "Jaipur 11 jul 25": [
      "/Jaipur-11-Jul-2025/Image-1.jpeg",
      "/Jaipur-11-Jul-2025/Image-2.jpeg",
      "/Jaipur-11-Jul-2025/Image-3.jpeg",
      "/Jaipur-11-Jul-2025/Image-4.jpeg",
      "/Jaipur-11-Jul-2025/Image-5.jpeg"
    ],
    "Gurgaon 12 jul 25": [
      "/Remaining/Image-59.jpeg",
      "/Remaining/Image-60.jpeg",
      "/Remaining/Image-61.jpeg"
    ],
    "Nagpur 23 jul 25": [
      "/Nagpur-16-Oct-2024/Image-1.jpeg",
      "/Nagpur-16-Oct-2024/Image-2.jpeg",
      "/Nagpur-16-Oct-2024/Image-3.jpeg"
    ],
    "Kolhapur 4 aug 25": [
      "/Kolhapur-4-Aug-2025/Image-1.jpeg",
      "/Kolhapur-4-Aug-2025/Image-2.jpeg",
      "/Kolhapur-4-Aug-2025/Image-3.jpeg",
      "/Kolhapur-4-Aug-2025/Image-4.jpeg"
    ],
    "Bhopal 7 aug 25": [
      "/Sambhajinagar-1-Nov-2025/Image-2.jpeg",
      "/Sambhajinagar-1-Nov-2025/Image-1.jpeg",
      "/Sambhajinagar-1-Nov-2025/Image-3.jpeg"
    ],
    "Assam 13 aug 25": [
      "/Kolhapur-7-Nov-2024/Image-1.jpg",
      "/Kolhapur-7-Nov-2024/Image-2.jpg",
      "/Kolhapur-7-Nov-2024/Image-3.jpg"
    ],
    "Gurgaon 8 sep 25": [
      "/Gurgaon-8-Sep-2025/Image-1.jpeg",
      "/Gurgaon-8-Sep-2025/Image-2.jpeg",
      "/Gurgaon-8-Sep-2025/Image-3.jpeg",
      "/Gurgaon-8-Sep-2025/Image-4.jpeg"
    ],
    "Bhubaneswar 10 sep 25": [
      "/30-July-2024/Image-4.jpeg",
      "/30-July-2024/Image-5.jpeg",
      "/30-July-2024/Image-6.jpeg"
    ],
    "Kolhapur 23 sep 25": [
      "/Kolhapur-22-May-2024/Image-1.jpeg",
      "/Kolhapur-22-May-2024/Image-2.jpeg",
      "/Kolhapur-22-May-2024/Image-3.jpeg"
    ],
    "Nashik 27 oct 25": [
      "/Nashik-27-Oct-2025/Image-1.jpeg",
      "/Nashik-27-Oct-2025/Image-2.jpeg",
      "/Nashik-27-Oct-2025/Image-3.jpeg"
    ],
    "Sambhajinagar 1 nov 25": [
      "/Sambhajinagar-1-Nov-2025/Image-1.jpeg",
      "/Sambhajinagar-1-Nov-2025/Image-2.jpeg",
      "/Sambhajinagar-1-Nov-2025/Image-3.jpeg",
      "/Sambhajinagar-1-Nov-2025/Image-4.jpeg",
      "/Sambhajinagar-1-Nov-2025/Image-5.jpeg"
    ],
    "Kanpur 26 nov 25": [
      "/Kanpur-26-Nov-2025/Image-1.jpg",
      "/Kanpur-26-Nov-2025/Image-2.jpg",
      "/Kanpur-26-Nov-2025/Image-3.jpg",
      "/Kanpur-26-Nov-2025/Image-4.jpg"
    ],
    "Surat 21 nov 25": [
      "/Surat-21-Nov-2025/Image-1.jpg",
      "/Surat-21-Nov-2025/Image-2.jpg",
      "/Surat-21-Nov-2025/Image-3.jpg",
      "/Surat-21-Nov-2025/Image-4.jpg",
      "/Surat-21-Nov-2025/Image-5.jpg"
    ],
    "Solapur 14 nov 25": [
      "/Solapur-14-Nov-2025/Image-1.jpg",
      "/Solapur-14-Nov-2025/Image-2.jpg",
      "/Solapur-14-Nov-2025/Image-3.jpg",
      "/Solapur-14-Nov-2025/Image-4.jpg"
    ],
    "Sangli 20 jan 25": [
      "/Sangli-20-Jan-2026/Image-1.jpeg",
      "/Sangli-20-Jan-2026/Image-2.jpeg",
      "/Sangli-20-Jan-2026/Image-3.jpeg",
      "/Sangli-20-Jan-2026/Image-4.jpeg"
    ]
  };
  
  return eventImages[event.id]; // Fallback to single image
};