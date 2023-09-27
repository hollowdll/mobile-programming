import { StyleSheet, Text, View, FlatList } from 'react-native';
import type { ShoppinglistItem } from '../types/shoppinglist';

type Props = {
  items: Array<ShoppinglistItem>
}

export default function ShoppingList({ items }: Props) {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold' }}>Shoppinglist</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ margin: 10 }}>
            <Text>{item.product}, {item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});