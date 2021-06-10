//Importaciones
import React from 'react';
import { Image } from 'react-native-elements';
import Carousel from "react-native-snap-carousel";

//Componente para mostrar imágenes en carousel: 
//deslizar en pantalla para encontrar otras imágenes
export default function CarouselImages(props) {
    const { arrayImages, height, width } = props;

    const renderItem = ({ item }) => {
        return (
            <Image
                style={{ width, height }}
                source={{ uri: item }}
                containerStyle={{ overflow: "hidden", borderBottomRightRadius: 50, borderBottomLeftRadius: 50, }}
            />)
    }

    return (
        <Carousel
            layout={"default"}
            data={arrayImages}
            sliderWidth={width}
            itemWidth={width}
            renderItem={renderItem}
        />
    )
}
