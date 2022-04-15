import styled from 'styled-components';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {COLORS} from './main/Colors';

export const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-top: 5%;
  padding-bottom: 5%;
`;

export const StyledButton = styled.TouchableOpacity`
  width: 80%;
  height: 20%;
  background-color: ${COLORS.DARK_BLUE};
  margin-top: 8px;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const StyledTitle = styled.Text`
  font-size: 16px;
  font-family: 'Montserrat-SemiBold';
  color: #202020;
`;

export const StyledTextInput = styled.TextInput`
  width: 80%;
  border: 2px solid #202020;
  font-family: 'Montserrat-SemiBold';
  border-radius: 6px;
  padding: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  color: #202020;
`;

export const StyledRegisterButton = styled.TouchableOpacity`
  margin-top: 16px;
  width: 35%;
  background-color: ${COLORS.LIGHT_BLUE};
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  border-radius: 6px;
`;

export const StyledTravelButton = styled.TouchableOpacity`
  width: 70%;
  background-color: lightgray;
  border: 2px solid #202020;
  margin: 8px;
  border-radius: 6px;
  padding: 12px;
`;

export const StyledTravelButtonText = styled.Text`
  font-family: Montserrat-SemiBold;
  color: #202020;
`;

export const StyledPlaceItem = styled.TouchableOpacity`
  width: 70%;
  background-color: lightgray;
  margin-top: 6px;
  margin-bottom: 6px;
  padding: 16px;
  border-radius: 6px;
`;
