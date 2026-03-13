export const BASE_URL = window.location.hostname === "localhost" ? "http://localhost:3000" : "/api";
export const COMPANY_API = `${BASE_URL}/inspectionCompany`;

export const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+54", country: "Argentina" },
  { code: "+61", country: "Australia" },
  { code: "+43", country: "Austria" },
  { code: "+55", country: "Brazil" },
  { code: "+56", country: "Chile" },
  { code: "+86", country: "China" },
  { code: "+57", country: "Colombia" },
  { code: "+45", country: "Denmark" },
  { code: "+33", country: "France" },
  { code: "+49", country: "Germany" },
  { code: "+62", country: "Indonesia" },
  { code: "+39", country: "Italy" },
  { code: "+81", country: "Japan" },
  { code: "+60", country: "Malaysia" },
  { code: "+52", country: "Mexico" },
  { code: "+31", country: "Netherlands" },
  { code: "+64", country: "New Zealand" },
  { code: "+47", country: "Norway" },
  { code: "+48", country: "Poland" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+65", country: "Singapore" },
  { code: "+82", country: "South Korea" },
  { code: "+34", country: "Spain" },
  { code: "+46", country: "Sweden" },
  { code: "+41", country: "Switzerland" },
  { code: "+66", country: "Thailand" },
  { code: "+90", country: "Turkey" },
  { code: "+971", country: "United Arab Emirates" },
  { code: "+44", country: "United Kingdom" },
  { code: "+1", country: "United States" },
];

export const CATEGORY_OPTIONS = [
  { value: "agri_food", label: "Agricultural & Food Commodities" },
  { value: "industrial_raw", label: "Industrial Raw Materials" },
  { value: "textiles", label: "Textiles & Apparel" },
  { value: "machinery", label: "Machinery & Industrial Equipment" },
  { value: "automotive", label: "Automotive & Transport Equipment" },
  { value: "chem_pharma", label: "Chemicals & Pharmaceuticals" },
  { value: "consumer_goods", label: "Consumer Goods & Household Items" },
  { value: "electronics", label: "Electronics & Technology" },
  { value: "construction", label: "Construction Materials" },
  { value: "luxury", label: "Luxury & Lifestyle Commodities" },
  { value: "emerging_green", label: "Emerging & Green Trade Items" },
  { value: "other", label: "other" },
];
  
export const SUBCATEGORY_OPTIONS = {
  agri_food: [
    { value: "food_grains", label: "Food Grains & Cereals" },
    { value: "pulses_legumes", label: "Pulses & Legumes" },
    { value: "oilseeds", label: "Oilseeds & Edible Oils" },
    { value: "spices", label: "Spices & Condiments" },
    { value: "fruits_veggies", label: "Fruits & Vegetables" },
    { value: "beverage_crops", label: "Beverage Crops" },
    { value: "others_food", label: "Others (Sugar, Dairy, Meat, Seafood)" },
  ],
  industrial_raw: [
    { value: "metals_minerals", label: "Metals & Minerals" },
    { value: "energy_commodities", label: "Energy Commodities" },
    { value: "fertilizers", label: "Fertilizers & Chemicals" },
  ],
  textiles: [
    { value: "raw_fibres", label: "Raw Fibres (Cotton, Jute, Wool, Silk)" },
    { value: "fabrics", label: "Fabrics" },
    { value: "garments", label: "Ready-made Garments" },
    { value: "home_textiles", label: "Home Textiles" },
    { value: "leather_footwear", label: "Leather & Footwear" },
  ],
  machinery: [
    { value: "industrial_machinery", label: "Industrial Machinery" },
    { value: "electrical_machinery", label: "Electrical Machinery" },
    { value: "agri_machinery", label: "Agricultural Machinery" },
    { value: "construction_machinery", label: "Construction Machinery" },
  ],
  automotive: [
    { value: "vehicles", label: "Vehicles (Cars, Bikes, Trucks)" },
    { value: "auto_components", label: "Auto Components & Parts" },
    { value: "consumables", label: "Tires, Batteries, Lubricants" },
  ],
  chem_pharma: [
    { value: "basic_chemicals", label: "Basic Chemicals" },
    { value: "specialty_chemicals", label: "Specialty Chemicals" },
    { value: "pharma", label: "Pharmaceuticals" },
    { value: "cosmetics", label: "Cosmetics & Personal Care" },
  ],
  consumer_goods: [
    { value: "furniture", label: "Furniture & Home Decor" },
    { value: "kitchen_electronics", label: "Kitchenware & Electronics" },
    { value: "stationery", label: "Stationery & Cleaning Products" },
  ],
  electronics: [
    { value: "consumer_electronics", label: "Consumer Electronics" },
    { value: "semiconductors", label: "Semiconductors & Chips" },
    { value: "components", label: "Components & PCBs" },
    { value: "renewable", label: "Batteries & Solar Panels" },
  ],
  construction: [
    { value: "cement_steel", label: "Cement & Steel" },
    { value: "tiles_paints", label: "Tiles, Paints & Glass" },
    { value: "hardware", label: "Hardware Tools & Fittings" },
  ],
  luxury: [
    { value: "jewelry", label: "Jewelry & Watches" },
    { value: "fashion", label: "Designer Fashion & Perfumes" },
    { value: "fine_food", label: "Wines & Gourmet Foods" },
  ],
  emerging_green: [
    { value: "ev", label: "Electric Vehicles & Components" },
    { value: "renewable_equip", label: "Renewable Energy Equipment" },
    { value: "organic_recyclable", label: "Organic & Recyclable Materials" },
  ],
   other: [
    { value: "other", label: "Other" },
  ],
};
  
export const COMMODITY_OPTIONS = {
  food_grains: [
    { value: "rice_basmati", label: "Rice (basmati/non-basmati)" },
    { value: "wheat", label: "Wheat" },
    { value: "maize", label: "Maize (Corn)" },
    { value: "barley", label: "Barley / Oats / Sorghum" },
  ],
  pulses_legumes: [
    { value: "lentils", label: "Lentils" },
    { value: "chickpeas", label: "Chickpeas" },
    { value: "beans", label: "Beans" },
  ],
  oilseeds: [
    { value: "soybean", label: "Soybean" },
    { value: "sunflower", label: "Sunflower" },
    { value: "groundnut", label: "Groundnut" },
    { value: "cashew", label: "Raw Cashew" },
    { value: "mustard", label: "Mustard" },
  ],
  spices: [
    { value: "pepper", label: "Pepper" },
    { value: "turmeric", label: "Turmeric" },
    { value: "cardamom", label: "Cardamom" },
    { value: "cumin", label: "Cumin" },
  ],
  fruits_veggies: [
    { value: "bananas", label: "Bananas" },
    { value: "mangoes", label: "Mangoes" },
    { value: "apples", label: "Apples" },
    { value: "onions", label: "Onions" },
    { value: "grapes", label: "Grapes" },
  ],
  beverage_crops: [
    { value: "coffee", label: "Coffee" },
    { value: "tea", label: "Tea" },
    { value: "cocoa", label: "Cocoa" },
  ],
  others_food: [
    { value: "sugar", label: "Sugar" },
    { value: "honey", label: "Honey" },
    { value: "dairy", label: "Dairy Products" },
    { value: "meat", label: "Meat / Poultry / Seafood" },
  ],

  metals_minerals: [
    { value: "iron_ore", label: "Iron Ore" },
    { value: "copper", label: "Copper" },
    { value: "zinc", label: "Zinc" },
  ],
  energy_commodities: [
    { value: "crude_oil", label: "Crude Oil" },
    { value: "lng", label: "LNG" },
    { value: "coal", label: "Coal" },
  ],
  fertilizers: [
    { value: "urea", label: "Urea" },
    { value: "ammonia", label: "Ammonia" },
  ],

  raw_fibres: [
    { value: "cotton", label: "Cotton" },
    { value: "jute", label: "Jute" },
    { value: "wool", label: "Wool" },
  ],
  fabrics: [
    { value: "woven", label: "Woven Fabric" },
    { value: "knitted", label: "Knitted Fabric" },
  ],
  garments: [
    { value: "shirts", label: "Shirts" },
    { value: "trousers", label: "Trousers" },
  ],

  consumer_electronics: [
    { value: "mobile", label: "Mobile Phones" },
    { value: "laptop", label: "Laptops" },
  ],

  semiconductors: [{ value: "chips", label: "Chips / ICs" }],
  components: [{ value: "pcbs", label: "PCBs" }],

  basic_chemicals: [
    { value: "sulfuric_acid", label: "Sulfuric Acid" },
    { value: "caustic_soda", label: "Caustic Soda (Sodium Hydroxide)" },
    { value: "sodium_chloride", label: "Sodium Chloride" },
    { value: "hydrochloric_acid", label: "Hydrochloric Acid" },
  ],

  specialty_chemicals: [
    { value: "adhesives", label: "Adhesives" },
    { value: "coatings", label: "Paints & Coatings" },
    { value: "solvents", label: "Industrial Solvents" },
    { value: "additives", label: "Polymer Additives" },
  ],

  pharma: [
    { value: "paracetamol", label: "Paracetamol " },
    { value: "ibuprofen", label: "Ibuprofen " },
    { value: "antibiotic", label: "Generic Antibiotic " },
  ],

  cosmetics: [
    { value: "shampoo", label: "Shampoo / Hair Care" },
    { value: "cream", label: "Creams / Lotions" },
    { value: "perfume", label: "Perfumes / Fragrances" },
  ],

  cement_steel: [
    { value: "cement", label: "Cement" },
    { value: "steel_rebar", label: "Steel Rebar" },
  ],

  tiles_paints: [
    { value: "tiles", label: "Tiles" },
    { value: "paints", label: "Paints" },
    { value: "glass", label: "Glass" },
  ],

  hardware: [{ value: "tools", label: "Hardware Tools" }, { value: "fittings", label: "Fittings" }],
  organic_recyclable:[
     { value: "wood_handicraft", label: "Wood & Handicraft" },
     { value: "herbs", label: "Herbs" },
  ],
  renewable_equip:[ 
    {value:"waste_paper",label:"Waste Paper"}
  ],
   other: [
    { value: "other", label: "Other Commodity" },
  ],

  default: [{ value: "other", label: "Other Commodity" }],
};
 
export const URGENCY_OPTIONS = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export const UNIT_OPTIONS = [
  { value: "kg", label: "Kilograms" },
  { value: "tons", label: "Tons" },
  { value: "ltr", label: "Litres" },
  { value: "pcs", label: "Pieces" },
];

export const SERVICE_OPTIONS = [
  { value: "pre-shipment", label: "Pre-shipment Inspection" },
  { value: "loading", label: "Loading Truck" },
  { value: "stuffing", label: "Stuffing Container" },
];
 
export const CERTIFICATION_OPTIONS = [
  { value: "NABL", label: "NABL" },
  { value: "NABCB", label: "NABCB" },
  { value: "COC", label: "COC" },
  { value: "ISO", label: "ISO" },
  { value: "FOSFA", label: "FOSFA" },
  { value: "ECTN", label: "ECTN" },
];

export const getCurrencySymbol = (country) => {
  return String(country).toLowerCase() === "india" ? "₹" : "$";
};

export function formatMajor(amount, currency = "INR", decimals = 2, locale = "en-IN") {
  if (amount == null || Number.isNaN(Number(amount))) return "-";
  const v = Number(amount);
  const loc = (String(currency || "").toUpperCase() === "USD") ? "en-US" : locale;
  return `${getCurrencySymbol(currency)}${v.toLocaleString(loc, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

export function formatFromSmallest(amountSmallest = 0, currency = "INR", decimals = 2) {
  const major = Number(amountSmallest || 0) / 100;
  return formatMajor(major, currency, decimals);
}

export const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu",
  "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"
];


export const COUNTRY_CODES = [
  { value: "+91", label: "🇮🇳 India (+91)" },
  { value: "+1", label: "🇺🇸 United States (+1)" },
  { value: "+44", label: "🇬🇧 United Kingdom (+44)" },
  { value: "+61", label: "🇦🇺 Australia (+61)" },
  { value: "+971", label: "🇦🇪 UAE (+971)" },
  { value: "+966", label: "🇸🇦 Saudi Arabia (+966)" },
  { value: "+65", label: "🇸🇬 Singapore (+65)" },
  { value: "+60", label: "🇲🇾 Malaysia (+60)" },
  { value: "+49", label: "🇩🇪 Germany (+49)" },
  { value: "+33", label: "🇫🇷 France (+33)" },
  { value: "+81", label: "🇯🇵 Japan (+81)" },
  { value: "+86", label: "🇨🇳 China (+86)" },
  { value: "+82", label: "🇰🇷 South Korea (+82)" },
  { value: "+55", label: "🇧🇷 Brazil (+55)" },
  { value: "+27", label: "🇿🇦 South Africa (+27)" },
  { value: "+234", label: "🇳🇬 Nigeria (+234)" },
  { value: "+254", label: "🇰🇪 Kenya (+254)" },
  { value: "+20", label: "🇪🇬 Egypt (+20)" },
  { value: "+92", label: "🇵🇰 Pakistan (+92)" },
  { value: "+880", label: "🇧🇩 Bangladesh (+880)" },
  { value: "+94", label: "🇱🇰 Sri Lanka (+94)" },
  { value: "+977", label: "🇳🇵 Nepal (+977)" },
  { value: "+62", label: "🇮🇩 Indonesia (+62)" },
  { value: "+66", label: "🇹🇭 Thailand (+66)" },
  { value: "+84", label: "🇻🇳 Vietnam (+84)" },
  { value: "+63", label: "🇵🇭 Philippines (+63)" },
  { value: "+64", label: "🇳🇿 New Zealand (+64)" },
  { value: "+39", label: "🇮🇹 Italy (+39)" },
  { value: "+34", label: "🇪🇸 Spain (+34)" },
  { value: "+31", label: "🇳🇱 Netherlands (+31)" },
  { value: "+46", label: "🇸🇪 Sweden (+46)" },
  { value: "+47", label: "🇳🇴 Norway (+47)" },
  { value: "+45", label: "🇩🇰 Denmark (+45)" },
  { value: "+358", label: "🇫🇮 Finland (+358)" },
  { value: "+41", label: "🇨🇭 Switzerland (+41)" },
  { value: "+32", label: "🇧🇪 Belgium (+32)" },
  { value: "+48", label: "🇵🇱 Poland (+48)" },
  { value: "+7", label: "🇷🇺 Russia (+7)" },
  { value: "+90", label: "🇹🇷 Turkey (+90)" },
  { value: "+98", label: "🇮🇷 Iran (+98)" },
  { value: "+964", label: "🇮🇶 Iraq (+964)" },
  { value: "+972", label: "🇮🇱 Israel (+972)" },
  { value: "+52", label: "🇲🇽 Mexico (+52)" },
  { value: "+54", label: "🇦🇷 Argentina (+54)" },
  { value: "+56", label: "🇨🇱 Chile (+56)" },
  { value: "+57", label: "🇨🇴 Colombia (+57)" },
];
