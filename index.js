let runOnce = false;
async function Translate() {
    const container = document.getElementById("languageContainer");
    document.getElementById("addLanguage").disabled = true;
    let userInput = document.getElementById("userInput").value;
    const sourceLanguageDropdown = document.getElementById("sourceLanguage");
    const sourceLanguageIndex = sourceLanguageDropdown.selectedIndex;
    const sourceLanguage = String((sourceLanguageDropdown[sourceLanguageIndex]).id);
    let textToTranslate = userInput;
    let currentSourceLanguage = sourceLanguage;
    let currentTranslatedText = "";
    let currentTargetLanguage = "";
    for (let i in targetLanguages) {
        currentTargetLanguage = targetLanguages[i];
        let currentTargetTextbox = "targetLanguage" + String(Number(i) + 1);
        currentTranslatedText = await SendRequest(textToTranslate, currentSourceLanguage, currentTargetLanguage);
        document.getElementById(currentTargetTextbox).value = currentTranslatedText;
        textToTranslate = currentTranslatedText;
        currentSourceLanguage = currentTargetLanguage;
    }
    const br = document.createElement("br");
    if (runOnce) {
        let textbox = document.getElementById("translatedTextTextbox");
        textbox.remove();
    }
    else {
        container.appendChild(br);
        const translatedTextLabel = document.createElement('label');
        translatedTextLabel.innerText = "Translated Text: ";
        container.appendChild(translatedTextLabel);
    }
    const translatedTextTextbox = document.createElement('input');
    translatedTextTextbox.id = "translatedTextTextbox";
    let finishedTranslation = await SendRequest(currentTranslatedText, currentTargetLanguage, sourceLanguage);
    translatedTextTextbox.value = finishedTranslation;
    container.appendChild(translatedTextTextbox);
    runOnce = true;
}
let targetLanguages = [];
function AddLanguage() {
    document.getElementById("translateButton").disabled = false;
    let container = document.getElementById("languageContainer");
    if (!container) {
        const body = document.getElementsByTagName('body')[0];
        container = document.createElement("div");
        container.id = "languageContainer";
        body.appendChild(container);
    }
    document.getElementById("resetButton").disabled = false;
    const targetLanguageDropdown = document.getElementById("targetLanguage");
    const targetLanguageIndex = targetLanguageDropdown.selectedIndex;
    const targetLanguage = String((targetLanguageDropdown[targetLanguageIndex]).innerText);
    const br = document.createElement("br");
    container.appendChild(br);
    const newLanguageLabel = document.createElement('label');
    newLanguageLabel.innerText = targetLanguage + ": ";
    newLanguageLabel.style.whiteSpace = "pre";
    container.appendChild(newLanguageLabel);
    const newLanguageTextbox = document.createElement('input');
    targetLanguages.push(String((targetLanguageDropdown[targetLanguageIndex]).id));
    newLanguageTextbox.id = "targetLanguage" + String(targetLanguages.length);
    container.appendChild(newLanguageTextbox);
    container.appendChild(br.cloneNode(true));
}
async function SendRequest(sourceText, sourceLanguage, targetLanguage) {
    let url = "https://api.mymemory.translated.net/get?q=" + sourceText + "&langpair=" + sourceLanguage + "|" + targetLanguage + "&key=ec5998c506419c76047e";
    var data = await fetch(url);
    const reply = await data.json();
    return reply.responseData.translatedText;
}
function Reset() {
    document.getElementById("resetButton").disabled = true;
    document.getElementById("addLanguage").disabled = false;
    document.getElementById("translateButton").disabled = true;
    document.getElementById("languageContainer").remove();
    const userInputTextbox = document.getElementById("userInput");
    userInputTextbox.value = "";
    userInputTextbox.focus();
}
//# sourceMappingURL=index.js.map