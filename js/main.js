//Create variables from classes
class App {
    constructor() {
        this.mySlider = new Slider('slider-diapo', 5000);
        this.mySlider.start();
        this.appReservation = new Reservation("Nantes");
        this.appReservation.checkReservationInProgress();
        this.map = new MyMap("Nantes", 47.217567, -1.541089, "mapid");
    }
}

let myApp;

window.addEventListener("load", () => {
    myApp = new App();
});