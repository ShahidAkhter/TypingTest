const reset = async (IntegerTime) => {
    if (writer.value === ``) {
        return 0;
    }
    loader.style.opacity = "1";
    setTimeout(async () => {
        data = await AddingData(IntegerTime);
        text = await addInTextToWrite();
        DOMReset = await resettingDOM();
    }, 1);
    return 0;
}

const resettingDOM = async () => {
    writer.value = "";
    writer.select();
    speedComponent.value = `Speed`;
    accuracyComponent.innerHTML = `Accuracy`;
    clearInterval(timeInterval);
    time.value = `Timer`;
    startedTyping = true;
    timeSelector.disabled = false;
    subtractor = 0;
    actualCorrectTextTypedLen = 0;
    loader.style.opacity = "0";
    return 0;
}

const AddingData = async (IntegerTime) => {
    let min = Math.floor(IntegerTime / 60); // Calculate minutes
    let sec = IntegerTime % 60; // Calculate seconds

    const formattedMin = min < 10 ? `0${min}` : min; // Add leading zero if necessary
    const formattedSec = sec < 10 ? `0${sec}` : sec; // Add leading zero if necessary

    const timeTaken = `Timer: ${formattedMin}:${formattedSec}`;
    const speed = `Speed: ${speedComponent.value === "Speed" ? "0" : speedComponent.value}`;
    const accuracy = `Accuracy: ${accuracyComponent.innerHTML === "Accuracy" ? "0.00%" : accuracyComponent.innerHTML}`;

    turnNo += 1;
    const resultHTML = `
    <div class="background resultNav border-tb mt-4"><div class="name">TypingTest-${turnNo}</div></div>
    <div class="flex f-vertical-center f-col user-select-none">
      <div class="textResult text font-family-0 text-size-0">${textToWrite.innerHTML}</div>
      <div class="writerResult text font-family-0 text-size-0">${writer.value}</div>
      <div class="flex f-vertical-center f-horizontal-center f-wrap">
          <div class="timeTaken btns font-family-0">${timeTaken}</div>
          <div class="speedResults btns font-family-0">${speed}</div>
          <div class="accuracyResults btns font-family-0">${accuracy}</div>
      </div>
    </div>`;

    result.innerHTML += resultHTML;
    practiceScore.innerText = turnNo;
    if (writer.disabled) {
        writer.disabled = false;
    }
    return 0;
};


document.getElementById(`reset`).addEventListener('click', async () => {
    r = await reset((subtractor - 1));
    return 0;
})