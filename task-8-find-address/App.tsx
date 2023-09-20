import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import type { Region } from 'react-native-maps';

export default function App() {
  const [latitudeDelta, longitudeDelta] = [0.0322, 0.0221];
  const initialRegion: Region = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  }
  const [region, setRegion] = useState(initialRegion);
  const [address, setAddress] = useState("");
  const apiKey = process.env.EXPO_PUBLIC_API_KEY as string;
  const apiUrl = process.env.EXPO_PUBLIC_API_URL as string;
  
  const getCoordinates = () => {
    if (address.length < 1) {
      return;
    }

    fetch(`${apiUrl}?key=${apiKey}&location=${address}`)
      .then(response => response.json())
      .then(data => {
        let latLng = data.results[0].locations[0].latLng;
        setRegion({
          latitude: latLng.lat,
          longitude: latLng.lng,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        } as Region);
      })
      .catch(err => console.error("error", err))
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude
          }}
          title={`${address}`}
        />
      </MapView>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={text => setAddress(text)}
        placeholder='Enter address'
      />
      <View style={{ width: '100%' }}>
        <Button title='SHOW' onPress={getCoordinates} />
      </View>
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
  map: {
    width: '100%',
    height: '80%',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: "black",
  },
});
