import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList, View } from 'react-native';
import * as Location from 'expo-location';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Conditions from '../../components/Conditions';
import Forecast from '../../components/Forecast';

import api, { key } from '../../services/api';

export default function Home() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);
  const [icon, setIcon] = useState({ name: 'cloud', color: '#fff' });
  const [background, setBackground] = useState(['#1ed6ff', '#97c1ff']);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permissão negada para acessar sua localização!');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //console.log(location.coords);

      //weather?key=suakey&lat=-23.682&lon=-46.875
      const response = await api.get(
        `/weather?key=${key}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
      );

      setWeather(response.data);

      if (response.data.results.currently === 'noite') {
        setBackground(['#0c3741', '#0f2f61']);
      }

      switch (response.data.results.condition_slug) {
        case 'storm':
          setIcon({ name: 'cloud-showers-heavy', color: '#1ec9ff' });
          break;

        case 'snow':
          setIcon({ name: 'snowflake', color: '#1ec9ff' });
          break;

        case 'hail':
          setIcon({ name: 'cloud-meatball', color: '#1ec9ff' });
          break;
        case 'rain':
          setIcon({ name: 'cloud-rain', color: '#1ec9ff' });
          break;
        case 'fog':
          setIcon({ name: 'cloudversify', color: '#1ec9ff' });
          break;
        case 'clear_day':
          setIcon({ name: 'sun', color: '#ffd300' });
          break;
        case 'clear_night':
          setIcon({ name: 'moon', color: '#1ec9ff' });
          break;
        case 'cloud':
          setIcon({ name: 'cloud', color: '#1ec9ff' });
          break;
        case 'cloudly_day':
          setIcon({ name: 'cloud-sun', color: '#ffd300' });
          break;
        case 'cloudly_night':
          setIcon({ name: 'cloud-moon', color: '#1ec9ff' });
          break;
        case 'none_day':
          setIcon({ name: 'sun', color: '#ffd300' });
          break;
        case 'none_night':
          setIcon({ name: 'moon', color: '#1ec9ff' });
          break;
        default:
          setIcon({ name: 'cloud', color: '#1ec9ff' });
          break;
      }

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 17, fontStyle: 'italic' }}>
          Carregando dados...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <Header background={background} weather={weather} icon={icon} />
      <Conditions weather={weather} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ paddingBottom: '5%' }}
        style={styles.list}
        data={weather.results.forecast}
        keyExtractor={item => item.date}
        renderItem={({ item }) => <Forecast data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f0ff',
    paddingTop: '5%',
  },
  list: {
    marginTop: 10,
    marginLeft: 10,
  },
});
