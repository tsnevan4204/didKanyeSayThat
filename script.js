const quoteContainer = document.getElementById('quote-goes-here')
let currentQuote;
let correct = 0;
let total = 0;
let percent = 0;
let previousPercent = 0;
const kanyeButton = document.getElementById("yes")
const otherButton = document.getElementById("no")
const bar = document.getElementById('myBar')
const totalBar = document.getElementById('total-bar')
const authorP = document.getElementById('author-p')
const reactionImage = document.getElementById('reaction-image')

// SET UP PAGE

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

async function getKanyeQuote() {
    const responseJSON =  await fetch('https://api.kanye.rest/')
    const response = responseJSON.json()
    return response
}

async function pullKanyeQuote() {
    let kanyeQuote = await getKanyeQuote()
    kanyeQuote.author = 'Kanye West'
    return kanyeQuote
}

async function getOtherQuote() {
    const responseJSON =  await fetch('https://gist.githubusercontent.com/shakked/f56894535c7292c4d6c6/raw/a7c5fa1065bca1ab4790fd06ba0f84ade4c263b2/funnyQuotes.json')
    const response = responseJSON.json()
    return response
}

async function pullOtherQuote() {
    rawQuotes = await getOtherQuote()
    randInt = getRndInteger(0,100)
    return rawQuotes[randInt]
}

async function chooseQuote() {
    let theQuote;
    randomBinary = getRndInteger(0, 1)
    const kanyeQuote = await pullKanyeQuote()
    const otherQuote = await pullOtherQuote()
    if(randomBinary == 1) {
        theQuote = kanyeQuote
    } else {
        theQuote = otherQuote
    }
    return theQuote;
}

function setUpPage(quoteClass) {
    quoteContainer.innerText = quoteClass.quote
    quoteContainer.appendChild(authorP)
    authorP.innerText=""
}

(async () => {
    currentQuote = await chooseQuote();
    setUpPage(currentQuote)
})()

// BUTTONS

function forBothButtons() {
    kanyeButton.disabled = true
    otherButton.disabled = true
    authorP.innerText = '- ' + currentQuote.author
    authorP.className += 'author-p'
    total++
}

function checkIfKanye() {
    forBothButtons()
    if(currentQuote.author == 'Kanye West') {
        correct += 1
        reactionImage.innerHTML = "<image src='kanyeHappy.jpg' width='400px'>" 
    } else {
        reactionImage.innerHTML = "<image src='kanyeSad.jpg' width='400px'>"
    }
}

function checkIfOther() {
    forBothButtons()
    if(currentQuote.author !== 'Kanye West') {
        correct +=1
        reactionImage.innerHTML = "<image src='kanyeHappy.jpg' width='400px'>" 
    } else {
        reactionImage.innerHTML = "<image src='kanyeSad.jpg' width='400px'>"
    }
}

function move() {
    var width = previousPercent*800;
    var id = setInterval(frame, .5);
    var idealWidth = percent*800
    console.log(width)
    console.log(idealWidth)
    function frame() {
        if (width == idealWidth) {
            clearInterval(id);
        } else if (idealWidth<width) {
            console.log('fuck uou butich')
            width--; 
            bar.style.width = width+'px'; 
        } else if (idealWidth>width) {
            width++; 
            console.log('shitass')
            bar.style.width = width+'px'; 
        }
    }
}

function renderBar() {
    previousPercent = percent;
    percent = Math.round(correct/total*100)/100
    move()
    bar.innerText=Math.floor(percent*100)+'%'
    bar.style.display = 'block'
    totalBar.style.display = 'block'
}

async function nextQuote() {
    currentQuote = await chooseQuote()
    setUpPage(currentQuote)
    kanyeButton.disabled = false
    otherButton.disabled = false
}