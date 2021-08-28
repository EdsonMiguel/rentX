import React from 'react';
import { useTheme } from 'styled-components';
import {Container, Icon} from './styles';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

interface Props extends BorderlessButtonProps{
  color?: string;
}
export function BackButton({color, ...rest}:Props){

  const theme = useTheme();

  return(
    <Container {...rest}>
      <Icon color={ color ? color : theme.colors.text }/>
    </Container>
  )
}