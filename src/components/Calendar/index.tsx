import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { ptBr } from './locale';
import { generateInterval } from './generateInterval'
import { 
  Calendar as CustomCalendar,
  LocaleConfig,
  DateCallbackHandler
} from 'react-native-calendars'

LocaleConfig.locales['pt-br'] = ptBr;
LocaleConfig.defaultLocale = 'pt-br'

interface MarkedDateProps{
  [date: string]: {
    textColor?: string;
    color?: string;
    disabled?: boolean;
    disableTouchEvent: boolean;
  },
}

interface CalendarProps{
  markedDates: MarkedDateProps;
  onDayPress: DateCallbackHandler;
}

function Calendar({ markedDates, onDayPress }: CalendarProps){
  const theme = useTheme();

  return(
    <CustomCalendar 
      renderArrow={(directions) =>(
        <Feather 
          size={24}
          color={theme.colors.text}
          name={`chevron-${directions}`}
        />
      ) }
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom:10
      }}

      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayFontSize: 10,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        textMonthFontFamily: theme.fonts.secondary_600,
        arrowStyle:{
          marginHorizontal: -15
        }
      }}

      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  )
}


export {
  Calendar,
  MarkedDateProps,
  CalendarProps,
  generateInterval
}