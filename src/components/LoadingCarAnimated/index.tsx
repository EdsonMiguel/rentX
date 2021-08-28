import React from 'react';

import LottieView from 'lottie-react-native';

import carAnimation from '../../assets/load_animated.json'

import {
Container,
} from './styles';

export function LoadingCarAnimated(){
  return(
    <Container>
      <LottieView 
        source={carAnimation}
        style={{ height: 200}}
        resizeMode="contain"
        loop
        autoPlay
      />
    </Container>
  )
}