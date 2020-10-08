interface IReply {
    responseData: IResponse;
}

interface IResponse {
    translatedText: string;
}

let runOnce: boolean = false;
async function Translate(){
    const container = document.getElementById("languageContainer");

    (document.getElementById("addLanguage") as HTMLButtonElement).disabled = true;
    let userInput: string = (document.getElementById("userInput") as HTMLInputElement).value;
    const sourceLanguageDropdown = document.getElementById("sourceLanguage") as HTMLSelectElement;
    const sourceLanguageIndex: number = sourceLanguageDropdown.selectedIndex;
    const sourceLanguage = String((sourceLanguageDropdown[sourceLanguageIndex]).id);
    
    let textToTranslate: string = userInput;
    let currentSourceLanguage = sourceLanguage;
    let currentTranslatedText = "";
    let currentTargetLanguage = "";
    for (let i in targetLanguages){
        currentTargetLanguage = targetLanguages[i];
        let currentTargetTextbox = "targetLanguage" + String(Number(i)+1);
        currentTranslatedText = await SendRequest(textToTranslate, currentSourceLanguage, currentTargetLanguage);
        (document.getElementById(currentTargetTextbox) as HTMLInputElement).value = currentTranslatedText;
        textToTranslate = currentTranslatedText;
        currentSourceLanguage = currentTargetLanguage;
    }    
    const br = document.createElement("br");
        container.appendChild(br);
        const translatedTextLabel = document.createElement('label') as HTMLLabelElement;
        translatedTextLabel.innerText = "Translated Text: ";
        container.appendChild(translatedTextLabel);

    const translatedTextTextbox = document.createElement('input') as HTMLInputElement;
    translatedTextTextbox.id = "translatedTextTextbox";
    let finishedTranslation = await SendRequest(currentTranslatedText, currentTargetLanguage, sourceLanguage);
    translatedTextTextbox.value = finishedTranslation;
    container.appendChild(translatedTextTextbox);

    runOnce = true;
}

let targetLanguages:Array<string> = [];
function AddLanguage(){    
    (document.getElementById("translateButton")as HTMLButtonElement).disabled = false;
    let container = document.getElementById("languageContainer");
    if (!container){
        const body = document.getElementsByTagName('body')[0];
        container = document.createElement("div");
        container.id = "languageContainer";
        body.appendChild(container);
    }    

    (document.getElementById("resetButton")as HTMLButtonElement).disabled = false;
    const targetLanguageDropdown = document.getElementById("targetLanguage") as HTMLSelectElement;
    const targetLanguageIndex:number = targetLanguageDropdown.selectedIndex;
    const targetLanguage = String((targetLanguageDropdown[targetLanguageIndex]).innerText);

    const br = document.createElement("br");
    container.appendChild(br);

    const newLanguageLabel = document.createElement('label') as HTMLLabelElement;
    newLanguageLabel.innerText = targetLanguage + ": ";
    newLanguageLabel.style.whiteSpace = "pre";
    container.appendChild(newLanguageLabel);

    const newLanguageTextbox = document.createElement('input') as HTMLInputElement;
    targetLanguages.push(String((targetLanguageDropdown[targetLanguageIndex]).id));
    newLanguageTextbox.id = "targetLanguage" + String(targetLanguages.length);
    container.appendChild(newLanguageTextbox);
    
    container.appendChild(br.cloneNode(true));
}

async function SendRequest(sourceText: string, sourceLanguage: string, targetLanguage: string){
    let url = "https://api.mymemory.translated.net/get?q=" + sourceText + "&langpair=" + sourceLanguage + "|" + targetLanguage + "&key=ec5998c506419c76047e";
    var data = await fetch(url);
    const reply = await data.json() as IReply;
    return reply.responseData.translatedText;
}
function Reset(){
    (document.getElementById("resetButton")as HTMLButtonElement).disabled = true;
    (document.getElementById("addLanguage") as HTMLButtonElement).disabled = false;
    (document.getElementById("translateButton")as HTMLButtonElement).disabled = true;
    document.getElementById("languageContainer").remove();
    const userInputTextbox = document.getElementById("userInput") as HTMLSelectElement;
    userInputTextbox.value = "";
    userInputTextbox.focus();
    targetLanguages = [];
}