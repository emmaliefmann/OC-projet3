class Timer {
    constructor(minutes, seconds) {
        this.textid = document.getElementById('timer');
        this.startMinutes = minutes;
        this.startSeconds = seconds;
        this.minutes = minutes;
        this.seconds = seconds;
        this.reservationForm = document.getElementById('reservationform');
    }
    countdown() {
        this.seconds--;
        if (this.seconds < 0) {
            this.seconds = 59;
            this.minutes--;
        }
        let s = this.seconds;
        let m = this.minutes;
        if (m < 10) m = '0' + m;
        if (s < 10) s = '0' + s;

        this.textid.textContent = m + ':' + s;
        if (this.seconds <= 0 && this.minutes <= 0) {
            this.stop();
            myApp.appReservation.resetReservation();
            this.textid.textContent = "Reservation expired";
        }
        this.currentDate = new Date();
        // save timestamp, minutes and seconds
        sessionStorage.setItem('time', this.currentDate.getTime())
        sessionStorage.setItem('minutes', this.minutes);
        sessionStorage.setItem('seconds', this.seconds);
    }

    start() {
        //If a timer is already going, stop that timer, and reset with values from constructor. 
        clearInterval(this.interval);
        if (sessionStorage.getItem('reservationInProgress', false)) {
            this.minutes = this.startMinutes;
            this.seconds = this.startSeconds;
            this.interval = setInterval($event => this.countdown(), 1000);
        } else {
            this.interval = setInterval($event => this.countdown(), 1000);
        }
    }

    stop() {
        clearInterval(this.interval);
        this.minutes = 0;
        this.seconds = 0;
        this.textid.textContent = "";
        sessionStorage.removeItem('time');
        sessionStorage.removeItem('minutes');
        sessionStorage.removeItem('seconds');
    }
};
