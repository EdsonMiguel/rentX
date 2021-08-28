import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';


interface Props {
  color?: string;
}
export function Loading({color}:Props){
  const {colors} = useTheme();
  return(  
    <ActivityIndicator 
      size="large" 
      color={color? color : colors.main}
      style={{
        flex:1
      }}
    />
  )
}