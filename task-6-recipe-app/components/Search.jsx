import { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ActivityIndicator } from 'react-native';
import RecipeList from './RecipeList';

export default function Search() {
  const testKey = "1";
  const [keyword, setKeyword] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRecipes = async () => {
    try {
      setIsLoading(true);
      let response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}?i=${keyword}`);
      let data = await response.json();
      setRecipes(data.meals);
    }
    catch(err) {
      console.error(err);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={text => setKeyword(text)}
        placeholder='Enter ingredient'
      />
      <Button title="FIND" onPress={getRecipes} />
      <ActivityIndicator size="large" animating={isLoading} />
      <RecipeList recipes={recipes} />
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
});