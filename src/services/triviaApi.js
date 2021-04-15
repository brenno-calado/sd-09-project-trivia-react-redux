function replaceCode(string) {
  return string
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, '\'');
}

export const getToken = async () => {
  const endPoint = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(endPoint);
  const result = await response.json();
  return result;
};

export const getAnswer = async (number, token) => {
  const endPoint = `https://opentdb.com/api.php?amount=${number}&token=${token}`;
  const response = await fetch(endPoint);
  const result = await response.json();
  result.results.forEach((question) => {
    question.question = replaceCode(question.question);
    const { correct_answer: correct, incorrect_answers: incorrect } = question;
    const RANDOM = 0.5;
    const sortedOptions = [...incorrect, correct].sort(() => RANDOM - Math.random());
    question.sortedOptions = sortedOptions;
  });
  return result;
};
