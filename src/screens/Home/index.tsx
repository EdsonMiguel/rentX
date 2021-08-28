import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { StatusBar, BackHandler, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { api } from '../../services/api'
import { Car } from '../../components/Car';
import { LoadingCarAnimated } from '../../components/LoadingCarAnimated';
import { CarDTO } from '../../dtos/CarDto';
import {Ionicons} from '@expo/vector-icons';

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler'

import {
Container,
Header, 
HeaderContent,
TotalCars,
CarList,
} from './styles';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);


import Logo from '../../assets/logo.svg';

type NavigationProps = {
  navigate: (screen:string, item: CarDTO) => void;
  
}

export function Home(){
  const [cars, setCars] =  useState<CarDTO[]>([] as CarDTO[])
  const [isLoading, setIsLoading] = useState(true)
  
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme(); 

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(()=>{
    return{
      transform:[
        {translateX: positionX.value},
        {translateY: positionY.value}
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;

    },
    onActive(event, ctx: any){
      positionX.value =  event.translationX + ctx.positionX;
      positionY.value = event.translationY + ctx.positionY;
    }, 
    onEnd(){
      positionX.value =  withSpring(0);
      positionY.value =  withSpring(0);
    }
  });


  function handleCarDetails(item: CarDTO){
    navigation.navigate('CarDetails', item);
  }

  function handleMyCars(){
    navigation.navigate('MyCars')
  }

  async function fetchCars(){
    setIsLoading(true)
    try {
      const response = await api.get('/cars');
      setCars(response.data)
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    fetchCars();
  },[])

  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress', ()=>{
      return true;
    })
  },[])
  return(
    <Container>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent"
        translucent 
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            {
              isLoading ? "" :
              `Total de ${cars.length} Carros`
            }
          </TotalCars>
        </HeaderContent>
      </Header>
    {
      isLoading ? 
      <LoadingCarAnimated /> :
      <CarList 
        data={cars}
        keyExtractor={car => String(car.id)}
        renderItem={({ item })=> 
          <Car data={item} onPress={() => handleCarDetails(item)}/> 
        }
      />
    }
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22
            }
          ]}
        >
          <ButtonAnimated 
            onPress={handleMyCars}
            style={[styles.button,{backgroundColor: theme.colors.main}]}
          >
            <Ionicons 
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  )
}


const styles = StyleSheet.create({
  button:{
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})