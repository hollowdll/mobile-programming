import { StyleSheet, Text, View, FlatList } from 'react-native';
import type { ShoppinglistItem } from '../types/shoppinglist';

type Props = {
  items: Array<ShoppinglistItem>
  deleteItem: (id: number) => void,
}

export default function ShoppingList({ items, deleteItem }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={items}
        ListHeaderComponent={
          <Text style={styles.shoppinglistText}>Shopping List</Text>
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Text style={{ fontSize: 18 }}>
              {item.product}, {item.amount}
            </Text>
            <Text
              style={{ fontSize: 18, color: "#0000ff", marginLeft: 15 }}
              onPress={() => deleteItem(item.id)}
            >
              Bought
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shoppinglistText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  list: {
    alignItems: "center",
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center'
   },
});