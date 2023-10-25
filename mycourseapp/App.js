import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Input, Button, Icon, ListItem } from '@rneui/themed';

const db = SQLite.openDatabase('coursedb.db');

export default function App() {
  const [credit, setCredit] = useState('');
  const [title, setTitle] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists course (id integer primary key not null, credits int, title text);');
    }, () => console.error("Error when creating DB"), updateList);  
  }, []);

  // Save course
  const saveItem = () => {
    if (credit && title) {
      db.transaction(tx => {
          tx.executeSql('insert into course (credits, title) values (?, ?);', [parseInt(credit), title]);    
        }, () => console.error("Error in Insert"), updateList
      )
    }
    else {
      Alert.alert('Error', 'Type credit and title first');
    }
  }

  // Update courselist
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from course;', [], (_, { rows }) =>
        setCourses(rows._array)
      ); 
      setTitle('');
      setCredit('')
    });
  }

  // Delete course
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from course where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'My course DB app', style: { color: 'yellow' }}} />
      <Input
        style={{ marginTop: 20 }}
        placeholder='Title'
        onChangeText={title => setTitle(title)}
        value={title}/>  
      <Input
        placeholder='Credits' 
        keyboardType="numeric"
        onChangeText={credit => setCredit(credit)}
        value={credit}/>      
      <Button onPress={saveItem} radius={"md"} type="solid">
        Save
        <Icon name="save" color="white" />
      </Button> 
      <Text style={{marginTop: 30, fontSize: 20}}>Courses</Text>
      <FlatList 
        style={{width : "90%"}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => 
          <ListItem.Swipeable
            bottomDivider
            rightContent={(action) => (
              <Button
                containerStyle={{
                  flex: 1,
                  justifyContent: "center",
                  backgroundColor: "#f4f4f4",
                }}
                type="clear"
                icon={{ name: "delete-outline" }}
                onPress={() => deleteItem(item.id)}
              />
            )}
          >
            <Icon name="label-important-outline" type="material" />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.credits}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        } 
        data={courses} 
        ItemSeparatorComponent={listSeparator} 
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
 listcontainer: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center'
 },
});
