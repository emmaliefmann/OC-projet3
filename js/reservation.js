class Reservation {
    constructor(city) {
        this.city = city;
        this.canvas = new Canvas('signature');
        this.timer = new Timer(20, 1);
        this.currentStation = null;
        this.addressText = document.querySelector('.addressText');
        this.statusText = document.querySelector('.statusText');
        this.placesText = document.querySelector('.placesText');
        this.availabilityText = document.querySelector('.availabilityText');
        this.reservationForm = document.getElementById('reservationform');
        this.reservationText = document.getElementById('reservationtext');
        this.cancelButton = document.getElementById('annuler');
        
        this.prenom = document.getElementById('prenom');
        this.nom = document.getElementById('nom');
        // Fill fields with data from localStorage
        this.prenom.value = localStorage.getItem('prenom');
        this.nom.value = localStorage.getItem('nom');
        this.signature = document.getElementById('signature');
        this.loader = document.getElementById('loader');
        this.apiCheck();
        this.reservationForm.addEventListener('reset', (e) => {
            this.cancelReservation();
            this.resetReservation();
        });
    };

    apiCheck() {
        this.reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            //Check all data is there, and suitable station chosen
            const isValid = this.checkForm();
            if (isValid === true) {
                sessionStorage.setItem('reservationInProgress', false);
                //Loader during the API call
                this.loader.classList.remove('hidden');
                this.prenom.classList.remove('emptyFieldAlert');
                this.nom.classList.remove('emptyFieldAlert');
                this.signature.classList.remove('emptyFieldAlert');
                fetch('https://api.jcdecaux.com/vls/v1/stations/' + this.currentStation.number + '?contract=' + this.city +'&apiKey=d37cb87066c49d54676d329a32e7e6ffb0919d19')
                    .then(response => {
                        return response.json();
                    })
                    .then(station => {
                        if (station.available_bikes > 0 && station.status !== "CLOSED") {

                            this.submitReservation();
                        }
                    })
            } else {
                return;
            }
        });
    }

    checkForm() {
        let isValid = true;
        if (this.prenom.value == "") {
            this.prenom.classList.add('emptyFieldAlert');
            isValid = false;
        } if (this.nom.value == "") {
            this.nom.classList.add('emptyFieldAlert');
            isValid = false;
        } if (this.canvas.signaturePresent === false) {
            this.signature.classList.add('emptyFieldAlert');
            isValid = false;
        } if (this.currentStation === null) {
            isValid = false;
            this.addressText.textContent = 'Veuillez selectionner une station';
        } if (this.currentStation.available_bikes < 1) {
            isValid = false;
            alert("Il n'y a pas de vélo disponible.");
        } if (this.currentStation.status === "CLOSED") {
            isValid = false;
            alert("Cette station est indisponible pour le moment");
        }
        //Feeds into apiCheck function before form is submitted.
        return isValid;
    }

    //When all reservation valid, and final API call made
    submitReservation() {
        this.timer.stop();
        this.timer = new Timer(20, 1);
        this.timer.start();
        this.loader.classList.add('hidden');
        this.reservationText.textContent = "Vous avez reservé un vélo à " + this.currentStation.address;
        //session storage
        sessionStorage.setItem('prenom', this.prenom.value);
        sessionStorage.setItem('nom', this.nom.value);
        sessionStorage.setItem('station', this.currentStation.address);
        //If true, the reservation will recommence
        sessionStorage.setItem('reservationInProgress', true);
        //Local storage for auto complete
        localStorage.setItem('prenom', this.prenom.value);
        localStorage.setItem('nom', this.nom.value);
    };

    setCurrentStation(station) {
        this.currentStation = station;
        this.reservationText = document.getElementById('reservationtext');
        this.updateInfos();
    }

    updateInfos() {
        if (this.currentStation === null) {
            //No station selected, no text on screen 
            this.addressText.textContent = "";
            this.statusText.textContent = "";
            this.placesText.textContent = ""
            this.availabilityText.textContent = "";
        } else {
            this.addressText.textContent = 'Nom de station : ' + this.currentStation.address;
            this.statusText.textContent = 'État de station : ' + this.currentStation.status;
            this.placesText.textContent = 'Places disponibles : ' + this.currentStation.bike_stands;
            this.availabilityText.textContent = 'Vélos disponibles : ' + this.currentStation.available_bikes;
        }

    };

    cancelReservation() {
        this.timer.stop();
        this.reservationText.textContent = "";
        this.canvas.clearCanvas();
        this.updateInfos();
        sessionStorage.removeItem('prenom');
        sessionStorage.removeItem('nom');
        sessionStorage.removeItem('station');
        sessionStorage.removeItem('reservationInProgress');
        this.canvas.clearCanvas();

    };
    resetReservation() {
        this.reservationForm.reset();
        this.currentStation = null;

        this.reservationForm.reset();
        this.updateInfos();
        this.canvas.clearCanvas();
    }

    checkReservationInProgress() {
        if (sessionStorage.getItem('reservationInProgress', true)) {
            const currentDate = new Date();
            //Current time in millisecondes
            const currentTimestamp = currentDate.getTime();
            // Last time registered by browser 
            const oldTimestamp = sessionStorage.getItem('time');

            //Ime passed during page refresh, converted to seconds
            const timeDiff = (currentTimestamp - oldTimestamp) / 1000;
            const minutes = sessionStorage.getItem('minutes');
            const secondes = sessionStorage.getItem('seconds');

            //Values to relaunch timer with 
            this.timer = new Timer(minutes, secondes - Math.round(timeDiff));
            this.timer.start();
            this.reservationText.textContent = "Vous avez reservé un vélo à " + sessionStorage.getItem('station');
        }
    }
}




