import md5 from 'crypto-js/md5';
const email = localStorage.getItem(JSON.parse('player'));
const hashEmail = md5(email.gravatarEmail);

export default () => (
  fetch(`https://br.gravatar.com/site/implement/hash/${hashEmail}`)
    .then((response) => (
      response.json()
        .then((data) => (
          data
        ))
        .catch((error) => (
          error
        ))
    ))
);
