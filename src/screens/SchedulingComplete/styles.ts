import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.header};
  padding-top: ${RFValue(96)}px;
`;

export const Content = styled.View`
  flex:1;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 180px;
  
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(30)}px;
  font-family: ${({theme}) => theme.fonts.secondary_600};
  margin-top: 40px;
`;

export const Message = styled.Text`
  color: ${({theme}) => theme.colors.text_detail};
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  text-align: center;
  margin-top: 16px;
  line-height: ${RFValue(25)}px;
  
`;


export const Footer = styled.View`
  width: 100%;
  align-items:center;
  margin: 80px 0;
`;
