const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoic2hlcmxvY2tkYWJlNDgiLCJhIjoiY2tteWQxcXR5MDJyeTJvbW5iYzc5NHdlYSJ9.yS1L09c3-p6aHfpxGNRBMg"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
})

function setupMap(centerPosition) {
  const map = new mapboxgl.Map({
    accessToken: MAPBOX_ACCESS_TOKEN,
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: centerPosition,
    zoom: 15,
  })

  const nav = new mapboxgl.NavigationControl()
  map.addControl(nav, "top-right")

  const directionControls = new MapboxDirections({
    accessToken: MAPBOX_ACCESS_TOKEN,
  })

  map.addControl(directionControls, "top-left")
}

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
  setupMap([-2.24, 53.48])
}
