// List of popular tourist attractions in Tobago
export const TOBAGO_ATTRACTIONS = [
  "Pigeon Point Beach",
  "Nylon Pool",
  "Buccoo Reef",
  "Fort King George",
  "Main Ridge Forest Reserve",
  "Argyle Waterfall",
  "Store Bay Beach",
  "Englishman's Bay",
  "Speyside",
  "Little Tobago Island",
  "Tobago Cocoa Estate",
  "Adventure Farm and Nature Reserve",
  "Mystery Tombstone",
  "Scarborough Market",
  "Sunday School",
  "Castara Beach",
  "Charlotteville",
  "Flagstaff Hill",
  "Kimme Museum",
  "Other"
] as const;

export type AttractionName = typeof TOBAGO_ATTRACTIONS[number];

