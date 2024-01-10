mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: evnt.geometry.coordinates, // starting position [lng, lat]
	zoom: 9, // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker({color: 'red'})
    .setLngLat(evnt.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${evnt.venue}</h3><p>${evnt.location}</p>`
        )
    )
    .addTo(map)