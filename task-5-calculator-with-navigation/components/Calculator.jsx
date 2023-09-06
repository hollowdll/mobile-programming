import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { useState } from "react";

export default function Calculator({ navigation }) {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const calculate = (operation) => {
    let num1Parsed = parseFloat(num1);
    let num2Parsed = parseFloat(num2);

    if (!isNaN(num1Parsed) && !isNaN(num2Parsed)) {
      let result = 0;

      if (operation == "+")
        result = num1Parsed + num2Parsed;
      else if(operation == "-")
        result = num1Parsed - num2Parsed;
      else return;

      setResult(result)
      setHistory([...history, { key: `${num1} ${operation} ${num2} = ${result}` }]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold" }}>Result: {result}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(num) => setNum1(num)}
        keyboardType="numeric"
        placeholder={"Enter number 1"}
        value={num1}
      />
      <TextInput
        style={styles.input}
        onChangeText={(num) => setNum2(num)}
        keyboardType="numeric"
        placeholder={"Enter number 2"}
        value={num2}
      />
      <View style={styles.buttonRow}>
        <Button title="+" onPress={() => calculate("+")} />
        <Button title="-" onPress={() => calculate("-")} />
        <Button title="History" onPress={() => navigation.navigate("History", { history })} />
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
});
