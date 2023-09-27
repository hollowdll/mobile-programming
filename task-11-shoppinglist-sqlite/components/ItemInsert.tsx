import { StyleSheet, View, TextInput, Button } from 'react-native';
import { useState } from 'react';

type Props = {
  saveItem: (product: string, amount: string) => void,
}

export default function ItemInsert({ saveItem }: Props) {
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
      <Button title='SAVE' onPress={() => saveItem(product, amount)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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