import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { FontAwesome5 } from '@expo/vector-icons';

export default function Header({ background, weather, icon }) {
  return (
    <LinearGradient style={styles.header} colors={background}>
      <Text style={styles.date}>{weather.results.date}</Text>
      <Text style={styles.city}>{weather.results.city_name}</Text>
      <FontAwesome5 name={icon.name} color={icon.color} size={150} />
      <Text style={styles.temp}>{weather.results.temp}°</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '95%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  date: {
    color: '#fff',
    fontSize: 17,
  },
  city: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  temp: {
    color: '#fff',
    fontSize: 80,
    fontWeight: 'bold',
  },
});
