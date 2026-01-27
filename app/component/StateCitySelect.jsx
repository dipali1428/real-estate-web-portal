"use client";
import { useState } from "react";

export default function StateCitySelect() {
  const statesAndCities = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Pasighat"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    "Haryana": ["Gurugram", "Faridabad", "Panipat"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubli"],
    "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior", "Jabalpur"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
    "Manipur": ["Imphal", "Bishnupur"],
    "Meghalaya": ["Shillong", "Tura"],
    "Mizoram": ["Aizawl", "Lunglei"],
    "Nagaland": ["Kohima", "Dimapur"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar"],
    "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota"],
    "Sikkim": ["Gangtok", "Namchi"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    "Telangana": ["Hyderabad", "Warangal"],
    "Tripura": ["Agartala"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh"],
    "West Bengal": ["Kolkata", "Siliguri", "Howrah"],

    // Union Territories
    "Delhi": ["New Delhi", "Dwarka", "Rohini"],
    "Jammu & Kashmir": ["Srinagar", "Jammu"],
    "Ladakh": ["Leh", "Kargil"],
    "Chandigarh": ["Chandigarh"],
    "Puducherry": ["Puducherry", "Karaikal"],
    "Andaman & Nicobar": ["Port Blair"],
    "Daman & Diu": ["Daman", "Diu"],
    "Lakshadweep": ["Kavaratti"]
  };

  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  const handleStateChange = (state) => {
    setSelectedState(state);
    setCities(statesAndCities[state] || []);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      
      {/* State Dropdown */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Select State</label>
        <select
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          value={selectedState}
          onChange={(e) => handleStateChange(e.target.value)}>
          <option value="">-- Choose State --</option>
          {Object.keys(statesAndCities).map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      {selectedState && (
        <div>
          <label className="block text-gray-700 font-medium mb-1">Select City</label>
          <select
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 "
          >
            <option value="" >-- Choose City --</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
