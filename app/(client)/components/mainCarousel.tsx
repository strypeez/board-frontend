'use client'

import CarouselSlide from "./carouselSlide"
import { useState, useEffect } from 'react';
import SlideSelector from "./slideSelector";
import { Game } from "@/models/gameModel";
import { DefaultGame } from "@/defaults";


export default function MainCarousel({data, error}) {
    const [carouselGames, setCarouselGames] = useState<Game[]>([DefaultGame]);
    const [carouselIndex, setCarouselIndex] = useState<number>(0);
    const [errMessage, setErrMessage] = useState('');

    const handleIndexChange = (newIndex: number) => {
        setCarouselIndex(newIndex);
    }

    useEffect(() => {
        setCarouselGames(data);
        setErrMessage(error);
    }, [data, error]);

    return <div className="main-carousel">
        { errMessage && <div className="client-error">
            {errMessage}
            </div>}
        <CarouselSlide game={carouselGames[carouselIndex]} />
        <SlideSelector currentIndex={carouselIndex} numButtons={carouselGames.length} buttonFunction={handleIndexChange}/>
    </div>
}