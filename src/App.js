import React from 'react';
import { useState, useEffect } from 'react';
import shuffle from './utilities/shuffle';
import Card from './components/Card';
import Header from './components/Header';
import useAppBadge from './hooks/useAppBadge';

function App() {
  const [cards, setCards] = useState(shuffle);
  const [firstSelectedCard, setFirstSelectedCard] = useState(null);
  const [secondSelectedCard, setSecondSelectedCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [wins, setWins] = useState(0);
  const [setBadge, clearBadge] = useAppBadge();

  const handleClick = (card) => {
    if ( !disabled ) {
      firstSelectedCard ? setSecondSelectedCard(card) : setFirstSelectedCard(card); 
    }
  }

  const handleTurn = () => {
    setFirstSelectedCard(null);
    setSecondSelectedCard(null);
    setDisabled(false);
  }

  const handleNewGame = () => {
    clearBadge();
    setWins(0);
    handleTurn();
    setCards(shuffle);
  }

  useEffect(() => {
    let pickTimer;
    if (firstSelectedCard && secondSelectedCard) {
      if (firstSelectedCard.image === secondSelectedCard.image) {
        setCards(cards.map((card) => {
          if (card.image === firstSelectedCard.image) {
            return { ...card, matched: true };
          }
          return card;
        }));
        handleTurn();
      } else {
        setDisabled(true);
        pickTimer = setTimeout(handleTurn, 1000);
      }

      return () => clearTimeout(pickTimer);
    }
  }, [cards, firstSelectedCard, secondSelectedCard]);

  useEffect(() => {
    const checkWin = cards.every((card) => card.matched)
    console.log('checkWin: ', checkWin);
    
    if (checkWin) {
      console.log('You win!');
      setWins(wins + 1);
      handleTurn();
      setBadge();
      setCards(shuffle);
    }
  }, [cards, wins]);

  return (
    <>
      <Header wins={wins} handleNewGame={handleNewGame} />

      <div className="grid">
        {cards.map((card) => {
            const { image, id, matched } = card;
          
            return (
              <Card 
                key={id}
                image={image}
                selected={card == firstSelectedCard || card === secondSelectedCard || matched}
                onClick={() => handleClick(card)}
              />
            );
          })}
      </div>
    </>
  );
}

export default App;
