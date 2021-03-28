import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api, { key } from '../../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import Conditions from '../../components/Conditions';

export default function Search() {
  const navigation = useNavigation();
  const [input, setInput] = useState('');
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  async function handleSearch() {
    // weather?key=suachave&city_name=Campinas,SP
    const response = await api.get(`weather?key=${key}&city_name=${input}`);
    //console.log(response.data);

    if (response.data.by === 'default') {
      setError('Humm, cidade não encontrada!');
      setInput('');
      setCity(null);
      Keyboard.dismiss();
      return;
    }

    setCity(response.data);
    setInput('');
    Keyboard.dismiss();
  }

  if (city) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Feather name="chevron-left" size={32} color="#000" />
          <Text style={{ fontSize: 22 }}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.SearchBox}>
          <TextInput
            value={input}
            onChangeText={valor => setInput(valor)}
            placeholder="Ex: Uberlândia, MG"
            style={styles.input}
          />
          <TouchableOpacity style={styles.icon} onPress={handleSearch}>
            <Feather name="search" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <LinearGradient style={styles.header} colors={['#1ed6ff', '#97c1ff']}>
          <Text style={styles.date}>{city.results.date}</Text>
          <Text style={styles.city}>{city.results.city_name}</Text>
          <FontAwesome5 name={icon.name} color={icon.color} size={150} />
          <View>
            <Text style={styles.temp}>{city.results.temp}°</Text>
          </View>
          <Conditions weather={city} />
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Feather name="chevron-left" size={32} color="#000" />
        <Text style={{ fontSize: 22 }}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.SearchBox}>
        <TextInput
          value={input}
          onChangeText={valor => setInput(valor)}
          placeholder="Ex: Uberlândia, MG"
          style={styles.input}
        />
        <TouchableOpacity style={styles.icon} onPress={handleSearch}>
          <Feather name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      {error && (
        <Text
          style={{
            marginTop: 25,
            fontSize: 18,
            color: '#1ed6ff',
            fontWeight: 'bold',
          }}
        >
          {error}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%',
    backgroundColor: '#e8f0ff',
  },
  backButton: {
    flexDirection: 'row',
    marginLeft: 15,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  SearchBox: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ddd',
    width: '90%',
    height: 50,
    borderRadius: 8,
  },
  input: {
    width: '85%',
    height: 50,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 7,
  },
  icon: {
    width: '15%',
    height: 50,
    backgroundColor: '#1ed6ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  header: {
    marginTop: '5%',
    width: '90%',
    paddingTop: '5%',
    paddingBottom: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  date: {
    color: '#fff',
    fontWeight: 'bold',
    color: '#fff',
  },
  city: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  temp: {
    color: '#fff',
    fontSize: 90,
    fontWeight: 'bold',
  },
});
