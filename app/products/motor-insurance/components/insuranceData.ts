import { Car, Bike, Truck, HelpCircle } from "lucide-react";

export const vehicleTypes = [
    { id: "bike", label: "Two Wheeler", icon: Bike },
    { id: "car", label: "Car", icon: Car },
    { id: "commercial", label: "Commercial", icon: Truck },
    { id: "misc", label: "Misc D", icon: HelpCircle },
];

export const planTypes = [
    { id: "comprehensive", label: "Comprehensive" },
    { id: "thirdParty", label: "Third party plans" },
    { id: "ownDamage", label: "Own Damage plans" }
];

export const bikeCCSegments = [
    { id: "upto-75", label: "Up to 75cc", factor: 0.678 },
    { id: "75-150", label: "75cc - 150cc", factor: 1.0 },
    { id: "150-350", label: "150cc - 350cc", factor: 1.913 },
    { id: "above-350", label: "Above 350cc", factor: 3.927 },
];

export const carCCSegments = [
    { id: "upto-1000", label: "Up to 1000cc", factor: 0.613 },
    { id: "1001-1500", label: "1001cc - 1500cc", factor: 1.0 },
    { id: "above-1500", label: "Above 1500cc", factor: 2.3118 },
];

export const commercialCCSegments = [
    { id: "upto-1500", label: "Up to 1500cc", factor: 1.0 },
    { id: "above-1500", label: "Above 1500cc", factor: 1.0 },
];

export const commercialGVWSegments = [
    { id: "upto-7500", label: "Up to 7,500 kg", baseTP: 16049 },
    { id: "7501-12000", label: "7,501 to 12,000 kg", baseTP: 27186 },
    { id: "12001-20000", label: "12,001 to 20,000 kg", baseTP: 35313 },
    { id: "20001-40000", label: "20,001 to 40,000 kg", baseTP: 43950 },
    { id: "above-40000", label: "Exceeding 40,000 kg", baseTP: 44242 },
];

export const miscCCSegments = [
    { id: "upto-1500", label: "Up to 1500 CC", factor: 1.0 },
    { id: "1501-2500", label: "1501 CC to 2500 CC", factor: 1.0 },
    { id: "above-2500", label: "Above 2500 CC", factor: 1.0 },
];

export const companiesData = [
    {
        id: "tata-aig",
        name: "Tata AIG",
        logo: "/motor-insurance/Tata_Aig.jpg",
        type: "private",
        prices: {
            bike: { comprehensive: 1005, thirdParty: 843, ownDamage: 326 },
            car: { comprehensive: 2099, thirdParty: 4031, ownDamage: 800 },
            commercial: { comprehensive: 4500, thirdParty: 3200, ownDamage: 1500 },
            misc: { comprehensive: 3000, thirdParty: 2000, ownDamage: 1000 }
        }
    },
    {
        id: "bajaj-allianz",
        name: "Bajaj Allianz",
        logo: "/motor-insurance/Bajaj.jpg",
        type: "private",
        prices: {
            bike: { comprehensive: 748, thirdParty: 843, ownDamage: 136 },
            car: { comprehensive: 1899, thirdParty: 4031, ownDamage: 750 },
            commercial: { comprehensive: 4200, thirdParty: 3100, ownDamage: 1400 },
            misc: { comprehensive: 2800, thirdParty: 1900, ownDamage: 900 }
        }
    },
    {
        id: "digit",
        name: "Digit",
        logo: "/motor-insurance/digit.png",
        type: "private",
        prices: {
            bike: { comprehensive: 899, thirdParty: 843, ownDamage: 250 },
            car: { comprehensive: 2200, thirdParty: 4031, ownDamage: 850 },
            commercial: { comprehensive: 4800, thirdParty: 3300, ownDamage: 1600 },
            misc: { comprehensive: 3200, thirdParty: 2100, ownDamage: 1100 }
        }
    },
    {
        id: "royal-sundaram",
        name: "Royal Sundaram",
        logo: "/motor-insurance/Royal_Sundaram.png",
        type: "private",
        prices: {
            bike: { comprehensive: 920, thirdParty: 843, ownDamage: 280 },
            car: { comprehensive: 2300, thirdParty: 4031, ownDamage: 900 },
            commercial: { comprehensive: 5000, thirdParty: 3500, ownDamage: 1700 },
            misc: { comprehensive: 3500, thirdParty: 2300, ownDamage: 1200 }
        }
    },
    {
        id: "chola-ms",
        name: "Chola MS",
        logo: "/motor-insurance/Chola_MS.jpg",
        type: "private",
        prices: {
            bike: { comprehensive: 850, thirdParty: 843, ownDamage: 220 },
            car: { comprehensive: 2100, thirdParty: 4031, ownDamage: 820 },
            commercial: { comprehensive: 4600, thirdParty: 3250, ownDamage: 1550 },
            misc: { comprehensive: 3100, thirdParty: 2050, ownDamage: 1050 }
        }
    },
    {
        id: "shriram-general",
        name: "Shriram General",
        logo: "/motor-insurance/Shriram General.jpg",
        type: "private",
        prices: {
            bike: { comprehensive: 780, thirdParty: 843, ownDamage: 150 },
            car: { comprehensive: 1950, thirdParty: 4031, ownDamage: 700 },
            commercial: { comprehensive: 4000, thirdParty: 3000, ownDamage: 1300 },
            misc: { comprehensive: 2700, thirdParty: 1800, ownDamage: 850 }
        }
    },
    {
        id: "zuno",
        name: "Zuno",
        logo: "/motor-insurance/zuno.jpg",
        type: "private",
        prices: {
            bike: { comprehensive: 810, thirdParty: 843, ownDamage: 190 },
            car: { comprehensive: 2050, thirdParty: 4031, ownDamage: 780 },
            commercial: { comprehensive: 4400, thirdParty: 3150, ownDamage: 1450 },
            misc: { comprehensive: 2950, thirdParty: 1950, ownDamage: 950 }
        }
    },
    {
        id: "iffco-tokio",
        name: "IFFCO-Tokio",
        logo: "/motor-insurance/Iffco_tokio.png",
        type: "private",
        prices: {
            bike: { comprehensive: 880, thirdParty: 843, ownDamage: 240 },
            car: { comprehensive: 2150, thirdParty: 4031, ownDamage: 880 },
            commercial: { comprehensive: 4700, thirdParty: 3400, ownDamage: 1650 },
            misc: { comprehensive: 3150, thirdParty: 2200, ownDamage: 1150 }
        }
    },
    {
        id: "magma-hdi",
        name: "Magma HDI",
        logo: "/motor-insurance/Magma.png",
        type: "private",
        prices: {
            bike: { comprehensive: 860, thirdParty: 843, ownDamage: 210 },
            car: { comprehensive: 2080, thirdParty: 4031, ownDamage: 810 },
            commercial: { comprehensive: 4550, thirdParty: 3200, ownDamage: 1520 },
            misc: { comprehensive: 3050, thirdParty: 20305, ownDamage: 1020 }
        }
    },
    {
        id: "sbi-general",
        name: "SBI General",
        logo: "/motor-insurance/SBI.jpg",
        type: "private",
        prices: {
            bike: { comprehensive: 830, thirdParty: 843, ownDamage: 200 },
            car: { comprehensive: 2000, thirdParty: 4031, ownDamage: 790 },
            commercial: { comprehensive: 4300, thirdParty: 3050, ownDamage: 1400 },
            misc: { comprehensive: 2900, thirdParty: 20305, ownDamage: 980 }
        }
    },
    {
        id: "universal-sompo",
        name: "Universal Sompo",
        logo: "/motor-insurance/Universal_Sompo.jpg",
        type: "private",
        prices: {
            bike: { comprehensive: 840, thirdParty: 843, ownDamage: 205 },
            car: { comprehensive: 2020, thirdParty: 4031, ownDamage: 795 },
            commercial: { comprehensive: 4350, thirdParty: 3080, ownDamage: 1420 },
            misc: { comprehensive: 2950, thirdParty: 20305, ownDamage: 990 }
        }
    }
];
