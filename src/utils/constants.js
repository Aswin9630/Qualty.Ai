export const BASE_URL = window.location.hostname === "localhost" ? "http://localhost:3000" : "/api";

export const CATEGORY_OPTIONS = [
  { value: "Agri_food", label: "Agricultural & Food Commodities" },
  { value: "Industrial_raw", label: "Industrial Raw Materials" },
  { value: "Textiles", label: "Textiles & Apparel" },
  { value: "Machinery", label: "Machinery & Industrial Equipment" },
  { value: "Automotive", label: "Automotive & Transport Equipment" },
  { value: "Chemicals_Pharmaceuticals", label: "Chemicals & Pharmaceuticals" },
  { value: "Goods_Household_Items", label: "Consumer Goods & Household Items" },
  { value: "Electronics", label: "Electronics & Technology" },
  { value: "Construction", label: "Construction Materials" },
  { value: "Luxury", label: "Luxury & Lifestyle Commodities" },
  { value: "Emerging_green", label: "Emerging & Green Trade Items" },
];
  
export const SUBCATEGORY_OPTIONS = {
  agri_food: [
    { value: "Food_grains", label: "Food Grains & Cereals" },
    { value: "Pulses_legumes", label: "Pulses & Legumes" },
    { value: "Oilseeds", label: "Oilseeds & Edible Oils" },
    { value: "Spices", label: "Spices & Condiments" },
    { value: "Fruits_veggies", label: "Fruits & Vegetables" },
    { value: "Beverage_crops", label: "Beverage Crops" },
    { value: "Others_food", label: "Others (Sugar, Dairy, Meat, Seafood)" },
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
};
  
export const COMMODITY_OPTIONS = {
  food_grains: [
    { value: "rice", label: "Rice (basmati/non-basmati)" },
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


