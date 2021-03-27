import React from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList } from 'react-native';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Conditions from '../../components/Conditions';
import Forecast from '../../components/Forecast';

const mylist = [
  {
    date: '26/03',
    weekday: 'Sex',
    max: 29,
    min: 18,
    description: 'Parcialmente nublado',
    condition: 'snow',
  },
  {
    date: '27/03',
    weekday: 'Sáb',
    max: 31,
    min: 19,
    description: 'Tempestades',
    condition: 'storm',
  },
  {
    date: '28/03',
    weekday: 'Dom',
    max: 30,
    min: 19,
    description: 'Tempestades',
    condition: 'storm',
  },
  {
    date: '29/03',
    weekday: 'Seg',
    max: 28,
    min: 19,
    description: 'Tempestades',
    condition: 'storm',
  },
  {
    date: '30/03',
    weekday: 'Ter',
    max: 26,
    min: 19,
    description: 'Tempestades',
    condition: 'storm',
  },
  {
    date: '31/03',
    weekday: 'Qua',
    max: 23,
    min: 16,
    description: 'Parcialmente nublado',
    condition: 'cloudly_day',
  },
  {
    date: '01/04',
    weekday: 'Qui',
    max: 22,
    min: 15,
    description: 'Parcialmente nublado',
    condition: 'cloudly_day',
  },
  {
    date: '02/04',
    weekday: 'Sex',
    max: 21,
    min: 13,
    description: 'Ensolarado com muitas nuvens',
    condition: 'cloudly_day',
  },
  {
    date: '03/04',
    weekday: 'Sáb',
    max: 21,
    min: 15,
    description: 'Parcialmente nublado',
    condition: 'cloudly_day',
  },
  {
    date: '04/04',
    weekday: 'Dom',
    max: 24,
    min: 15,
    description: 'Parcialmente nublado',
    condition: 'cloudly_day',
  },
];

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <Header />
      <Conditions />
      <FlatList
        horizontal={true}
        contentContainerStyle={{ paddingBottom: '5%' }}
        style={styles.list}
        data={mylist}
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
