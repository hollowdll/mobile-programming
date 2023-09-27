import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ItemInsert from './components/ItemInsert';
import ShoppingList from './components/ShoppingList';

export default function App() {
  return (
    <View style={styles.container}>
      <ItemInsert />
      <ShoppingList items={[]} />
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
});
