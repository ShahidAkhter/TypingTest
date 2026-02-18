const CorrectIncorrect = async () => {
    let firstCharacterToType=document.getElementById(`textToWriteText${turnNo}${str}0`)
    let textWritten = document.getElementById(`textToWriteText${turnNo}${str}${writer.value.length - 1}`);
    let nextTextWritten = document.getElementById(`textToWriteText${turnNo}${str}${writer.value.length}`);
    if(!textWritten){
        firstCharacterToType.classList.add('currentTextWrite')
        return 0;
    }
    if (!nextTextWritten) {
        return 0;
    }
    // console.log(writerLength)
    textWritten.classList.remove('currentTextWrite');
    if (writer.value.length == 1) {
        firstCharacterToType.classList.remove('currentTextWrite');
    }
    nextTextWritten.classList.add('currentTextWrite');
    if (textWritten.innerText != writer.value[writer.value.length - 1]) {
        textWritten.classList.remove('correctCharcter');
        textWritten.classList.add('incorrectCharcter');
    } else {
        textWritten.classList.remove('incorrectCharcter');
        textWritten.classList.add('correctCharcter');
    }
    return 0;
}