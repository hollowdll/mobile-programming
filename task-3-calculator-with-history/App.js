import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState("");
  const [data, setData] = useState([]);

  const calculateSum = () => {
    let num1 = parseInt(number1);
    let num2 = parseInt(number2);

    if (!isNaN(num1) && !isNaN(num2)) {
      let result = num1 + num2;
      setResult(result);
      setData([...data, { key: `${num1} + ${num2} = ${result}` }]);
    }
  };

  const calculateDifference = () => {
    let num1 = parseInt(number1);
    let num2 = parseInt(number2);

    if (!isNaN(num1) && !isNaN(num2)) {
      let result = num1 - num2;
      setResult(result);
      setData([...data, { key: `${num1} - ${num2} = ${result}` }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold" }}>Result: {result}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(num) => setNumber1(num)}
        keyboardType="numeric"
        placeholder={"Enter number 1"}
        value={number1}
      />
      <TextInput
        style={styles.input}
        onChangeText={(num) => setNumber2(num)}
        keyboardType="numeric"
        placeholder={"Enter number 2"}
        value={number2}
      />
      <View style={styles.buttonRow}>
        <Button title="+" onPress={calculateSum} />
        <Button title="-" onPress={calculateDifference} />
      </View>
      <View style={styles.listView}>
        <Text>History</Text>
        <FlatList contentContainerStyle={styles.list}
          data={data}
          renderItem={({ item }) =>
            <Text>{item.key}</Text>
          }
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonRow: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  listView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    alignItems: "center",
  }
});
