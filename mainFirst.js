class InputFileApp {
  constructor({ inputEl, canvasEl }) {
    inputEl.addEventListener("change", this.onChange.bind(this));
    this.inputFile = new InputElementFile({ inputEl });
    this.canvasElement = new CanvasElement({ canvasEl });
    this.galery = new Galery();
  }
  onChange() {
    //resive files from input type="file"
    const imgArr = this.inputFile.getFiles();
    //add selected files to gallery
    let imgsArr = this.galery.getImages({ files: imgArr });
    //draw selected files
    this.canvasElement.drawImageInCanvas(imgArr);
  }
}

class InputElementFile {
  constructor({ inputEl }) {
    this.element = inputEl;
  }
  getFiles() {
    //receive a FileList object containing File objects representing the files selected by the user.
    let files = this.element.files;
    let imgs = [];
    for (var i = 0; i < files.length; i++) {
      let file = files[i];
      //create a new Image for each file()
      imgs[i] = new Image(60, 45);
      imgs[i].src = window.URL.createObjectURL(file);
    }
    return imgs;
  }
}

class CanvasElement {
  constructor({ canvasEl }) {
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.canvasEl = canvasEl;
    this.canvasEl.width = this.WIDTH;
    this.canvasEl.height = this.HEIGHT;
    this.ctx = this.canvasEl.getContext("2d");
    this.x = 10;
    this.y = 10;
    this.imageHeight = 110;
    this.imageWidh = 150;
    this.imageRows = Math.floor((this.HEIGHT - 10) / (this.imageHeight + 10));
    this.imageСolum = Math.floor((this.WIDTH - 10) / (this.imageWidh + 10));
    this.imageСolumCount = 0;
    this.imageRowsCount = 0;
  }
  drawImageInCanvas(imgArr) {
    for (let i = 0; i < imgArr.length; i++) {
      imgArr[i].onload = () => {
        if (this.imageСolumCount >= this.imageСolum) {
          this.y = this.y + this.imageHeight + 10;
          this.x = 10;
          this.imageСolumCount = 0;
          this.imageRowsCount++;
        }
        if (this.imageRows <= this.imageRowsCount) {
          let imageData = this.ctx.getImageData(
            10,
            10,
            this.WIDTH,
            this.HEIGHT
          );
          this.canvasEl.height = this.HEIGHT * 2;
          this.ctx.putImageData(imageData, 10, 10);
          this.imageRowsCount = 0;
        }
        this.ctx.drawImage(
          imgArr[i],
          this.x + 10,
          this.y + 15,
          this.imageWidh,
          this.imageHeight
        );
        this.x = this.x + this.imageWidh + 10;
        this.imageСolumCount = this.imageСolumCount + 1;
      };
    }
  }
}

class Galery {
  constructor() {
    this.images = [];
  }

  getImages({ files }) {
    let copyFiles = files.slice();
    this.images = [...this.images, ...copyFiles];
    return this.images;
  }
}
new InputFileApp({
  inputEl: document.getElementById("image"),
  canvasEl: document.getElementById("canvas")
});
