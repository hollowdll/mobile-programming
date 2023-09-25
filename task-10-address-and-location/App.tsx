import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import type { Region } from 'react-native-maps';

export default function App() {
  const apiKey = process.env.EXPO_PUBLIC_API_KEY as string;
  const apiUrl = process.env.EXPO_PUBLIC_API_URL as string;
  const [latitudeDelta, longitudeDelta] = [0.0322, 0.0221];
  // default region if location permission was denied.
  const defaultRegion: Region = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  }
  const [region, setRegion] = useState(defaultRegion);
  const [address, setAddress] = useState("");
  const [markerText, setMarkerText] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to get location denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      } as Region);
      setMarkerText("Your location");
    })();
  }, []);
  
  // Get coordinates from API and set region.
  const getCoordinates = () => {
    if (address.length < 1) {
      return;
    }

    fetch(`${apiUrl}?key=${apiKey}&location=${address}`)
      .then(response => response.json())
      .then(data => {
        const latLng = data.results[0].locations[0].latLng;
        setRegion({
          latitude: latLng.lat,
          longitude: latLng.lng,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        } as Region);
        setMarkerText(address);
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
          title={`${markerText}`}
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
