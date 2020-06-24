import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { kebab } from 'case';
import useSound from 'use-sound';
import { Jumbotron, Button } from 'reactstrap';
import apis, {
  incorrectSfx,
  getRandomIndex,
} from '../utils/api';
import Choice from '../components/Choice/Choice';
import Choices from '../components/Choices/Choices';
import Seo from '../components/Seo/Seo';

const initialIndex = getRandomIndex();

export default function GamePage() {
  const data = useStaticQuery(
    graphql`
      query {
        avatars: allFile(
          filter: { sourceInstanceName: { eq: "avatars" } }
        ) {
          edges {
            node {
              id
              name
              childImageSharp {
                fixed(width: 200, height: 200) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
        }
      }
    `,
  );

  const [lives, setLives] = React.useState(3);
  const [score, setScore] = React.useState(0);

  const [index, setIndex] = React.useState(initialIndex);
  const [quote, setQuote] = React.useState('');
  const [author, setAuthor] = React.useState(
    apis[initialIndex].name,
  );
  const [sound, setSound] = React.useState(
    apis[initialIndex].sound,
  );

  const [playIncorrectSfx] = useSound(incorrectSfx);
  const [playSfx] = useSound(sound);

  React.useEffect(() => {
    setAuthor(apis[index].name);
    setSound(apis[index].sound);
    console.log('   Fetching…');
    apis[index]
      .get()
      .then((response) => {
        setQuote(response.trim());
        if (!response.trim()) {
          setIndex(getRandomIndex());
          console.log('   Empty response…');
        } else {
          console.log('   Fetched…');
        }
      })
      .catch((error) => {
        console.log('   Error…');
        setIndex(getRandomIndex());
      });
  }, [index, setIndex]);

  const checkAnswer = React.useCallback(
    (name) => {
      console.log(name, author);
      if (name === author) {
        playSfx();
        setScore(score + 100);
      } else {
        playIncorrectSfx();
        setLives(lives - 1);
        // TODO lose a life
      }
      console.log('   Setting index…');
      setIndex(getRandomIndex());
    },
    [
      author,
      lives,
      score,
      playSfx,
      playIncorrectSfx,
      setScore,
      setLives,
      setIndex,
    ],
  );
  if (lives === 0) {
    return (
      <Jumbotron>
        <Seo title="Home" />
        <h1>He’s dead Jim. Score: {score}</h1>
        <Button
          onClick={() => {
            setLives(3);
            setScore(0);
          }}
        >
          Retry?
        </Button>
      </Jumbotron>
    );
  }

  return (
    <div>
      <Seo title="Home" />
      <h1>Who Dun Said It?</h1>
      <p>
        Score: {score} <br /> Lives: {lives}
      </p>
      <Jumbotron>
        <h1>"{quote}"</h1>
      </Jumbotron>
      <Choices>
        {apis.map((api) => {
          const slug = kebab(api.name);
          const edge = data.avatars.edges.find(
            (edge) => edge.node.name === slug,
          );
          return (
            <Choice
              key={edge.node.id}
              edge={edge}
              api={api}
              checkAnswer={checkAnswer}
            />
          );
        })}
      </Choices>
    </div>
  );
}
