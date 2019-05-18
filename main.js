class InputFileApp{
    constructor({element1, element2}){
        element1.addEventListener("change", this.onChange.bind(this))
        this.inputFile = new InputElementFile({element1});
        this.canvasElement = new CanvasElement({element2});
    }
    onChange(){
        const imgArr = this.inputFile.getImages();
        this.canvasElement.drawImageInCanvas(imgArr);
    }
} 



class InputElementFile{
    constructor({element1}){
        this.element = element1;
        //this.files = this.element.files;
    }
    getImages(){
        let files = this.element.files;
        let imgs = [];
        for (var i = 0; i < files.length; i++) {
            let file = files[i];
            imgs[i] = new Image();
            imgs[i].src = window.URL.createObjectURL(file);
        }
        return imgs;
    }

}

class CanvasElement {
    constructor({element2}){
        this.canvasEl = element2;
        this.ctx = this.canvasEl.getContext('2d');
    }
    drawImageInCanvas(imgArr){
        for(let i = 0; i < imgArr.length; i++){
            imgArr[i].onload = ()=> {
                window.URL.revokeObjectURL(this.src);
                this.ctx.drawImage(imgArr[i],10, 10, 150, 150);
            }
        }
    }

}


new InputFileApp({element1: document.getElementById("image"), element2: document.getElementById("canvas")});