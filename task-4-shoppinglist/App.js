import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [product, setProduct] = useState("");
  const [data, setData] = useState([]);

  const addProduct = () => {
    if (product.length > 0) {
      setData([...data, { key: product }]);
      setProduct("");
    }
  }

  const clearList = () => {
    setData([]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textBold}>Add a new product</Text>
      <TextInput
          style={styles.input}
          onChangeText={text => setProduct(text)}
          placeholder={"Enter text"}
          value={product}
      />
      <View style={styles.buttonRow}>
        <Button title="ADD" onPress={addProduct} />
        <Button title="CLEAR" onPress={clearList} />
      </View>
      <FlatList contentContainerStyle={styles.list}
        data={data}
        ListHeaderComponent={<Text style={{fontSize: 20, fontWeight: "bold"}}>Shopping List</Text>}
        renderItem={({ item }) =>
          <Text>{item.key}</Text>
        }
        keyExtractor={(_, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
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
  list: {
    marginTop: 20,
    alignItems: "center",
  },
  textBold: {
    fontWeight: "bold"
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  }
});
