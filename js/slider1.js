class Slider {
    constructor(className, delay) {
        this.autoTimer = null;
        this.delay = delay;
        this.current = 0;
        this.previousButton = document.querySelector('.prev');
        this.nextButton = document.querySelector('.next');
        this.pauseButton = document.querySelector('.pause');
        this.playButton = document.querySelector('.play');
        this.slider = document.getElementsByClassName(className);
        this.activePhoto = this.slider[this.current];
        this.activePhoto.classList.add('visible');
        this.playButton.classList.add('hidden');

        //event listeners 
        this.nextButton.addEventListener('click', $event => {
            this.moveSlideForward();
        });
        this.previousButton.addEventListener('click', $event => {
        this.moveSlideBackward();
        });
        
        document.onkeydown = ($event) => {
            switch ($event.keyCode) {
                case 39: /*forward arrow*/
                    this.moveSlideForward();
                    break;
                case 37: /*backwards arrow*/
                    this.moveSlideBackward();
                    break;
            }
        }   
        this.pauseButton.addEventListener('click', () => {
            this.stop();
        });
        this.playButton.addEventListener('click', () => {
            this.start();
        });
    }
    //Functions 
    start() {
        this.pauseButton.classList.remove('hidden');
        this.playButton.classList.add('hidden');
        this.autoTimer = setInterval(() => {
        this.moveSlideForward();
        }, this.delay);
    }
    stop() {
        this.playButton.classList.remove('hidden');
        this.pauseButton.classList.add('hidden');
        clearInterval(this.autoTimer);
    }
    moveSlideForward = () => {
        this.activePhoto.classList.remove('visible');
        this.current++;
        if (this.current === this.slider.length) {
            this.current = 0;
            this.activePhoto = this.slider[this.current];
            this.activePhoto.classList.add('visible');
        }
        else {
            this.activePhoto = this.slider[this.current];
            this.activePhoto.classList.add('visible');
        }
    }
    moveSlideBackward = () => {
        this.activePhoto.classList.remove('visible');
        this.current--;
        if (this.current < 0) {
            this.current = this.slider.length - 1;
            this.activePhoto = this.slider[this.current];
            this.activePhoto.classList.add('visible');
        }
        else {
            this.activePhoto = this.slider[this.current];
            this.activePhoto.classList.add('visible');
        }
    }
}