import React from 'react';
import {View, Text, Image} from 'react-native';
import {StyledButton, StyledContainer} from '../components/StyledComponents';

const Home = ({navigation}) => {
  return (
    <StyledContainer>
      <Image
        source={require('../assets/images/logo.png')}
        style={{width: 300, height: 200}}
      />
      <StyledButton
        activeOpacity={0.9}
        onPress={() => navigation.navigate('User')}>
        <Text style={{fontFamily: 'Montserrat-SemiBold', color: '#F0FFFF'}}>
          Yolcu
        </Text>
      </StyledButton>
      <StyledButton activeOpacity={0.9} onPress={() => alert('Sürücü Sayfası')}>
        <Text style={{fontFamily: 'Montserrat-SemiBold', color: '#F0FFFF'}}>
          Sürücü
        </Text>
      </StyledButton>
    </StyledContainer>
  );
};

export default Home;
