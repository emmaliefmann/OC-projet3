class MyMap {
    constructor(city, lat, lng, divid) {
        this.city = city;
        this.mymap = L.map(divid).setView([lat, lng], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoiZW1tYWxpZWZtYW5uIiwiYSI6ImNrNXh6bWdvMTAwOHkzcHFnNjQycjEzcGcifQ.a7zm3z5lvmBwCtY6_tkM-g'
        }).addTo(this.mymap);
        this.addMarkers();
    }

    addMarkers() {
        fetch('https://api.jcdecaux.com/vls/v1/stations?contract=' + this.city + '&apiKey=d37cb87066c49d54676d329a32e7e6ffb0919d19')
            .then(response => {
                return response.json();
            })
    
            .then(stations => {
                const cluster = L.markerClusterGroup();
                stations.map((station) => {
                    const marker = L.marker([station.position.lat, station.position.lng])
                    cluster.addLayer(marker);
                    marker.addEventListener('click', () => {
                        myApp.appReservation.setCurrentStation(station);
                    });
                });
                this.mymap.addLayer(cluster);
            })
    }

};




