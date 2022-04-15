import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {
  StyledContainer,
  StyledRegisterButton,
  StyledTextInput,
  StyledTitle,
} from '../components/StyledComponents';

import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';

const User = ({navigation}) => {
  const [resourcePath, setResourcePath] = useState();

  const selectFile = () => {
    const options = {
      title: 'Select Profile Picture',
      customButtons: [
        {
          name: 'customOptionKey',

          title: 'Choose file from Custom Option',
        },
      ],

      storageOptions: {
        skipBackup: true,

        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setResourcePath(response.assets[0].uri);
      }
    });
  };

  return (
    <StyledContainer>
      <StyledTitle>Kullanıcı Bilgileri</StyledTitle>
      <View style={{width: '80%', paddingVertical: 16, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => selectFile()}
          style={{
            width: 120,
            height: 120,
            borderWidth: 4,
            borderRadius: 60,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          {resourcePath ? (
            //Resim Düzenleme Yapılabilir!
            <Image
              style={{width: 100, height: 100, borderRadius: 50}}
              source={{uri: resourcePath}}
            />
          ) : (
            <Text style={{color: '#202020', fontFamily: 'Montserrat-SemiBold'}}>
              Select Photo
            </Text>
          )}
        </TouchableOpacity>
        <StyledTextInput placeholder="İsim" placeholderTextColor="#202020" />
        <StyledTextInput placeholder="Soyisim" placeholderTextColor="#202020" />
        <StyledTextInput placeholder="Yaş" placeholderTextColor="#202020" />
        <StyledTextInput
          placeholder="Üniversite Adı"
          placeholderTextColor="#202020"
        />
        <StyledTextInput
          placeholder="Üniversite Bölümü"
          placeholderTextColor="#202020"
        />
        <StyledTextInput
          placeholder="Üniversite Mail Adresi"
          placeholderTextColor="#202020"
        />
        <StyledRegisterButton
          onPress={() => navigation.navigate('UserRouteSelect')}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: '#202020',
              fontSize: 14,
              color: '#F0FFFF',
            }}>
            Kayıt Ol
          </Text>
        </StyledRegisterButton>
      </View>
    </StyledContainer>
  );
};

export default User;
