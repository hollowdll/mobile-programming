import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState("");

  const calculateSum = () => {
    if (number1.length > 0 && number2.length > 0) {
      setResult(parseInt(number1) + parseInt(number2));
    }
  }

  const calculateDifference = () => {
    if (number1.length > 0 && number2.length > 0) {
      setResult(parseInt(number1) - parseInt(number2));
    }
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
          style={styles.input}
          onChangeText={num => setNumber1(num)}
          keyboardType="numeric"
          placeholder={"Enter number 1"}
          value={number1}
      />
      <TextInput
          style={styles.input}
          onChangeText={num => setNumber2(num)}
          keyboardType="numeric"
          placeholder={"Enter number 2"}
          value={number2}
      />
      <View style={styles.buttonRow}>
        <Button title="+" onPress={calculateSum} />
        <Button title="-" onPress={calculateDifference} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});
