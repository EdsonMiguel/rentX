import React, { useState } from 'react';

import {
  Container,
  Header,
  Title, 
  SubTitle, 
  Form,
  Footer,
} from './styles';
import theme from '../../styles/theme';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';

import {
  StatusBar, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';

import * as Yup from 'yup';
import { Alert } from 'react-native';



export function SignIn(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function handleSignIn(){
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail é obrigátorio")
          .email("Digite um e-mail válido"),
        password: Yup.string()
        .required("Senha é obrigátorio")
      })
      await schema.validate({ email, password});

    } catch (error) {
      if( error instanceof Yup.ValidationError){
        Alert.alert('Ops', error.message)
      }
    }
  }

  return(
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <Container>
          <StatusBar 
            barStyle="dark-content" 
            backgroundColor="transparent" 
            translucent
          />

          <Header>
            <Title>Estamos{'\n'}quase lá</Title>
            <SubTitle>
              Faça login para começar{'\n'} 
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input 
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize={'none'}
              value={email}
              onChangeText={setEmail}
            />
            <PasswordInput 
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
          </Form>

          <Footer>
            <Button 
              title="Login" 
              onPress={handleSignIn}
              enabled={true}
              isLoading={false}
            />
            <Button 
              title="Criar conta gratuita"
              onPress={()=>{}}
              enabled={false}
              isLoading={false}
              color={theme.colors.shape}
              light
            />
          </Footer>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}