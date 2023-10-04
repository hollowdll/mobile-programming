import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View, Button, FlatList } from 'react-native';
import { type FirebaseOptions, initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import type { ShoppinglistItem, ShoppinglistItemInput } from './types';
import { useState, useEffect } from 'react';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY as string,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN as string,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL as string,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID as string,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET as string,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID as string,
  appId: process.env.EXPO_PUBLIC_APP_ID as string,
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  const [item, setItem] = useState<ShoppinglistItemInput>({
    product: "",
    amount: "",
  });
  const [items, setItems] = useState<ShoppinglistItem[]>([]);

  // Saves item to the database
  const saveItem = () => {
    push(ref(database, "items/"), item);
  };

  // Deletes item from the database
  const deleteItem = (id: string) => {
    remove(ref(database, `items/${id}`));
  }

  // Listen for database changes
  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(data)
      const listItems = Object.entries<ShoppinglistItemInput>(data).map(
        ([key, value]) => ({
          id: key,
          product: value.product,
          amount: value.amount,
        } as ShoppinglistItem)
      );
      
      setItems(listItems);
    })
  }, []);
    
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={item.product}
        onChangeText={text => setItem({ ...item, product: text })}
        placeholder='Product'
      />
      <TextInput
        style={styles.input}
        value={item.amount}
        onChangeText={text => setItem({ ...item, amount: text })}
        placeholder='Amount'
      />
      <Button title='SAVE' onPress={saveItem} />
      <FlatList
        style={{ marginTop: 30 }}
        contentContainerStyle={styles.list}
        data={items}
        ListHeaderComponent={
          <Text style={styles.shoppinglistText}>Shopping List</Text>
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Text style={{ fontSize: 18 }}>
              {item.product}, {item.amount}
            </Text>
            <Text
              style={{ fontSize: 18, color: "#0000ff", marginLeft: 15 }}
              onPress={() => deleteItem(item.id)}
            >
              Delete
            </Text>
          </View>
        )}
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
    marginTop: 50,
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 5,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center'
   },
   shoppinglistText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  list: {
    alignItems: "center",
  },
});
