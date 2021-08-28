import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Animated, { 
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,  
  useAnimatedStyle,  
  useSharedValue 
} from 'react-native-reanimated';


import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand, 
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { Accessory } from '../../components/Accessory';
import { StatusBar, StyleSheet } from 'react-native';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { CarDTO } from '../../dtos/CarDto'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components'

export function CarDetails(){

  const theme = useTheme();
  
  const navigation = useNavigation();
  
  const route = useRoute();
  const car = route.params as CarDTO;

  const scrollY = useSharedValue(0);

  const headerStyleAnimation = useAnimatedStyle(()=>{
    return{
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarsStylesAnimation = useAnimatedStyle(()=>{
    return{
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP,
      )
    }
  })

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  })

  function handleScheduling(){
    navigation.navigate('Scheduling', car)
  }

  function handleGoBack(){
    navigation.goBack();
  }
  return(
    <Container>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent"
        translucent 
      />

      <Animated.View
        style={[
          headerStyleAnimation, 
          styles.header,
          {backgroundColor: theme.colors.background_secondary}
        ]}
      >
        <Header>
          <BackButton onPress={handleGoBack} />
        </Header>
        <Animated.View style={[sliderCarsStylesAnimation, ]}>
          <CarImages>
          <ImageSlider imagesUrl={car.photos}/>
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
          alignItems: 'center'
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >

        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          { 
            car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type}
                icon={getAccessoryIcon(accessory.type)} 
                name={accessory.name}
              />
            ))
          }
        </Accessories>

        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about} 
        </About>

      </Animated.ScrollView>
      <Footer>
        <Button 
          title="Escolher periodo do aluguel" 
          onPress={handleScheduling}
        />
      </Footer>
    </Container>
  )
}

const styles = StyleSheet.create({
  header:{
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
})