import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  StyledContainer,
  StyledPlaceItem,
  StyledTextInput,
  StyledTitle,
} from '../components/StyledComponents';
import {kalkisYeriData, varisYeriData} from '../Data';

import {setKalkisYeri, setVarisYeri} from '../redux/slices/Main';

const SelectPage = ({route, navigation}) => {
  const {selectingName} = route.params;

  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');

  const x = useSelector(state => state.main.varisYeri);

  return (
    <StyledContainer>
      <StyledTitle>
        {selectingName == 'Kalkis'
          ? 'Kalkış Noktası Seçin'
          : 'Varış Noktası Seçin'}
      </StyledTitle>
      <StyledTextInput
        style={{backgroundColor: 'lightgray'}}
        placeholder={
          selectingName == 'Kalkis'
            ? 'Kalkış Noktası Seçin'
            : 'Varış Noktası Seçin'
        }
        placeholderTextColor="#202020"
        onChangeText={text => setSearchQuery(text)}
      />
      {selectingName == 'Kalkis' ? (
        searchQuery.length ? (
          kalkisYeriData
            .filter(kalkisYeri => {
              if (searchQuery == '') {
                return kalkisYeri;
              } else if (
                kalkisYeri.kalkisYeri
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              ) {
                return kalkisYeri;
              }
            })
            .map((kalkisYeri, index) => (
              <StyledPlaceItem
                key={index}
                activeOpacity={0.6}
                onPress={() => {
                  dispatch(setKalkisYeri(kalkisYeri.kalkisYeri));
                  navigation.navigate('UserRouteSelect');
                }}>
                <Text
                  style={{
                    color: '#202020',
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 12,
                  }}>
                  {kalkisYeri.kalkisYeri}
                </Text>
              </StyledPlaceItem>
            ))
        ) : (
          <Text
            style={{
              color: '#202020',
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 12,
              textAlign: 'center',
              paddingTop: 6,
            }}>
            Lütfen En Az 3 Harf Yazınız! Örneğin:Koç
          </Text>
        )
      ) : searchQuery.length ? (
        varisYeriData
          .filter(varisYeri => {
            if (searchQuery == '') {
              return varisYeri;
            } else if (
              varisYeri.varisYeri
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            ) {
              return varisYeri;
            }
          })
          .map((varisYeri, index) => (
            <StyledPlaceItem
              key={index}
              activeOpacity={0.6}
              onPress={() => {
                dispatch(setVarisYeri(varisYeri.varisYeri));
                navigation.navigate('UserRouteSelect');
              }}>
              <Text
                style={{
                  color: '#202020',
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 12,
                }}>
                {varisYeri.varisYeri}
              </Text>
            </StyledPlaceItem>
          ))
      ) : (
        <Text
          style={{
            color: '#202020',
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 12,
            textAlign: 'center',
            paddingTop: 6,
          }}>
          Lütfen En Az 3 Harf Yazınız! Örneğin:Metrobüs
        </Text>
      )}
    </StyledContainer>
  );
};

export default SelectPage;
