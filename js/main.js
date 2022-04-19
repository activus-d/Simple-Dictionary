//ASSIGN VARIABLES TO DOM ELEMENTS
let wordInput = document.querySelector('.search')
let inputtedWord = document.querySelector('.inputtedWord')
let transcription = document.querySelector('.phonetics')
let audioPronounce = document.querySelector('audio')
let partOfSpeechToDom1 = document.querySelector('.pos1')
let partOfSpeechToDom2 = document.querySelector('.pos2')
let defineToDom1 = document.querySelector('.definition1')
let defineToDom2 = document.querySelector('.definition2')
let synonymsToDom1 = document.querySelector('.synonyms1')
let synonymsToDom2 = document.querySelector('.synonyms2')
let pThree = document.querySelector('.pThree')


document.querySelector('i').onclick = searchWord
function searchWord() {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${(wordInput.value).toLowerCase()}`)
  .then( res => res.json() )
  .then( data =>  {
    console.log(data)
    let [data1, data2, data3] = data //destructure data and assign variable to each element in the array
    data1 = new DataInput(data1) //REASSIGN DATA1 TO CONSTRUCTOR CREATED TO INHERIT OBJECTS 
    fillData( data1, inputtedWord, transcription, audioPronounce, partOfSpeechToDom1, 
      partOfSpeechToDom2, defineToDom1, defineToDom2, synonymsToDom1, synonymsToDom2 ) //CALL FUNCTION TO INPUT DATA INTO DOM
  console.log(data1)
  pThree.classList.toggle("pThree")
  } )
  .catch( err => {
    console.log(`error: ${err}`)
  } )
}

//CREATE CLASS CONSTRUCTOR TO MAKE NEW OBJECTS OUT OF DATA VALUES
class DataInput {
  constructor(getInput) {
    this.word = getInput.word;
    this.transcribe = getInput.phonetic;
    this.audio = getInput.phonetics[0].audio;
    this.partOfSpeech1 = getInput.meanings[0].partOfSpeech;
    this.definition1OfPos1 = getInput.meanings[0].definitions[0].definition;
    this.definition2OfPos1 = getInput.meanings[0].definitions[1].definition;
    this.synonymOfPos1 = getInput.meanings[0].synonyms;
    this.partOfSpeech2 = getInput.meanings[1].partOfSpeech;
    this.definition1OfPos2 = getInput.meanings[1].definitions[0].definition;
    this.definition2OfPos2 = getInput.meanings[1].definitions[1].definition;
    this.synonymOfPos2 = getInput.meanings[1].synonyms;
  }

  getWord() {
    return this.word
  }
  getTranscribe() {
    return this.transcribe.replace(/[&#,+()$ˈ~%.'":*?<>{}]/g,'')
  }
  getAudio() {
    return this.audio
  }
  getPos1() {
    return this.partOfSpeech1
  }
  getPos2() {
    return this.partOfSpeech2
  }
  getDefinitionOfPos1() {
    return `${this.definition1OfPos} ${this.definition1OfPos1}`
  }
  getDefinitionOfPos2() {
    // return `${this.definition1OfPos2} ${this.definition2OfPos2}`
    return (this.definition1OfPos2 + "\n" + this.definition2OfPos2 )
  }
  getSynonymOfPos1() {
    return `${(this.synonymOfPos1).join(", ")}.`
  }
  getSynonymOfPos2() {
    return `${(this.synonymOfPos2).join(", ")}.`
  }
}

//FUNCTION TO INPUT DATA INTO DOM
function fillData( data, word, transcribe, audio, pos1, pos2, define1, define2, synonyms1, synonyms2  ) {
  word.textContent = data.getWord()
  transcribe.textContent = data.getTranscribe()
  let source = document.createElement("source")
  source.src = data.getAudio()
  audio.append(source)
  pos1.textContent = data.getPos1()
  pos2.textContent = data.getPos2()
  define1.textContent = data.getDefinitionOfPos1()
  define2.textContent = data.getDefinitionOfPos2()
  synonyms1.textContent = data.getSynonymOfPos1()
  synonyms2.textContent = data.getSynonymOfPos2()
}

//FUNCTION TO STYLE ELEMENT IN DOM
function styles() {
   pThree.classList.toggle("pThree")
}
