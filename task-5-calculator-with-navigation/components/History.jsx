import { StyleSheet, View, Text, FlatList, Button } from "react-native";

export default function History({ route }) {
  const { history } = route.params;

  return (
    <View style={styles.container}>
        <FlatList contentContainerStyle={styles.list}
          data={history}
          renderItem={({ item }) =>
            <Text>{item.key}</Text>
          }
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
  list: {
    alignItems: "center",
  }
});