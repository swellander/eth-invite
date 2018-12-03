import axios from 'axios';

export default async (eventId) => {
  return axios.get(`/api/events/specific/${eventId}`)
    .then(response => response.data)
    .then(async event => {
      const { lat, lng } = event;
      const numOfDecimals = 3;
      //widen acceptable radius
      const wideLat = lat.toFixed(numOfDecimals);
      const wideLng = lng.toFixed(numOfDecimals);

      const coords = await getPreciseLocation();
      const [latitude, longitude] = coords;
      const partyLat = latitude.toFixed(numOfDecimals);
      const partyLng = longitude.toFixed(numOfDecimals);

      console.log('Party lat', partyLat)
      console.log('wideLat', wideLat)
      console.log('partyLng', partyLng)
      console.log('wideLng', wideLng)
      if (
        (wideLat === latitude.toFixed(numOfDecimals)) && (wideLng === longitude.toFixed(numOfDecimals))
      ) {
        console.log('User is at location of the party')
        return true
      } else {
        return false;
      }
    })
    .catch(err => {
      console.log('something went wrong with location checking')
      throw err;
    });
};


function getPreciseLocation() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (position) {
      resolve([position.coords.latitude, position.coords.longitude]);
    });
  });
}