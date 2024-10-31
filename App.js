import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = 'e4c6cbc94aaddb2c287e0da5cb144b38'; // Substitua pela sua chave API

  const getDataApi = async () => {
    if (!city.trim()) {
      Alert.alert('Por favor, insira o nome de uma cidade.');
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      Alert.alert('Erro ao buscar dados, verifique o nome da cidade e tente novamente.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite a cidade"
          value={city}
          onChangeText={setCity}
        />
        <Button title="Buscar" onPress={getDataApi} />
      </View>

      {weatherData && (
        <View style={styles.content}>
          <Text style={styles.place}>{`${weatherData.name}, ${weatherData.sys.country}`}</Text>
          <Text style={styles.degrees}>{`Temperatura: ${Math.floor(weatherData.main.temp)}°C`}</Text>
          <Image
            style={styles.icon}
            source={{ uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }}
          />
          <Text style={styles.wind}>{`Vento: ${weatherData.wind.speed} km/h`}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  content: {
    alignItems: 'center',
  },
  place: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  degrees: {
    fontSize: 20,
    marginBottom: 10,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  wind: {
    fontSize: 18,
  },
});
