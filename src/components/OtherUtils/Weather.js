import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';

import TitleView from './../common/TitleView';
import {fetchWeather, fetchWeatherFiveDay} from './../../actions/actions';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';

import thermometer from './../../../assets/img/weather/thermometer.png';
import sunrise from './../../../assets/img/weather/sunrise.png';
import sunset from './../../../assets/img/weather/sunset.png';
import humidity from './../../../assets/img/weather/humidity.png';
import wind from './../../../assets/img/weather/wind.png';
import uvImg from './../../../assets/img/weather/uv.png';

const Weather = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [weatherFiveDay, setWeatherFiveDay] = useState([]);
  const weathers = useSelector(state => state.weatherReducer.weathers);
  const FiveDay = useSelector(state => state.weatherReducer.weatherFiveDay);
  const uv = useSelector(state => state.weatherReducer.uv);

  useEffect(() => {
    let arr = [];
    if (FiveDay.length > 0) {
      FiveDay.map(item => {
        var date = new Date(item.dt * 1000);
        if (date.getHours() == 10) {
          arr.push(item);
        }
      });
    }
    setWeatherFiveDay(arr);
  }, []);

  let colorsUV = '';
  let uvLevelName = '';

  if (uv !== undefined) {
    if (uv >= 0 && uv <= 3) {
      colorsUV = '#2ecc71';
      uvLevelName = 'Thấp';
    } else if (uv >= 3 && uv < 6) {
      colorsUV = '#f1c40f';
      uvLevelName = 'Vừa';
    } else if (uv >= 6 && uv <= 8) {
      colorsUV = '#e67e22';
      uvLevelName = 'Cao';
    } else if (uv >= 8.0 && uv <= 11) {
      colorsUV = '#e74c3c';
      uvLevelName = 'Rất Cao';
    } else if (uv >= 11) {
      colorsUV = '#8e44ad';
      uvLevelName = 'Nguy Hiểm';
    }
  }

  useEffect(async () => {
    dispatch(fetchWeather());
    dispatch(fetchWeatherFiveDay());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <TitleView title="Thời tiết" navigation={navigation} />
      {weathers !== undefined && (
        <ScrollView style={styles.content}>
          <Text style={styles.location}>{weathers.name}</Text>
          <Text style={styles.timeCurrent}>{`${moment(
            weathers.dt * 1000,
          ).format('DD/MM/YYYY')}`}</Text>
          <View style={styles.infoWeather}>
            <View style={styles.rowInfo}>
              <View style={styles.colInfo}>
                <Image style={styles.img} source={thermometer} />
                <Text style={styles.info}>{`${weathers.main.temp}°C`}</Text>
              </View>
              <View style={styles.colInfo}>
                <Image style={styles.img} source={humidity} />
                <Text style={styles.info}>{`${weathers.main.humidity}%`}</Text>
              </View>
            </View>

            <View style={styles.rowInfo}>
              <View style={styles.colInfo}>
                <Image style={styles.img} source={sunrise} />
                <Text style={styles.info}>{`${moment(
                  weathers.sys.sunrise * 1000,
                ).format('hh:mm A')}`}</Text>
              </View>
              <View style={styles.colInfo}>
                <Image style={styles.img} source={wind} />
                <Text style={styles.info}>{`${weathers.wind.speed} m/s`}</Text>
              </View>
            </View>

            <View style={styles.rowInfo}>
              <View style={styles.colInfo}>
                <Image style={styles.img} source={sunset} />
                <Text style={styles.info}>{`${moment(
                  weathers.sys.sunset * 1000,
                ).format('hh:mm A')}`}</Text>
              </View>
              <View style={styles.colInfo}>
                <Image style={styles.img} source={uvImg} />
                <Text
                  style={[
                    {
                      color: colorsUV,
                    },
                    styles.info,
                  ]}>
                  {`${uvLevelName}`}/{uv}
                </Text>
              </View>
            </View>
          </View>
          {weatherFiveDay.length > 0 && (
            <View style={styles.content}>
              <Text style={styles.location}>Dự báo cho 5 ngày tiếp theo</Text>
              {weatherFiveDay.length > 0 &&
                weatherFiveDay.map((weather, key) => (
                  <View key={key} style={styles.infoWeather}>
                    <Text style={styles.timeCurrent}>{`${moment(
                      weather.dt * 1000,
                    ).format('DD/MM/YYYY')}`}</Text>
                    <View style={styles.rowInfo}>
                      <View style={styles.colInfo}>
                        <Image style={styles.img} source={thermometer} />
                        <Text
                          style={styles.info}>{`${weather.main.temp}°C`}</Text>
                      </View>
                      <View style={styles.colInfo}>
                        <Image style={styles.img} source={humidity} />
                        <Text
                          style={
                            styles.info
                          }>{`${weather.main.humidity}%`}</Text>
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  info: {
    marginTop: 4,
    fontWeight: 'bold',
    color: '#414dd1',
  },
  img: {
    width: 32,
    height: 32,
  },
  colInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowInfo: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoWeather: {
    backgroundColor: '#f7f7f7',
    marginTop: 20,
    borderRadius: 14,
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: '#e8e9ed',
  },
  location: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#414dd1',
  },
  timeCurrent: {
    color: '#414dd1',
    marginTop: 4,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  content: {
    marginTop: 10,
    padding: 10,
  },
});
