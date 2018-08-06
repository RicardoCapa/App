'use strict';

var locationsInfo = [];

var getLocations = function getLocations() {
    fetch('https://opendata.arcgis.com/datasets/d5af7989f1d94ddd9b05319eb601df8e_0.geojson').then(function (response) {
        return response.json();//
    }).then(function (data) {
        console.log(data);
console.log("segundo yo")
        data.features.forEach(function (location) {
            var locationData = {
                position: { lat: location.geometry.coordinates[1], lng: location.geometry.coordinates[0] },
                name: "Lugar del Delito: "+ location.properties.Neighbourhood + "  /  Tipo de Delito: " + location.properties.homicide_type
            };
            locationsInfo.push(locationData);
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (data) {
                var miPosicion = {
                    lat: data.coords.latitude,
                    lng: data.coords.longitude
                };
                dibujarMapa(miPosicion);
            });
        }
    });
};

console.log("primero yo")

var dibujarMapa = function dibujarMapa(miPosicion) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: miPosicion
    });//funcion q obtiene la posicion

    var marker = new google.maps.Marker({
        position: miPosicion,
        title: 'Tu ubicacion'
    });
    marker.setMap(map);//envia el icono a la posicon

    var markers = locationsInfo.map(function (place) {
        return new google.maps.Marker({
            position: place.position,
            map: map,
            title: place.name
        });
    });//envia a todas las posiciones el icono
};
window.addEventListener('load', getLocations);