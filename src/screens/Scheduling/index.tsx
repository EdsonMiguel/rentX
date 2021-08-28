import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
Container,
Header, 
Title,
RentalPeriod,
DateInfo,
DateTitle,
DateValue,
Content,
Footer,
} from './styles';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, generateInterval, MarkedDateProps } from '../../components/Calendar';
import { StatusBar } from 'react-native'
import ArrowSvg from '../../assets/arrow.svg'
import { DateObject } from 'react-native-calendars';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { format } from 'date-fns'
import { CarDTO } from '../../dtos/CarDto';

interface RentalPeriod{
  startFormatted: string;
  endFormatted: string;
}

export function Scheduling(){
  const [lastSelectedDate, setSelectedDate] = useState<DateObject>({} as DateObject);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const car = route.params as CarDTO;

  function handleSchedulingDetails(){
      navigation.navigate('SchedulingDetails',{
        car,
        dates: Object.keys(markedDates)
      });
  }

  function handleGoBack(){
    navigation.goBack();
  }

  function handleDateChange(date: DateObject){
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp){
      let aux = start;
      start = end;
      end = aux;
    }

    setSelectedDate(date)
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const lastDate = Object.keys(interval)[ Object.keys(interval).length -1]

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy'),
    })

  }

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
          { `Escolha uma \n data de início \n e fim do aluguel`}
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>De:</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>
          <ArrowSvg/>
          <DateInfo>
            <DateTitle>Ate:</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

        <Content>
          <Calendar 
            markedDates={markedDates}
            onDayPress={handleDateChange}
          />
        </Content>

        <Footer>
          <Button 
            title="Confirmar" 
            onPress={handleSchedulingDetails} 
            enabled={!!rentalPeriod.startFormatted}
          />
        </Footer>
    </Container>
  )
}