import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import { useState } from 'react';

export default function App() {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const [keyword, setKeyword] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchRepositories = () => {
    setLoading(true);
    setRepositories([]);
    console.log("Fetching...");
    fetch(`${API_URL}?q=${keyword}`)
      .then(response => response.json())
      .then(data => {
        setRepositories(data.items);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={text => setKeyword(text)}
        placeholder='Enter keyword'
      />
      <Button title="FIND" onPress={fetchRepositories} />
      <ActivityIndicator size="large" animating={isLoading} />
      <FlatList
          data={repositories}
          renderItem={({ item }) =>
            <View style={{ margin: 10 }}>
              <Text style={styles.fullName}>{item.full_name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          }
          keyExtractor={(_, index) => index.toString()}
      />
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
    marginTop: 40,
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: "black",
  },
  list: {
    alignItems: "center",
  },
  fullName: {
    fontWeight: "bold",
    fontSize: 20
  },
  description: {
    fontSize: 16
  }
});
