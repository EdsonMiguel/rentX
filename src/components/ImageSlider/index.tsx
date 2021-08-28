import React, { useState, useRef } from 'react';

import { FlatList, ViewToken } from 'react-native';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarWrapper,
  CarImage,
} from './styles';

interface Props {
  imagesUrl: string[]
}


interface ChangeImageProps{
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props){
  const [imageIndex, setImageIndex] = useState(0)

  const indexChanged = useRef((info: ChangeImageProps)=>{
    const index = info.viewableItems[0].index!;
    setImageIndex(index);

  });

  return(
    <Container>
      <ImageIndexes>
        {
          imagesUrl.map((_, index)=>
            <ImageIndex 
              active={index === imageIndex}
              key={String(index)}
            />
          )
        }

      </ImageIndexes>
        <FlatList 
          data={imagesUrl}
          keyExtractor={key => key}
          renderItem={({ item }) => 
            <CarWrapper>
              <CarImage source={{uri: item }}/>
            </CarWrapper>
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanged.current}
        />
    </Container>
  )
}