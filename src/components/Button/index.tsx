import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { RectButtonProps } from 'react-native-gesture-handler';
import {
Container, 
Title
} from './styles';

interface Props extends RectButtonProps{
  title: string;
  color?: string;
  enabled?: boolean;
  isLoading?: boolean;
  light?: boolean;
}

export function Button({
  title, 
  color, 
  enabled = true,
  isLoading = false,
  light = false,
   ...rest}:Props){
  
    const theme = useTheme();
  return(
    <Container 
      {...rest}
      color={color}
      enabled={enabled}
      style={{opacity: (!enabled  || isLoading) ? .5 : 1 }} 
    >
      {isLoading ? 
        <ActivityIndicator 
          color={theme.colors.shape}
          size="small"
        /> : 
        <Title light={light}>{title}</Title>
      }
    </Container>
  )
}