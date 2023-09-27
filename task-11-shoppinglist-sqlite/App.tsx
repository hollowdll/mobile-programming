import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ItemInsert from "./components/ItemInsert";
import ShoppingList from "./components/ShoppingList";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import type { ShoppinglistItem } from "./types/shoppinglist";

const db = SQLite.openDatabase("shoppinglistdb.db");

export default function App() {
  const [items, setItems] = useState<Array<ShoppinglistItem>>([]);

  // Creates database table for items if it doesn't exist.
  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS shoppinglist_items (id INTEGER PRIMARY KEY NOT NULL, product TEXT, amount TEXT);"
        );
      },
      undefined,
      updateItems
    );
  }, []);

  const updateItems = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM shoppinglist_items;", [], (_, { rows }) =>
        setItems(rows._array)
      );
    });
  };

  const saveItem = (product: string, amount: string) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO shoppinglist_items (product, amount) VALUES (?, ?);",
          [product, amount]
        );
      },
      undefined,
      updateItems
    );
  };

  const deleteItem = (id: number) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM shoppinglist_items WHERE id = ?;`, [id]);
      },
      undefined,
      updateItems
    );
  };

  return (
    <View style={styles.container}>
      <ItemInsert saveItem={saveItem} />
      <ShoppingList items={items} deleteItem={deleteItem} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
