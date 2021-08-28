import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background_primary};
  align-items: center;
`;

export const Header = styled.View`
  width:100%;
  height: 325px;
  background-color: ${({theme}) => theme.colors.header};
  justify-content:center;
  padding: 25px;
  padding-top: ${getStatusBarHeight() + 32}px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape}; 
  font-family: ${({theme}) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;
  margin-top: 24px;
`;

export const SubTitle = styled.Text`
  color: ${({theme}) => theme.colors.shape}; 
  font-family: ${({theme}) => theme.fonts.secondary_400};
  font-size: ${RFValue(13)}px;
  margin-top: 24px;
`;


export const Content = styled.View`
  width: 100%;
  flex: 1;
  padding: 0 16px;
`;

export const ContentLoading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Appointments = styled.View`
  width: 100%;
  flex-direction: row;
  align-items:center;
  justify-content: space-between;
  padding: 24px 0;
`;

export const AppointmentsTitle = styled.Text`
  color: ${({theme}) => theme.colors.text}; 
  font-family: ${({theme}) => theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;
`;

export const AppointmentsQuantity = styled.Text`
  color: ${({theme}) => theme.colors.title}; 
  font-family: ${({theme}) => theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;
`;


export const CarWrapper = styled.View`
  margin-bottom: 16px;
`;

export const CarFooter = styled.View`
  padding:12px;
  margin-top: -10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color:  ${({theme}) => theme.colors.background_secondary}; 
`;

export const CarFooterTitle = styled.Text`
  color: ${({theme}) => theme.colors.text_detail}; 
  font-family: ${({theme}) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CarFooterDate = styled.Text`
  color: ${({theme}) => theme.colors.text_detail}; 
  font-family: ${({theme}) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
`;
