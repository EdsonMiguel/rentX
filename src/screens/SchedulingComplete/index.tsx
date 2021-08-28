import React from 'react';
import {  useWindowDimensions } from 'react-native';
import {
Container,
Content,
Title,
Message,
Footer,
} from './styles';

import { StatusBar }  from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';
export function SchedulingComplete(){

  const { width } = useWindowDimensions();
  const {navigate} = useNavigation()
  return(
    <Container>
      <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={ width } />
      <Content>
        <DoneSvg width={80} height={80}/>
        <Title>Carro Alugado</Title>
        <Message>
        {
          `Agora você só precisa \n ir até a concessionaria \n da RentX pegar seu automovel`
        }
        </Message>
      </Content>

      <Footer>
        <ConfirmButton  title="OK" onPress={() => navigate('Home')}/>
      </Footer>

    </Container>
  )
}