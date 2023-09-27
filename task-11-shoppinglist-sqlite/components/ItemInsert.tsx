import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function ItemInsert() {
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={product}
        onChangeText={text => setProduct(text)}
        placeholder='Product'
      />
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={text => setAmount(text)}
        placeholder='Amount'
      />
      <Button title='SAVE' />
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
    borderColor: "black",
    marginBottom: 5,
  },
});