export const LOAD_HOTELS = 'LOAD_HOTELS';

export function loadHotels (hotels) {
  return {
    type: LOAD_HOTELS,
    hotels: hotels
  };
}
