'use strict'

var gImgs;
var gFilterBy;
var gCurrImg;

var gKeywords;

var gImgs = [
    { id: 1, keywords: ['dance'] },
    { id: 2, keywords: ['trump'] },
    { id: 3, keywords: ['kissing'] },
    { id: 4, keywords: ['baby'] },
    { id: 5, keywords: ['baby'] },
    { id: 6, keywords: ['cat'] },
    { id: 7, keywords: ['leo'] },
    { id: 8, keywords: ['imagine'] },
    { id: 9, keywords: ['baby'] },
    { id: 10, keywords: ['matrix'] },
    { id: 11, keywords: ['listen'] },
    { id: 12, keywords: ['pointing'] },
    { id: 13, keywords: ['imagine'] },
    { id: 14, keywords: ['mrevil'] },
    { id: 15, keywords: ['dance'] },
    { id: 16, keywords: ['trump'] },
    { id: 17, keywords: ['baby'] },
    { id: 18, keywords: ['dance'] },
    { id: 19, keywords: ['peace'] },
    { id: 20, keywords: ['kissing'] },
    { id: 21, keywords: ['laughing'] },
    { id: 22, keywords: ['pointing'] },
    { id: 23, keywords: ['laughing'] },
    { id: 24, keywords: ['putin'] },
    { id: 25, keywords: ['imagine'] },
];

function createKeyWords() {
    gKeywords = loadKeyWords();
    if (!gKeywords) {
        gKeywords = { 'baby': 4, 'peace': 1, 'matrix': 1, 'leo': 1, 'cat': 1, 'trump': 2, 'dance': 3, 'mrevil': 1, 'laughing': 2, 'imagine': 3, 'kissing': 2, 'listen': 1, 'pointing': 2 }
    }
}

function saveImg(imgId) {
    saveToStorage('img', imgId)
    // window.location.href = "canvas-editor.html";
}

function getImages() {

    return gImgs;
}

function setFilter(txt) {
    gFilterBy = txt;
}

function getImgsForDisplay() {
    if (!gFilterBy) return gImgs;
    var myRe = new RegExp('^' + `${gFilterBy}`, 'i');
    var filterImages = gImgs.filter(function (img) {
        return myRe.exec(img.keywords);
    })
    return filterImages;
}
function setNewSearchwWord(word) {
    if (!gKeywords[word]) gKeywords[word] = 1;
    else gKeywords[word]++;
    saveKeyWords()

}

function getKeyWords() {
    return gKeywords;
}

function saveKeyWords() {
    saveToStorage('keyWords', gKeywords)
}

function loadKeyWords() {
    return loadFromStorage('keyWords')
}