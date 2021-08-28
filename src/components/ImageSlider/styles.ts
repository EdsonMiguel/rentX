import styled from 'styled-components/native';

import { Dimensions } from 'react-native'

interface ImageIndexProps{
  active: boolean
}

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  justify-content:flex-end;
  padding-right: 24px;
`;

export const ImageIndex = styled.View<ImageIndexProps>`
   background-color: ${({  theme, active}) => 
    active ? theme.colors.title : theme.colors.shape
   };
   margin-left:8px;
   height:6px;
   width:6px;

   border-radius:3px;
`;

export const CarWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 132px;
  justify-content: center;
  align-items: center;
`;

export const CarImage = styled.Image.attrs({
  resizeMode: "contain",
})`
  width: 280px;
  height: 132px;
`;
