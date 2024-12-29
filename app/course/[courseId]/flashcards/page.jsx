'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FlashcardItem from './_components/FlashcardItem';
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

function Flashcards() {
    const { courseId } = useParams();
    const router = useRouter();
    const [flashCards, setFlashCards] = useState();
    const [flippedStates, setFlippedStates] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [api, setApi] = useState();

    useEffect(() => {
        GetFlashCards();
    }, [])

    useEffect(() => {
        if (!api) {
            return;
        }
        api.on('select', (e) => {
            setFlippedStates(false);
            setCurrentStep(e.selectedScrollSnap());
        })
    }, [api])

    const GetFlashCards = async () => {
        const result = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType: 'Flashcard'
        })
        setFlashCards(result.data)
        // Initialize flip states for all cards
        if (result.data?.content) {
            const initialStates = {};
            result.data.content.forEach((_, index) => {
                initialStates[index] = false;
            });
            setFlippedStates(initialStates);
        }
    }

    const handleClick = (index) => {
        setFlippedStates(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    }

    return (
        <div className="p-6">
            <h2 className='font-bold text-2xl'>Flashcards</h2>
            <p>Flashcards: The Ultimate tool to Lock in Concepts!</p>

            {flashCards?.content && (
                <div className='max-w-[800px] mx-auto mt-6 mb-8 flex gap-2 items-center'>
                    {flashCards.content.map((_, index) => (
                        <div
                            key={index}
                            className={`w-full h-2 rounded-full ${
                                index <= currentStep ? 'bg-primary' : 'bg-gray-200'
                            }`}
                        />
                    ))}
                </div>
            )}
            
            <div className='relative w-full max-w-[800px] mx-auto'>
                <Carousel setApi={setApi} className="w-full">
                    <CarouselContent>
                        {flashCards?.content && flashCards.content.map((flashcard, index) => (
                            <CarouselItem key={index} className='flex items-center justify-center'>
                                <FlashcardItem
                                    handleClick={() => handleClick(index)}
                                    isFlipped={flippedStates[index]}
                                    flashcard={flashcard}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute top-1/2 -translate-y-1/2 w-full">
                        <CarouselPrevious className="absolute left-0 -translate-x-1/2" />
                        <CarouselNext className="absolute right-0 translate-x-1/2" />
                    </div>
                </Carousel>
            </div>

            {currentStep === (flashCards?.content?.length - 1) && (
                <div className='flex items-center gap-10 flex-col justify-center mt-8'>
                    <h2 className='text-xl font-semibold'>End of Flashcards</h2>
                    <Button onClick={() => router.back()}>
                        Go to Course Page
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Flashcards