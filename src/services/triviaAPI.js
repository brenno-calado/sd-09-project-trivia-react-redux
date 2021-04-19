const GET_TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';

export const getToken = async () => {
  try {
    const tokenHttp = await fetch(GET_TOKEN_ENDPOINT);
    if (tokenHttp.ok) {
      const token = await tokenHttp.json();
      if (token.response_code === 0) {
        return token.token;
      }
    }
    throw new Error('Falha ao gerar token.');
  } catch (error) {
    return error;
  }
};

const filterQuestions = (questions) => {
  const filtered = [];
  Object.keys(questions).forEach((question) => {
    if (question === 'results') {
      filtered.push(questions[question]);
    }
  });
  return filtered[0];
};

export const getQuestions = async (token) => {
  const GET_QUESTIONS_ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;

  try {
    const response = await fetch(GET_QUESTIONS_ENDPOINT);
    if (response.ok) {
      const questions = await response.json();
      if (questions.response_code === 0) {
        const filteredQuestions = filterQuestions(questions);
        return filteredQuestions;
      }
    }
    throw new Error('Falha na busca pelas questoes.');
  } catch (error) {
    return error;
  }
};
