require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

export function getMockHotels () {
  return new Promise(function (resolve, reject) {
    var hotels = [
      { id: 1, name: 'Hotel 1', address: '台北市中山北路二段50號' },
      { id: 2, name: 'Hotel 2', address: '台北市延平南路三段243號' },
      { id: 3, name: 'Hotel 3', address: '新北市板橋區懷德街390號' },
      { id: 4, name: 'Hotel 4', address: '台北市中山北路二段50號' },
      { id: 5, name: 'Hotel 5', address: '新北市板橋區懷德街390號' },
      { id: 6, name: 'Hotel 6', address: '台北市中山北路二段50號' },
      { id: 7, name: 'Hotel 7', address: '新北市板橋區懷德街390號' },
      { id: 8, name: 'Hotel 8', address: '新北市板橋區懷德街390號' },
      { id: 9, name: 'Hotel 9', address: '台北市中山北路二段50號' },
      { id: 10, name: 'Hotel 10', address: '新北市板橋區懷德街390號' },
      { id: 11, name: 'Hotel 11', address: '新北市板橋區懷德街390號' },
      { id: 12, name: 'Hotel 12', address: '台北市中山北路二段50號' },
      { id: 13, name: 'Hotel 13', address: '新北市板橋區懷德街390號' }
    ];
    resolve(hotels);
  });
}
