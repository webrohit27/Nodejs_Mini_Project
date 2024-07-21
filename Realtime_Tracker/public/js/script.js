// check if the browser supports geolocation.

const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
    (positon)=>{
        const {latitude, longitude} = positon.coords;
        socket.emit("send-location", {latitude, longitude});
    },
    (error) => {
        console.error(error);
    },
    {
        enableHighAccuracy : true,
        timeout: 5000,
        maximumAge: 0,

    }
);
}

L.map("map").setView([0,0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution: "Old Sangvi PMPML Bus Depot"
}).addTo(map)


const markers = {};

socket.on("receive-location", (data)=>{
    const {id, latitude, longitude} = data;
    map.setView([latitude, longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    }
    else{
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});


socket.on("user-disconnected", (id) => {
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})




















// set options for high accuracy , a 5-second timeout, and no caching.

// use watchposition to track the users locations continuosly.

// Initialize a map centered at coordinate (0,0) with a zoom level of 15 using leaflet.

// Add Openstreetmap tiles to map.

// create an empty object markers.

// when receiving location data via the socket, extract id, latitude and longitude