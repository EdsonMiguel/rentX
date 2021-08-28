import React, { useEffect, useState} from 'react';
import { CarDTO } from '../../dtos/CarDto';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';

import {
Container,
Header,
Title,
SubTitle,
Content,
Appointments,
AppointmentsTitle,
AppointmentsQuantity,
CarWrapper,
CarFooter,
CarFooterTitle,
CarFooterPeriod,
CarFooterDate,

} from './styles';

import { 
  StatusBar,
  FlatList
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { useTheme } from 'styled-components';

import { LoadingCarAnimated } from '../../components/LoadingCarAnimated'
interface CarProps{
  id: string;
  userId: string;
  car: CarDTO
  startDate: string;
  endDate: string;
}

export function MyCars(){
  const [cars, setCars] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation();

  async function fetchCars(){
    try {
      const response = await api.get("/schedules_byuser?user_id=1");
      setCars(response.data);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
    
  }
  
  function handleGoBack(){
    navigation.goBack();
  }

  useEffect(()=>{
    fetchCars()
  },[])

  return(
    <Container>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent"
        translucent 
      />
      <Header>
        <BackButton 
          onPress={handleGoBack} 
          color={theme.colors.shape}  
        />
        <Title>
        Seus agendamentos, estão aqui.
        </Title>
        <SubTitle>
          Conforto, Segurança e Privacidade!
        </SubTitle>
      </Header>
        <Content>
          {
            isLoading ?
            <LoadingCarAnimated />
            : <>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>
              <FlatList 
                data={cars}
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <CarWrapper>
                    <Car  data={item.car}/>
                    <CarFooter>
                      <CarFooterTitle>Periodo</CarFooterTitle>
                      <CarFooterPeriod>
                        <CarFooterDate>{item.startDate}</CarFooterDate>
                        <AntDesign 
                          name="arrowright"
                          size={20}
                          color={theme.colors.title}
                          style={{marginHorizontal: 10}}
                        />
                        <CarFooterDate>{item.endDate}</CarFooterDate>
                      </CarFooterPeriod>
                    </CarFooter>
                  </CarWrapper>
                )}
              />
          </>}

        </Content>
    </Container>
  )
}