import axios from 'axios';
import { company } from 'faker';
// sound effects
import fortuneCookieSfx from './sounds/fortune-cookie.mp3';
import ronSwansonSfx from './sounds/ron-swanson.mp3';
import kanyeWestSfx from './sounds/kanye-west.mp3';
import animeSfx from './sounds/anime.mp3';
import donaldTrumpSfx from './sounds/donald-trump.mp3';
import dadJokesSfx from './sounds/dad-jokes.mp3';
import michaelScottSfx from './sounds/michael-scott.mp3';
import seinfeldSfx from './sounds/seinfeld.mp3';
import adventureTimeSfx from './sounds/adventure-time.mp3';
import programmingSfx from './sounds/programming.mp3';
import designSfx from './sounds/design.mp3';
import randomSfx from './sounds/random.mp3';
import fakerSfx from './sounds/faker.mp3';
import explosionSfx from './sounds/explosion.mp3';

export const incorrectSfx = explosionSfx;

// https://stackoverflow.com/a/7228322
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// https://stackoverflow.com/a/47140708
function strip(html) {
  var doc = new DOMParser().parseFromString(
    html,
    'text/html',
  );
  return doc.body.textContent || '';
}

const apis = [
  {
    name: 'Fortune Cookie',
    sound: fortuneCookieSfx,
    get: async () => {
      const response = await axios.get(
        'http://fortunecookieapi.herokuapp.com/v1/cookie',
      );
      return response.data[0].fortune.message;
    },
  },
  {
    name: 'Ron Swanson',
    sound: ronSwansonSfx,
    get: async () => {
      const response = await axios.get(
        'http://ron-swanson-quotes.herokuapp.com/v2/quotes',
      );
      return response.data[0];
    },
  },
  {
    name: 'Kanye West',
    sound: kanyeWestSfx,
    get: async () => {
      const response = await axios.get(
        'https://api.kanye.rest',
      );
      return response.data.quote;
    },
  },
  // {
  //   name: "Programming Quotes",
  //   get: async () => {
  //     const response = await axios.get(
  //       "https://programming-quotes-api.herokuapp.com/quotes/random"
  //     )
  //     return response.data.en
  //   },
  // },
  {
    name: 'Anime',
    sound: animeSfx,
    get: async () => {
      const response = await axios.get(
        'https://anime-chan.herokuapp.com/api/quotes/random',
      );
      return response.data[0].quote;
    },
  },
  {
    name: 'Donald Trump',
    sound: donaldTrumpSfx,
    get: async () => {
      const response = await axios.get(
        'https://tronalddump.io/random/quote',
      );
      return response.data.value;
    },
  },
  {
    name: 'Dad Jokes',
    sound: dadJokesSfx,
    get: async () => {
      const response = await axios.get(
        'https://icanhazdadjoke.com/slack',
      );
      return response.data.attachments[0].text;
    },
  },
  {
    name: 'Michael Scott',
    sound: michaelScottSfx,
    get: async () => {
      const response = await axios.get(
        // "https://michael-scott-quotes-api.herokuapp.com/randomQuote"
        // "https://michael-scott-quotes.herokuapp.com/quote"
        'http://michael-scott-api.herokuapp.com/v1/quotes',
      );
      return response.data[0];
    },
  },
  {
    name: 'Seinfeld',
    sound: seinfeldSfx,
    get: async () => {
      const response = await axios.get(
        'https://seinfeld-quotes.herokuapp.com/random',
      );
      return response.data.quote;
    },
  },
  {
    name: 'Adventure Time',
    sound: adventureTimeSfx,
    get: async () => {
      const response = await axios.get(
        'https://adventure-time-quote-api.glitch.me/api/random',
      );
      return response.data.split(':')[1];
    },
  },
  {
    name: 'Programming',
    sound: programmingSfx,
    get: async () => {
      const response = await axios.get(
        'http://quotes.stormconsultancy.co.uk/random.json',
      );
      return response.data.quote;
    },
  },
  {
    name: 'Design',
    sound: designSfx,
    get: async () => {
      const response = await axios.get(
        'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand',
      );
      return strip(
        response.data[
          randomIntFromInterval(0, response.data.length - 1)
        ].content.rendered,
      );
    },
  },
  {
    name: 'Random',
    sound: randomSfx,
    get: async () => {
      const response = await axios.get(
        'http://api.quotable.io/random',
      );
      return response.data.content;
    },
  },
  {
    name: 'Faker',
    sound: fakerSfx,
    get: async () => {
      return `${company.catchPhrase()} with ${company.bs()}.`;
    },
  },
];

export default apis;

export const getRandomIndex = ({
  index,
  notIndex,
} = {}) => {
  if (index) return index;
  const randomIndex = randomIntFromInterval(
    0,
    apis.length - 1,
  );
  if (randomIndex === notIndex)
    return getRandomIndex({ notIndex });
  return randomIndex;
};
