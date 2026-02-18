let webname = document.getElementById(`webname`);
let textToWrite = document.getElementById(`textToWrite`);
let timeSelector = document.getElementById(`timeSelector`);
let time = document.getElementById(`times`);
let writer = document.getElementById(`writer`);
let accuracyComponent = document.getElementById(`accuracy`);
let speedComponent = document.getElementById(`speed`);
let result = document.getElementById(`result`);
let printer = document.getElementById(`printer`);
let viewPractices = document.getElementById(`viewPractices`);
let viewTypingTab = document.getElementById(`viewTypingTab`);
let practiceScore = document.getElementById(`practiceScore`);
let loader = document.getElementById(`loader`);
loader.style.opacity = "0";

let randomNum = Math.floor(Math.random() * paragraphs.length);
let ActualTime = parseInt(timeSelector.value);
let actualCorrectTextTypedLen = 0;
let maxMinTime = ActualTime;
let maxIntegerTime = maxMinTime * 60;
let timeIs = "00:00";
let subtractor = 0;
let IntegerTime = 0;
let turnNo = 0;
let str = "a";
let timeInterval = 'NaN';
let startedTyping = true;

writer.select();
const addInTextToWrite = async () => {
    loader.style.opacity = "1";
    textToWrite.innerHTML = "";
    for (let i = 0; i < paragraphs[randomNum].length; i++) {
        textToWrite.innerHTML += `<span id="textToWriteText${turnNo}${str}${i}">${paragraphs[randomNum][i]}</span>`;
    }
    // textToWrite.innerHTML += `<div>\n</div>`;
    document.getElementById(`textToWriteText${turnNo}${str}0`).classList.add('currentTextWrite')
    if (randomNum === paragraphs.length - 1) {
        randomNum = 0;
    } else {
        randomNum += 1;
    }
    return 0;
}

const timer = (maxInteger, subtracts, writerComponent) => {
    const integerTime = maxInteger - subtracts;
    let minutes = Math.floor(integerTime / 60);
    let seconds = integerTime % 60;

    if (integerTime <= 0) {
        writerComponent.disabled = true;
        timeSelector.disabled=false;
        clearInterval(timeInterval);
        return "00:00";
    }

    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    const timerArrangedLen = `${minutes}:${seconds}`;
    return timerArrangedLen;
};


const displayTime = () => {
    timeIs = timer(maxIntegerTime, subtractor, writer);
    time.value = timeIs;
    subtractor += 1;
}



// dividing the number of correct keys pressed by the total number of keys pressed, and multiply by 100
const accuracyCalc = async (component, typedText) => {
    let correctKeystrokes = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] == component[i]) {
            correctKeystrokes++;
        }
    }
    let accuracy = (correctKeystrokes / typedText.length) * 100;
    let actualAccuracy = (correctKeystrokes / actualCorrectTextTypedLen) * 100;
    if (typedText.length <= 0) {
        accuracy = 0;
    }
    if (actualAccuracy <= 0 || !isFinite(actualAccuracy)|| isNaN(actualAccuracy)) {
        actualAccuracy = 0;
    }
    return `${accuracy.toFixed(2)}%<span style="font-size:20px;">/${actualAccuracy.toFixed(2)}%<span>`;
}

// {text.split(/\s+/).filter((element)=>{return element.length!==0}).length}
const speedCalc = async (typedText, subtracts) => {
    NoOfWords = typedText.split(/\s+/).filter((element) => { return element.length !== 0 }).length;
    let time = subtracts / 60;
    let WPM = Math.floor(NoOfWords / time);
    if (!isFinite(WPM)) {
        WPM = 0;
    }
    return WPM;
}



timeSelector.addEventListener('change', async () => {
    ActualTime = parseInt(timeSelector.value);
    actualCorrectTextTypedLen = 0;
    maxMinTime = ActualTime;
    maxIntegerTime = maxMinTime * 60;
})

writer.addEventListener('keydown', async () => {
    if (startedTyping) {
        timeInterval = setInterval(displayTime, 1000);
        startedTyping = false;
        timeSelector.disabled=true;
    }
    setTimeout(async () => {
        awaitening = await CorrectIncorrect();
        accuracyComponent.innerHTML = await accuracyCalc(textToWrite.innerText, writer.value);
        speedComponent.value = await speedCalc(writer.value, subtractor)
    }, 1);
})

viewPractices.addEventListener('click',()=>{
    if (result.innerHTML=="") {
        return 0;
    }
    Array.from(document.getElementsByClassName(`printNone`)).forEach(element => {
        element.classList.add("display-none");
    });
    Array.from(document.getElementsByClassName(`printYes`)).forEach(element => {
        element.classList.remove("display-none");
    });
    webname.innerText="TypingTest-Practices";
})

viewTypingTab.addEventListener('click',()=>{
    Array.from(document.getElementsByClassName(`printNone`)).forEach(element => {
        element.classList.remove("display-none");
    });
    Array.from(document.getElementsByClassName(`printYes`)).forEach(element => {
        element.classList.add("display-none");
    });
    writer.select();
    webname.innerText="TypingTest";
})

writer.addEventListener('input', () => {
    actualCorrectTextTypedLen += 1;
})

addInTextToWrite();
loader.style.opacity = "0";


const scrollToTopButton = () => {
    window.onscroll = function () { scrollTopFunction() };
}
const scrollTopFunction = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 200) {
        document.getElementById('moveToTop').style.display = "flex";
    } else {
        document.getElementById('moveToTop').style.display = "none";
    }
}
document.getElementById('moveToTop').addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

scrollToTopButton()