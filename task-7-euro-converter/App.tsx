import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';

export default function App() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [currencies, setCurrencies] = useState<string[]>([]);
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  // Get all currencies from the API
  const getCurrencies = () => {
    if (typeof(apiKey) === "undefined" || typeof(apiUrl) === "undefined") {
      return;
    }
  
    const headers = new Headers();
    headers.append("apikey", apiKey);
  
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
      headers: headers
    };
  
    fetch(`${apiUrl}/symbols`, requestOptions)
      .then(response => response.json())
      .then(data => setCurrencies(Object.keys(data.symbols)))
      .catch(err => console.error("error", err))
  }

  // Convert the selected currency to euros.
  const convertCurrency = () => {
    if (typeof(apiKey) === "undefined" || typeof(apiUrl) === "undefined") {
      return;
    }

    // pass only numbers
    if (isNaN(parseFloat(amount))) {
      return;
    }

    const headers = new Headers();
    headers.append("apikey", apiKey);

    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
      headers: headers
    };

    fetch(`${apiUrl}/convert?to=EUR&from=${selectedCurrency}&amount=${amount}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (isNaN(data.result)) {
          setResult("");
        } else {
          setResult(`${parseFloat(data.result).toFixed(2)} €`)
        }
      })
      .catch(err => console.error("error", err))
  }

  useEffect(() => {
    getCurrencies();
    console.log("Currencies updated");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Euro converter</Text>
      <Text>{result}</Text>
      <View>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={(text) => setAmount(text)}
          keyboardType='numeric'
          placeholder='Enter amount'
        />
        <Picker
          selectedValue={selectedCurrency}
          onValueChange={(value, _) => setSelectedCurrency(value)}
        >
          {currencies.map((item, index) => <Picker.Item key={index} label={item} value={item} />)}
        </Picker>
      </View>
      <Button title="CONVERT" onPress={convertCurrency} />
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
  },
  title: {
    fontWeight: "bold",
  }
});
