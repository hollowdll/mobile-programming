import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [text, setText] = useState("")

  const textToSpeech = () => {
    Speech.speak(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={text => setText(text)}
        placeholder="Enter text"
      />
      <Button title="Press to hear text" onPress={textToSpeech} />
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
    width: 250,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 5,
  },
});
