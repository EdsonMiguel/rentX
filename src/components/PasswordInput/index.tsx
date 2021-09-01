import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';


import {
Container, 
IconContainer, 
InputText
} from './styles';

interface Props extends TextInputProps{
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props){
  const [ isPasswordVisible, setIsPasswordVisible ] = useState(true);
  const [ isFilled, setIsFilled ] = useState(false);
  const [ isFocused, setIsFocused ] = useState(false);
  const theme = useTheme();

  function handleVisibilityPasswordChange(){
    setIsPasswordVisible(prevState => !prevState)
  }

  function handleInputFocus(){
    setIsFocused(true);
  }

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!value?.trim())
  }
  return(
    <Container >
      <IconContainer isFocused={isFocused} >
        <Feather  
          size={24}
          color={ 
            isFilled || isFocused ? 
              theme.colors.main : theme.colors.text_detail
          }
          name={iconName}
        />
      </IconContainer>
      <InputText 
        {...rest}
        secureTextEntry={isPasswordVisible}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        isFocused={isFocused}
      />
      <BorderlessButton 
        onPress={handleVisibilityPasswordChange}
      >
        <IconContainer isFocused={isFocused} >
          <Feather 
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  )
}