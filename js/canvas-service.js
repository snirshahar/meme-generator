'use strict'

let gMeme;
let gUpload;

function createMeme() {
   return {
      txts: [
         createTxt('Enter Text Here', 200, 75), createTxt('Enter Text Here', 200, 500)]
   };
}

function createTxt(line, x, y) {
   return {
      line: line,
      size: 30,
      align: 'left',
      color: '#ffffff',
      font: 'Impact',
      strokeStyle: 'black',
      x: x,
      y: y,
      alignCenter: 'center',
      alignRight: 'right'
   };
}

function doUploadImg(elForm, onSuccess) {
   var formData = new FormData(elForm);
   fetch('http://ca-upload.com/here/upload.php', {
      method: 'POST',
      body: formData
   })
      .then(function (response) {
         return response.text()
      })
      .then(onSuccess)
      .catch(function (error) {
         console.error(error)
      })
}

function switchLines() {
document.querySelector('')
gMeme.txts[0].line = gMeme.txts[1].line
}

function clearCanvas() {
   gMeme.txts[0].line = 'Enter Text Here';
   gMeme.txts[1].line = 'Enter Text Here';
   renderTxtsEditor();
   createCanvas();
}