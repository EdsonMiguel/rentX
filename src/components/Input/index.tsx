import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';

import {
Container, IconContainer, InputText
} from './styles';

interface Props extends TextInputProps{
  iconName: React.ComponentProps<typeof Feather>['name'];
  value: string;
}

export function Input({ iconName, value, ...rest }: Props){

  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  function handleInputFocus(){
    setIsFocused(true);
  }

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!value.trim())
  }

  return(
    <Container >
      <IconContainer isFocused={isFocused}>
        <Feather  
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
          name={iconName}
        />
      </IconContainer>
      <InputText 
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
      />
    </Container>
  )
}