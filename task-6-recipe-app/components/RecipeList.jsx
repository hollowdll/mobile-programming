import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

export default function RecipeList({ recipes }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <View style={{ margin: 10 }}>
            <Text style={styles.mealName}>{item.strMeal}</Text>
            <Image
              style={styles.image}
              source={{uri: item.strMealThumb}}
            />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
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
  image: {
    width: 250,
    height: 150,
  },
  mealName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});