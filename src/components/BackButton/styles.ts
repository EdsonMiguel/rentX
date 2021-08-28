import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled(BorderlessButton)``;

export const Icon = styled(MaterialIcons).attrs({
  size: 24,
  name: 'chevron-left',
})``;