import React, { useState, useEffect} from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { Fontisto } from "@expo/vector-icons";

// const { height, width } = Dimensions.get("window");
const { width:SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "de0decc5434a828b3c00ea32467a6148";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
}

export default function App() {

  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async() => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].street);
    // const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays([json]);
  };
  useEffect(() => {
    getWeather();
  }, [])

  return (
    // views는 기본적으로 Flex Container임
    // RN의 Flex Direction의 기본값은 Column
    // RN의 사이즈를 줄때는 반응형을 생각해야함(비율을 생각하기)
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView 
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentontainerstyle={styles.weather}
      >
        {days?.length === 0 ? (
          <View style={{...styles.day, alignItems: "center" }}>
            <ActivityIndicator 
              color="white"
              style={{ marginTop: 10 }}
              size="large" 
            />
          </View>
        ) : ( 
          days?.map((day, index) => 
            <View key={index} style={styles.day}>
              <View 
                style={{
                  flexDirection: "row", 
                  alignItems: "center", 
                  width: "100%",
                  justifyContent: "space-between",
                }}>
                <Text style={styles.temp}>
                  {parseFloat(day.main.temp).toFixed(1)}
                </Text>
                <Fontisto style={styles.icon} name={icons[day.weather[0].main]} size={68} color="white" />
              </View>

              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#839ACC",
  },
  city: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
  },
  weather: {
  },
  day: {
    width: SCREEN_WIDTH,
    // alignItems: "center",
  },
  temp: {
    marginTop: -30,
    fontWeight: "600",
    fontSize: 108,
  },
  description: {
    marginTop: -30,
    fontSize: 50,
  },
  tinyText: {
    fontSize: 20,
  },
  icon: {
    marginTop: -30,
    marginRight: 50,
  },
});
