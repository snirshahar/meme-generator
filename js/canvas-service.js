'use strict'

let gMeme;
let gUpload;

function createMeme() {
   return {
      txts: [
         createTxt('Enter Text Here', 320, 75), createTxt('Enter Text Here', 320, 535)]
   };
}

function createTxt(line, x, y) {
   return {
      line: line,
      size: 30,
      align: 'center',
      color: '#ffffff',
      font: 'Impact',
      strokeStyle: 'black',
      x: x,
      y: y,
      alignLeft: 'left',
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

function clearCanvas() {
   gMeme.txts[0].line = 'Enter Text Here';
   gMeme.txts[1].line = 'Enter Text Here';
   renderTxtsEditor();
   createCanvas();
}

function handleImageFromInput(ev, onImageReady) {
   document.querySelector('.share-container').innerHTML = ''
   var reader = new FileReader();
   reader.onload = function (event) {
      var img = new Image();
      img.onload = onImageReady.bind(null, img)
      img.src = event.target.result;
      img.onload = function () {
         gCtx.drawImage(img, 0, 0, canvas.height, canvas.width);
         gMeme.txts.forEach(function (txt) {
            drawTxt(txt);
         });
      }
   }
   reader.readAsDataURL(ev.target.files[0]);
}

function uploadImg(elForm, ev) {
   ev.preventDefault();

   document.getElementById('imgData').value = canvas.toDataURL("image/jpeg");

   function onSuccess(uploadedImgUrl) {
      console.log('uploadedImgUrl', uploadedImgUrl);

      uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
      document.querySelector('.share-container').innerHTML = `
        <a class="w-inline-block social-share-btn fb" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
   }

   doUploadImg(elForm, onSuccess);
}

// facebook api
(function (d, s, id) {
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) return;
   js = d.createElement(s); js.id = id;
   js.src = 'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v3.0&appId=807866106076694&autoLogAppEvents=1';
   fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));