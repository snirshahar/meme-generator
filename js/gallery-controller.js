'use strict'

function onInit() {
    createKeyWords();
    renderImages();
    renderKeyWords();
}

function renderImages() {
    var imgs = getImgsForDisplay();
    var strHtml = '';
    for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        strHtml += `<div class="item">
                    <a class="gallery-item" href="canvas-editor.html" onclick= "onSaveImg(${img.id})" >
                    <img src="./img/${img.id}.jpg" alt=""></a>
                </div>`
    }
    var elGallery = document.querySelector('.container');
    elGallery.innerHTML = strHtml;
}

function renderKeyWords() {
    var currKeyWords = getKeyWords();
    var strHtml = ''
    for (var currKey in currKeyWords) {
        var currValue = currKeyWords[currKey];
        var wordSize = currValue * 15 + 'px';
        strHtml += `<li  onclick="onSetFilterByKeyword('${currKey}')" style="font-size:${wordSize}">&nbsp${currKey}&nbsp </li>`
    }
    document.querySelector('.key-words-list').innerHTML = strHtml;
}

function onSaveImg(elImgIdx) {
    saveImg(elImgIdx)
}

function onSetFilter(elTxt) {
    var text = elTxt.value
    setFilter(text);
    renderImages();
}

function onSetFilterByKeyword(txt) {
    setFilter(txt);
    renderImages();
}