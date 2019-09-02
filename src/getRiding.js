import GeoJsonGeometriesLookup from 'geojson-geometries-lookup';

import ridingsGeojson from './ridingsGeojson';

const glookup = new GeoJsonGeometriesLookup(ridingsGeojson);

const getRiding = (lat, lon) => {
  const point = { type: 'Point', coordinates: [lon, lat] };

  const featureCollection = glookup.getContainers(point);

  if (featureCollection.features.length === 0) {
    return null;
  }
  return featureCollection.features[0].properties.name;
};

export default getRiding;
