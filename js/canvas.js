//Creating canvas in object form 

class Canvas {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.canvas.width = this.canvas.clientWidth; 
        this.canvas.height = this.canvas.clientHeight;
        this.ctx = this.canvas.getContext('2d');
        this.painting = false;
        this.touching = false;
        this.signaturePresent = false;
        this.ongoingTouches = [];

        //Event listeners 
        this.canvas.addEventListener('mousedown', ($event) => {
            this.startDrawing();
        });
    
        this.canvas.addEventListener('mouseup', ($event) => {
            this.stopDrawing();
        });
        this.canvas.addEventListener('mousemove', ($event) => {
            this.drawing($event);
        });
        
        this.canvas.addEventListener('touchstart', ($event) => {
            this.startDrawing();
        });
        this.canvas.addEventListener('touchend', () => {
            this.stopDrawing();
        });
        this.canvas.addEventListener('touchmove', ($event) => {
            this.tactileDrawing($event);
        });
    }
    
    startDrawing() {
            this.painting = true;
    }

    stopDrawing() {
        
            this.ctx.beginPath();
            this.painting = false;
        }
    
    drawing($event) {
            if (this.painting === false) {
                return; 
            } else {
            console.log($event);
            this.ctx.strokeStyle = 'black';
            this.ctx.lineCap = 'round';
            this.ctx.lineWidth = 2;
        
            this.ctx.lineTo($event.pageX - $event.currentTarget.offsetLeft, $event.pageY - $event.currentTarget.offsetTop);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo($event.pageX - $event.currentTarget.offsetLeft, $event.pageY - $event.currentTarget.offsetTop);
            this.ctx.closePath();
            this.signaturePresent = true;
            }
        }

    tactileDrawing($event) {
        $event.preventDefault();
        this.touches = $event.changedTouches;

        for (let i = 0; i < this.touches.length; i++) {
            this.ongoingTouches.push(this.touches[i]);
            
            if (this.painting === true) {
                this.ctx.strokeStyle = 'black';
                this.ctx.lineCap = 'round';
                this.ctx.lineWidth = 2;

                this.ctx.lineTo(this.touches[i].pageX - this.touches[i].target.offsetLeft, this.touches[i].pageY - this.touches[i].target.offsetTop);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(this.touches[i].pageX - this.touches[i].target.offsetLeft, this.touches[i].pageY - this.touches[i].target.offsetTop);
                this.ctx.closePath();
                this.signaturePresent = true;
            }
            else {
                return;
            }
        }
    }
   
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.signaturePresent = false;
    }
  
};
