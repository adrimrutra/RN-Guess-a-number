import React, { useState } from 'react';
import { StyleSheet, View , SafeAreaView } from 'react-native';
import * as Font from 'expo-font';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { AppLoading } from 'expo';

const fetchFonts = () =>{
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setdataLoaded] = useState(false);

  if(!dataLoaded){
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setdataLoaded(true)}
        onError={(err)=> console.log(err)}
      />
    );
  }

  const configureNewGame = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let conten = <StartGameScreen onStartGame={startGameHandler}/>;

  if(userNumber && guessRounds <= 0) {
    conten = (
      <GameScreen 
        userChoice={userNumber} 
        onGameOver={gameOverHandler} 
      />
    );
  } else if (guessRounds > 0) {
    conten = (
      <GameOverScreen 
        roundsNumber={guessRounds} 
        userNumber={userNumber} 
        onRestart={configureNewGame}/>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number"/>
      {conten}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex: 1
  }
});
