import L from 'leaflet'
import markerIcon from './marker-icon.png'
import markerShadow from './marker-shadow.png'
import markerRed from './marker-red.png'
import destinationMarker from './markerdestination.png'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})


export const redIcon = L.icon({
  iconUrl: markerRed,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

export const markerDestination = L.icon({
  iconUrl: destinationMarker,
  iconSize: [50, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});