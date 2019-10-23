'use strict'

let canvas;
let gCtx;

function init() {
    createCanvas()
    gMeme = createMeme()
    renderTxtsEditor()
}

function renderTxtsEditor() {
    var strHtml = gMeme.txts.map(function (txt, idx) {
        return `
                  <p>
                  <button class="clear" onclick="switchLines()">Switch Lines</button>
                  <br>
                    <input type="text" data-property="line" placeholder="${txt.line}" oninput="editTxt(this,${idx})">
                    <br><br>
                    <input type="range" value="${txt.size}"  min="10" step="2" data-property="size" oninput="editTxt(this ,${idx})">
                    <input type="color" value="${txt.color}" data-property="color" oninput="editTxt(this,${idx})">
                   </i>
                    <br> <br>
                    <select data-property="font" oninput="editTxt(this,${idx})">
                    <option value="${txt.font}">${txt.font}</option>
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Verdana">Verdana</option>
                     <option value="Tahoma">Tahoma</option>
                    <option value="Geneva">Geneva</option>
                    </select>
                     <br><br>
                    <p>
                   <input class ="moveText" type="number" value="${txt.x}"  min="0" step="5" data-property="x" oninput="editTxt(this ,${idx})">
                   <br>
                    <input class ="moveText" type="number" value="${txt.y}"  min="0" step="5" data-property="y" oninput="editTxt(this ,${idx})">
                    </p>
                   <br>
                      <select data-property="align" oninput="editTxt(this,${idx})">
                      <option value="${txt.alignLeft}">Right</option>
                      <option value="${txt.alignRight}">Left</option>
                      <option value="${txt.alignCenter}">Center</option>
                     </select>
                    <br>
                    </p>
                    <br>
                    `
    })
        .join(' ');

    document.querySelector('.choice-wrapper').innerHTML = strHtml;
}

function editTxt(elinput, txtIdx) {
    var property = elinput.dataset.property;
    var value;
    switch (elinput.type) {
        case 'select':
            value = elinput.options[elinput.selectedIndex].value;
            break;
        default:
            value = elinput.value;
            break;
    }
    gMeme.txts[txtIdx][property] = value;
    createCanvas();
}

function createCanvas() {
    var imgId = onLoadImg();
    canvas = document.querySelector('#my-canvas');
    gCtx = canvas.getContext("2d");
    var img = new Image()
    img.src = `img/${imgId}.jpg`
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, canvas.height, canvas.width);
        gMeme.txts.forEach(function (txt) {
            drawTxt(txt);
        });
    }
}

function drawTxt(txt) {
    gCtx.font = txt.size + 'px' + ' ' + txt.font;
    gCtx.textAlign = txt.align;
    gCtx.fillStyle = txt.color;
    gCtx.fillText(txt.line, txt.x, txt.y);
}

// function newTxtBtnClicked() {
//     gMeme.txts.push(createTxt('New Line', 150, 150));
//     renderTxtsEditor();
//     createCanvas()
// }


// inside the strHtml under the <br>
//     <button  data-trans="addLine" class="btn"onclick="newTxtBtnClicked()">
//  <i class="fas fa-plus"></i> Add Line
//     </button>

function downloadCanvas(elLink) {
    var data = canvas.toDataURL();
    elLink.href = data;
}

function onLoadImg() {
    var imgId = loadFromStorage('img')
    return imgId
}

function onClearCanvas() {
    clearCanvas();
}

function renderCanvas(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    gCtx.drawImage(img, 0, 0);
}