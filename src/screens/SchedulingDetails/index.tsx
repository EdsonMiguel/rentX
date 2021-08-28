import React, {useState, useEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand, 
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { Accessory } from '../../components/Accessory';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {format} from 'date-fns';
import { RFValue } from 'react-native-responsive-fontsize'
import { CarDTO } from '../../dtos/CarDto';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native';

interface Routes {
  car: CarDTO;
  dates: string[],
}

interface FormattedDates{
  start: string;
  end: string;
}

export function SchedulingDetails(){
  const [formattedDates, setFormattedDates] = useState<FormattedDates>({} as FormattedDates)
  const [isLoading, setIsLoading] = useState(false)
  const route = useRoute()
  const {car, dates} = route.params as Routes;
  
  const theme = useTheme();
  const navigation = useNavigation();
  
  const rentTotal = (car.rent.price * dates.length).toFixed(2)

  function handleGoBack(){
    navigation.goBack();
  }

  async function handleSchedulingComplete(){
    setIsLoading(true)
    try {
      const response = await api.get(`/schedules_bycars/${car.id}`);
      
      const unavailableDates = [
        ...response.data.unavailable_dates,
        ...dates
      ]
  
      await api.post('/schedules_byuser',{
        userId: 1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
        endDate: format(getPlatformDate(new Date(dates[dates.length - 1])),'dd/MM/yyyy')
      })
      
      await api.put(`/schedules_bycars/${car.id}`,{
        id: car.id,
        unavailable_dates: unavailableDates
      })
      
      navigation.navigate('SchedulingComplete');
    } catch (error) {
      Alert.alert("Houve um erro na aplicação.")
    } finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    setFormattedDates({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])),'dd/MM/yyyy')
    })
  },[])
  return(
    <Container>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent"
        translucent 
      />

      <Header>
        <BackButton onPress={ handleGoBack }/>
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos}/>
      </CarImages>

      <Content>
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
              name={accessory.name}/>
          ))
        }
        </Accessories>
        
        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              size={RFValue(24)}
              name="calendar"
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>De:</DateTitle>
            <DateValue>
              {formattedDates.start}
            </DateValue>
          </DateInfo>
          <Feather 
            size={RFValue(10)}
            name="chevron-right"
            color={theme.colors.text}
          />
          <DateInfo>
            <DateTitle>Ate:</DateTitle>
            <DateValue>
              {formattedDates.end}
            </DateValue>
          </DateInfo>

        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {`R$ ${car.rent.price} x${dates.length} diárias`}
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button 
          title="Confirmar" 
          onPress={handleSchedulingComplete}
          color={theme.colors.success}
          isLoading={isLoading}
          enabled={!isLoading}
        />
      </Footer>
    </Container>
  )
}