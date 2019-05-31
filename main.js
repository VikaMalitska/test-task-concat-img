class InputFileApp{
    constructor({inputEl, canvasEl}){
        this.countEl = 1;
        for(let i = 0; i < inputEl.length; i++){
            inputEl[i].setAttribute("number", this.countEl);
            console.log(inputEl[i].getAttribute('number'));
            this.countEl = this.countEl + 1;
        }
        document.getElementById("inputfile").addEventListener("change", this.onChange.bind(this));
        this.canvasElement = new CanvasElement({canvasEl});
    
        ///this.inputEl = new InputElementFile({inputElLeft});
        //this.inputElRight = new InputElementFile({inputElRight});
        //this.canvasElement = new CanvasElement({canvasEl});
        //this.galery = new Galery();
    }
    onChange(){
        let element = event.target;
        let img = this.getImg(element);
        this.canvasElement.drawImageInCanvas(img, element);
        
        //resive files from input type="file" 
        //const imgArr = this.inputFile.getFiles();
        //add selected files to gallery 
        //let imgsArr = this.galery.getImages({files: imgArr});
        //draw selected files
        this.canvasElement.drawImageInCanvas(img);
    }
    getImg(element){
        let file = element.files[0];
        let img = new Image();
        img.src = window.URL.createObjectURL(file);
        return img;
    }
}
class CanvasElement{
    constructor({canvasEl}){
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
        this.canvasEl = canvasEl;
        this.canvasEl.width = this.WIDTH;
        this.canvasEl.height = this.HEIGHT;
        this.ctx = this.canvasEl.getContext('2d');
        //this.x = 10;
        //this.y = 10;
    }
    drawImageInCanvas(img, element){
        img.onload = () =>{
            let ratio = img.width / img.height;
            let imgInCanvasWidth = this.canvasEl.width / 2;
            let imgInCanvasHeigth = imgInCanvasWidth / ratio;
            //console.log(element.getAttribute("number"));
            this.ctx.drawImage(img, 0, 0, imgInCanvasWidth, imgInCanvasHeigth);
        }
    }
}
class Galery{
    constructor(){
        this.images = {};
    }
}
console.log(document.querySelectorAll("input"));
new InputFileApp({inputEl: document.querySelectorAll("input"), canvasEl: document.getElementById("canvas")});
