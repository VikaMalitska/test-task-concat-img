

class InputElementFile{
    constructor({elem}){
        elem.addEventListener("change", this.onChange.bind(this));
    }
    onChange (event){
        let elem = event.target;
        let files = elem.files;
        let img = this.getImage(files);
        img.onload = ()=> {
            window.URL.revokeObjectURL(this.src);
            this.getCanvasEl().drawImage(img,10, 10, 150, 150);
        }

    }
   
    getCanvasEl(){
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        return ctx;
    }

    getImage(files){
        let img;
        for (var i = 0; i < files.length; i++) {
            let file = files[i];
            img = new Image();
            img.src = window.URL.createObjectURL(file);
        }
        return img;
    }

}




let inputElementFile = new InputElementFile({
    elem: document.getElementById("image")
})