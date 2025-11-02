// timezoneData.js
// This list is large, but for a true 197-country World Clock, you must expand this list
// to include all remaining countries/major cities.

const TIMEZONE_DATA = [

    // South & East Asia (16 entries)
    { name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, timezone: 'Asia/Dhaka', label: 'Asia/Dhaka (GMT+6)' },
    { name: 'New Delhi', country: 'India', lat: 28.6139, lng: 77.2090, timezone: 'Asia/Kolkata', label: 'Asia/Kolkata (GMT+5:30)' },
    { name: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011, timezone: 'Asia/Karachi', label: 'Asia/Karachi (GMT+5)' },
    { name: 'Kathmandu', country: 'Nepal', lat: 27.7172, lng: 85.3240, timezone: 'Asia/Kathmandu', label: 'Asia/Kathmandu (GMT+5:45)' },
    { name: 'Colombo', country: 'Sri Lanka', lat: 6.9271, lng: 79.8612, timezone: 'Asia/Colombo', label: 'Asia/Colombo (GMT+5:30)' },
    { name: 'Beijing', country: 'China', lat: 39.9042, lng: 116.4074, timezone: 'Asia/Shanghai', label: 'Asia/Shanghai (GMT+8)' },
    { name: 'Tokyo', country: 'Japan', lat: 35.6895, lng: 139.6917, timezone: 'Asia/Tokyo', label: 'Asia/Tokyo (GMT+9)' },
    { name: 'Seoul', country: 'South Korea', lat: 37.5665, lng: 126.9780, timezone: 'Asia/Seoul', label: 'Asia/Seoul (GMT+9)' },
    { name: 'Manila', country: 'Philippines', lat: 14.5995, lng: 120.9842, timezone: 'Asia/Manila', label: 'Asia/Manila (GMT+8)' },
    { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, timezone: 'Asia/Jakarta', label: 'Asia/Jakarta (GMT+7)' },
    { name: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018, timezone: 'Asia/Bangkok', label: 'Asia/Bangkok (GMT+7)' },
    { name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869, timezone: 'Asia/Kuala_Lumpur', label: 'Asia/Kuala_Lumpur (GMT+8)' },
    { name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, timezone: 'Asia/Singapore', label: 'Asia/Singapore (GMT+8)' },
    { name: 'Hanoi', country: 'Vietnam', lat: 21.0285, lng: 105.8542, timezone: 'Asia/Ho_Chi_Minh', label: 'Asia/Ho_Chi_Minh (GMT+7)' },
    { name: 'Taipei', country: 'Taiwan', lat: 25.0330, lng: 121.5654, timezone: 'Asia/Taipei', label: 'Asia/Taipei (GMT+8)' },
    { name: 'Ulaanbaatar', country: 'Mongolia', lat: 47.9212, lng: 106.9186, timezone: 'Asia/Ulaanbaatar', label: 'Asia/Ulaanbaatar (GMT+8)' },

    // North America (8 entries)
    { name: 'Washington D.C.', country: 'USA', lat: 38.9072, lng: -77.0369, timezone: 'America/New_York', label: 'America/New_York (GMT-5)' },
    { name: 'Los Angeles', country: 'USA', lat: 34.0522, lng: -118.2437, timezone: 'America/Los_Angeles', label: 'America/Los_Angeles (GMT-8)' },
    { name: 'Ottawa', country: 'Canada', lat: 45.4215, lng: -75.6972, timezone: 'America/Toronto', label: 'America/Toronto (GMT-5)' },
    { name: 'Mexico City', country: 'Mexico', lat: 19.4326, lng: -99.1332, timezone: 'America/Mexico_City', label: 'America/Mexico_City (GMT-6)' },
    { name: 'Havana', country: 'Cuba', lat: 23.0540, lng: -82.3468, timezone: 'America/Havana', label: 'America/Havana (GMT-5)' },
    { name: 'San Juan', country: 'Puerto Rico', lat: 18.4655, lng: -66.1057, timezone: 'America/Puerto_Rico', label: 'America/Puerto_Rico (GMT-4)' },
    { name: 'Kingston', country: 'Jamaica', lat: 17.9917, lng: -76.7919, timezone: 'America/Jamaica', label: 'America/Jamaica (GMT-5)' },
    { name: 'San Jose', country: 'Costa Rica', lat: 9.9281, lng: -84.0907, timezone: 'America/Costa_Rica', label: 'America/Costa_Rica (GMT-6)' },

    // South America (6 entries)
    { name: 'Brasília', country: 'Brazil', lat: -15.7942, lng: -47.8825, timezone: 'America/Sao_Paulo', label: 'America/Sao_Paulo (GMT-3)' },
    { name: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lng: -58.3816, timezone: 'America/Argentina/Buenos_Aires', label: 'America/Argentina/Buenos_Aires (GMT-3)' },
    { name: 'Bogotá', country: 'Colombia', lat: 4.7110, lng: -74.0721, timezone: 'America/Bogota', label: 'America/Bogota (GMT-5)' },
    { name: 'Santiago', country: 'Chile', lat: -33.4489, lng: -70.6693, timezone: 'America/Santiago', label: 'America/Santiago (GMT-3)' },
    { name: 'Lima', country: 'Peru', lat: -12.0464, lng: -77.0428, timezone: 'America/Lima', label: 'America/Lima (GMT-5)' },
    { name: 'Montevideo', country: 'Uruguay', lat: -34.9011, lng: -56.1645, timezone: 'America/Montevideo', label: 'America/Montevideo (GMT-3)' },

    // Europe (20 entries)
    { name: 'London', country: 'UK', lat: 51.5074, lng: 0.1278, timezone: 'Europe/London', label: 'Europe/London (GMT+0)' },
    { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, timezone: 'Europe/Paris', label: 'Europe/Paris (GMT+1)' },
    { name: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, timezone: 'Europe/Berlin', label: 'Europe/Berlin (GMT+1)' },
    { name: 'Rome', country: 'Italy', lat: 41.9028, lng: 12.4964, timezone: 'Europe/Rome', label: 'Europe/Rome (GMT+1)' },
    { name: 'Madrid', country: 'Spain', lat: 40.4168, lng: -3.7038, timezone: 'Europe/Madrid', label: 'Europe/Madrid (GMT+1)' },
    { name: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lng: 4.9041, timezone: 'Europe/Amsterdam', label: 'Europe/Amsterdam (GMT+1)' },
    { name: 'Stockholm', country: 'Sweden', lat: 59.3293, lng: 18.0686, timezone: 'Europe/Stockholm', label: 'Europe/Stockholm (GMT+1)' },
    { name: 'Vienna', country: 'Austria', lat: 48.2082, lng: 16.3738, timezone: 'Europe/Vienna', label: 'Europe/Vienna (GMT+1)' },
    { name: 'Athens', country: 'Greece', lat: 37.9838, lng: 23.7275, timezone: 'Europe/Athens', label: 'Europe/Athens (GMT+2)' },
    { name: 'Zurich', country: 'Switzerland', lat: 47.3769, lng: 8.5417, timezone: 'Europe/Zurich', label: 'Europe/Zurich (GMT+1)' },
    { name: 'Warsaw', country: 'Poland', lat: 52.2297, lng: 21.0122, timezone: 'Europe/Warsaw', label: 'Europe/Warsaw (GMT+1)' },
    { name: 'Sofia', country: 'Bulgaria', lat: 42.6977, lng: 23.3219, timezone: 'Europe/Sofia', label: 'Europe/Sofia (GMT+2)' },
    { name: 'Kyiv', country: 'Ukraine', lat: 50.4501, lng: 30.5234, timezone: 'Europe/Kyiv', label: 'Europe/Kyiv (GMT+2)' },
    { name: 'Reykjavik', country: 'Iceland', lat: 64.9631, lng: -19.0208, timezone: 'Atlantic/Reykjavik', label: 'Atlantic/Reykjavik (GMT+0)' },
    { name: 'Helsinki', country: 'Finland', lat: 60.1695, lng: 24.9354, timezone: 'Europe/Helsinki', label: 'Europe/Helsinki (GMT+2)' },
    { name: 'Budapest', country: 'Hungary', lat: 47.4979, lng: 19.0402, timezone: 'Europe/Budapest', label: 'Europe/Budapest (GMT+1)' },
    { name: 'Dublin', country: 'Ireland', lat: 53.3498, lng: -6.2603, timezone: 'Europe/Dublin', label: 'Europe/Dublin (GMT+0)' },
    { name: 'Oslo', country: 'Norway', lat: 59.9139, lng: 10.7522, timezone: 'Europe/Oslo', label: 'Europe/Oslo (GMT+1)' },
    { name: 'Lisbon', country: 'Portugal', lat: 38.7223, lng: -9.1393, timezone: 'Europe/Lisbon', label: 'Europe/Lisbon (GMT+0)' },
    { name: 'Belgrade', country: 'Serbia', lat: 44.7872, lng: 20.4573, timezone: 'Europe/Belgrade', label: 'Europe/Belgrade (GMT+1)' },

    // Africa (10 entries)
    { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, timezone: 'Africa/Cairo', label: 'Africa/Cairo (GMT+2)' },
    { name: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792, timezone: 'Africa/Lagos', label: 'Africa/Lagos (GMT+1)' },
    { name: 'Johannesburg', country: 'South Africa', lat: -26.2041, lng: 28.0473, timezone: 'Africa/Johannesburg', label: 'Africa/Johannesburg (GMT+2)' },
    { name: 'Nairobi', country: 'Kenya', lat: -1.2921, lng: 36.8219, timezone: 'Africa/Nairobi', label: 'Africa/Nairobi (GMT+3)' },
    { name: 'Casablanca', country: 'Morocco', lat: 33.5731, lng: -7.5898, timezone: 'Africa/Casablanca', label: 'Africa/Casablanca (GMT+1)' },
    { name: 'Accra', country: 'Ghana', lat: 5.6037, lng: -0.1870, timezone: 'Africa/Accra', label: 'Africa/Accra (GMT+0)' },
    { name: 'Algiers', country: 'Algeria', lat: 36.7538, lng: 3.0583, timezone: 'Africa/Algiers', label: 'Africa/Algiers (GMT+1)' },
    { name: 'Tunis', country: 'Tunisia', lat: 36.8065, lng: 10.1815, timezone: 'Africa/Tunis', label: 'Africa/Tunis (GMT+1)' },
    { name: 'Dakar', country: 'Senegal', lat: 14.7167, lng: -17.4677, timezone: 'Africa/Dakar', label: 'Africa/Dakar (GMT+0)' },
    { name: 'Addis Ababa', country: 'Ethiopia', lat: 9.0055, lng: 38.7636, timezone: 'Africa/Addis_Ababa', label: 'Africa/Addis_Ababa (GMT+3)' },

    // Middle East & West Asia (7 entries)
    { name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708, timezone: 'Asia/Dubai', label: 'Asia/Dubai (GMT+4)' },
    { name: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753, timezone: 'Asia/Riyadh', label: 'Asia/Riyadh (GMT+3)' },
    { name: 'Jerusalem', country: 'Palestine', lat: 31.7683, lng: 35.2137, timezone: 'Asia/Jerusalem', label: 'Asia/Jerusalem (GMT+2)' },
    { name: 'Kuwait City', country: 'Kuwait', lat: 29.3759, lng: 47.9774, timezone: 'Asia/Kuwait', label: 'Asia/Kuwait (GMT+3)' },
    { name: 'Beirut', country: 'Lebanon', lat: 33.8938, lng: 35.5018, timezone: 'Asia/Beirut', label: 'Asia/Beirut (GMT+2)' },
    { name: 'Tehran', country: 'Iran', lat: 35.6892, lng: 51.3890, timezone: 'Asia/Tehran', label: 'Asia/Tehran (GMT+3:30)' },
    { name: 'Baghdad', country: 'Iraq', lat: 33.3152, lng: 44.3661, timezone: 'Asia/Baghdad', label: 'Asia/Baghdad (GMT+3)' },
    
    // Australia & Oceania (3 entries)
    { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, timezone: 'Australia/Sydney', label: 'Australia/Sydney (GMT+11)' },
    { name: 'Auckland', country: 'New Zealand', lat: -36.8485, lng: 174.7633, timezone: 'Pacific/Auckland', label: 'Pacific/Auckland (GMT+13)' },
    { name: 'Suva', country: 'Fiji', lat: -18.1416, lng: 178.4419, timezone: 'Pacific/Fiji', label: 'Pacific/Fiji (GMT+12)' },

    // Eurasian/Other (11 entries)
    { name: 'Moscow', country: 'Russia', lat: 55.7558, lng: 37.6173, timezone: 'Europe/Moscow', label: 'Europe/Moscow (GMT+3)' },
    { name: 'Yerevan', country: 'Armenia', lat: 40.1792, lng: 44.4991, timezone: 'Asia/Yerevan', label: 'Asia/Yerevan (GMT+4)' },
    { name: 'Baku', country: 'Azerbaijan', lat: 40.4093, lng: 49.8671, timezone: 'Asia/Baku', label: 'Asia/Baku (GMT+4)' },
    { name: 'Manama', country: 'Bahrain', lat: 26.2285, lng: 50.5860, timezone: 'Asia/Bahrain', label: 'Asia/Bahrain (GMT+3)' },
    { name: 'Minsk', country: 'Belarus', lat: 53.9045, lng: 27.5615, timezone: 'Europe/Minsk', label: 'Europe/Minsk (GMT+3)' },
    { name: 'Brussels', country: 'Belgium', lat: 50.8503, lng: 4.3517, timezone: 'Europe/Brussels', label: 'Europe/Brussels (GMT+1)' },
    { name: 'Thimphu', country: 'Bhutan', lat: 27.4728, lng: 89.6391, timezone: 'Asia/Thimphu', label: 'Asia/Thimphu (GMT+6)' },
    { name: 'Sarajevo', country: 'Bosnia', lat: 43.8563, lng: 18.4131, timezone: 'Europe/Sarajevo', label: 'Europe/Sarajevo (GMT+1)' },
    { name: 'Kinshasa', country: 'DR Congo', lat: -4.4419, lng: 15.2663, timezone: 'Africa/Kinshasa', label: 'Africa/Kinshasa (GMT+1)' },
    { name: 'Riga', country: 'Latvia', lat: 56.9465, lng: 24.1059, timezone: 'Europe/Riga', label: 'Europe/Riga (GMT+2)' },
    { name: 'Tripoli', country: 'Libya', lat: 32.8872, lng: 13.5887, timezone: 'Africa/Tripoli', label: 'Africa/Tripoli (GMT+2)' },
];

export default TIMEZONE_DATA;