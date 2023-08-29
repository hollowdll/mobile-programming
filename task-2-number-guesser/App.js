import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';

const generateRandomNumber = () => {
  let number = Math.floor(Math.random() * (randomNumberBounds.max - randomNumberBounds.min + 1)) + randomNumberBounds.min;
  console.log(`App generated random number ${number}`);
  
  return number;
}

const randomNumberBounds = {
  min: 1,
  max: 100,
}
let correctNumber = generateRandomNumber();
const defaultMessage = "Guess a number between 1-100";

export default function App() {
  const [message, setMessage] = useState(defaultMessage);
  const [guess, setGuess] = useState("");
  const [guessCount, setGuessCount] = useState(0);

  const guessNumber = () => {
    let number = parseInt(guess);
    if (!isNaN(number)) {
      setGuessCount(count => count += 1);

      if (number === correctNumber) {
        Alert.alert(`You guessed the number in ${guessCount + 1} guesses`);
      } else if (number < correctNumber) {
        setMessage(`Your guess ${number} is too low`);
      } else if (number > correctNumber) {
        setMessage(`Your guess ${number} is too high`);
      }
    }
  }

  const resetGame = () => {
    setMessage(defaultMessage);
    setGuess("");
    setGuessCount(0);
    correctNumber = generateRandomNumber();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <TextInput
          style={styles.input}
          onChangeText={guess => setGuess(guess)}
          keyboardType="numeric"
          placeholder={"Enter a number"}
          value={guess}
      />
      <Button title="Make guess" onPress={guessNumber} />
      <Button title="Reset game" color="red" onPress={resetGame} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
  },
});
