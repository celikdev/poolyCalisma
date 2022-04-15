import React, {useState} from 'react';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import axios from 'axios';

import {
  StyledContainer,
  StyledTitle,
  StyledTravelButton,
  StyledTravelButtonText,
} from '../components/StyledComponents';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {setTime, yolcuCikar, yolcuEkle} from '../redux/slices/Main';

import {MdRemoveCircleOutline} from 'react-icons/md';

const UserRouteSelect = ({navigation}) => {
  const [mapData, setMapData] = useState();

  const dispatch = useDispatch();

  const kalkisYeri = useSelector(state => state.main.kalkisYeri);
  const varisYeri = useSelector(state => state.main.varisYeri);
  const yolcuSayisi = useSelector(state => state.main.yolcuSayisi);

  const handleSelect = () => {
    const selectedStartPoint = kalkisYeri;
    const selectedEndPoint = varisYeri;
    axios
      .get(
        `https://maps.googleapis.com/maps/api/directions/json?&origin=${selectedStartPoint}&destination=${selectedEndPoint}&key=AIzaSyCVB-jSggS5k3SzwlUA-7QQsh_cCkpCK04`,
      )
      .then(res => setMapData(res.data.routes[0].legs[0]));
  };

  const [time, setTime] = useState();
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = time => {
    const newTime = time.getHours() + ':' + time.getMinutes();
    setTime(newTime);
    hideDatePicker();
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const ucret =
    (parseInt(mapData && mapData.distance.text) * 2.6) / yolcuSayisi;

  return (
    <StyledContainer>
      <StyledTitle>Yolculuğunu Seç</StyledTitle>
      <StyledTravelButton
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('SelectPage', {selectingName: 'Kalkis'})
        }>
        <StyledTravelButtonText>
          {kalkisYeri.length ? kalkisYeri : 'Kalkış Yeri'}
        </StyledTravelButtonText>
      </StyledTravelButton>
      <StyledTravelButton
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('SelectPage', {selectingName: 'Varis'})
        }>
        <StyledTravelButtonText>
          {varisYeri.length ? varisYeri : 'Varış Yeri'}
        </StyledTravelButtonText>
      </StyledTravelButton>
      <View
        style={{
          width: '70%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            width: '45%',
            backgroundColor: 'lightgray',
            borderWidth: 2,
            borderRadius: 6,
            padding: 12,
          }}
          activeOpacity={0.8}
          onPress={() => setDatePickerVisibility(true)}>
          <StyledTravelButtonText>
            {time ? time : 'Kalkış Saati'}
          </StyledTravelButtonText>
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'lightgray',
            borderWidth: 2,
            borderRadius: 6,
            padding: 8,
            width: '45%',
          }}>
          <TouchableOpacity
            onPress={() => dispatch(yolcuCikar())}
            hitSlop={{top: 14, bottom: 14, left: 14, right: 14}}>
            <Text
              style={{
                color: '#202020',
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 20,
              }}>
              -
            </Text>
          </TouchableOpacity>
          <Text style={{color: '#202020', fontFamily: 'Montserrat-SemiBold'}}>
            {yolcuSayisi}
          </Text>
          <TouchableOpacity
            onPress={() => dispatch(yolcuEkle())}
            hitSlop={{top: 14, bottom: 14, left: 14, right: 14}}>
            <Text
              style={{
                color: '#202020',
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 20,
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        is24Hour={true}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <TouchableOpacity
        onPress={() => handleSelect()}
        style={{
          borderWidth: 2,
          paddingHorizontal: 30,
          paddingVertical: 8,
          marginTop: 16,
          borderRadius: 6,
          marginBottom: 16,
        }}>
        <Text style={{fontFamily: 'Montserrat-SemiBold', color: '#202020'}}>
          Ara
        </Text>
      </TouchableOpacity>
      <MapView
        followsUserLocation={true}
        initialRegion={{
          latitude: 41.01018972569607,
          longitude: 28.997045142564755,
          latitudeDelta: 0.5,
          longitudeDelta: 0.0421,
        }}
        style={{width: '100%', height: '90%'}}>
        {mapData && (
          <>
            <Marker
              coordinate={{
                latitude: mapData.start_location.lat,
                longitude: mapData.start_location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
            <Marker
              coordinate={{
                latitude: mapData.end_location.lat,
                longitude: mapData.end_location.lng,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
              }}
            />
            <MapViewDirections
              strokeWidth={4}
              origin={{
                latitude: mapData.start_location.lat,
                longitude: mapData.start_location.lng,
              }}
              destination={{
                latitude: mapData.end_location.lat,
                longitude: mapData.end_location.lng,
              }}
              apikey="AIzaSyCVB-jSggS5k3SzwlUA-7QQsh_cCkpCK04"
              optimizeWaypoints={true}
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`,
                );
              }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);
              }}
            />
          </>
        )}
      </MapView>
      <View
        style={{
          width: '100%',
          height: '12%',
          backgroundColor: 'white',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 12,
        }}>
        {mapData ? (
          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '30%',
                paddingVertical: 4,
                borderWidth: 2,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#202020',
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 14,
                }}>
                {mapData.distance.text}
              </Text>
              <Text
                style={{
                  color: '#202020',
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 14,
                }}>
                {mapData.duration.text}
              </Text>
              <Text
                style={{
                  color: '#202020',
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 14,
                }}>
                {yolcuSayisi} Kişi {ucret.toFixed(2)}₺
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: '20%',
                backgroundColor: '#2F20DA',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
              }}>
              <Text
                style={{color: '#F0FFFF', fontFamily: 'Montserrat-SemiBold'}}>
                Git
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text
            style={{
              color: '#202020',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 14,
            }}>
            Lütfen Rota Seçin
          </Text>
        )}
      </View>
    </StyledContainer>
  );
};

export default UserRouteSelect;
