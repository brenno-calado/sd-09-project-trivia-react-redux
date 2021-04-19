// Embaralahndo as perguntas
// https://stackoverflow.com/questions/49555273/how-to-shuffle-an-array-of-objects-in-javascript
export const shuffleAnswers = (array) => {
  const sizeArray = array.length;
  for (let i = 0; i < sizeArray; i += 1) {
    const random = Math.floor(Math.random() * sizeArray);
    [array[i], array[random]] = [array[random], array[i]];
  }
  return array;
};

// Função que interpreta caracteres especiais
// https://tertiumnon.medium.com/js-how-to-decode-html-entities-8ea807a140e5
export const decodeHTMLEntities = (text) => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};
