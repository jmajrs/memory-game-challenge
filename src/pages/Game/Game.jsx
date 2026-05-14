import { useEffect, useState } from 'react'
import { BASE_CARDS, CARD_FLIP_BACK_DELAY } from '../../constants/game'
import { createGameCards } from '../../utils/cards'
import MemoryCard from '../../components/MemoryCard/MemoryCard'

/**
 * Game component
 * Temporal function to render a temporary game screen used to simulate the end of a match.
 * note: This function and comment will change in the future
 */
function Game({ onFinishGame }) {
    const [cards, setCards] = useState(() => createGameCards(BASE_CARDS)),
        [selectedCards, setSelectedCards] = useState([]),
        [isBoardLocked, setIsBoardLocked] = useState(false);

    function handleSelectedCard(selectedCard) {
        if (isBoardLocked || selectedCards.length === 2) return

        const UPDATED_CARDS = cards.map((card) => {
            if (card.id !== selectedCard.id) return card

            return {
                ...card,
                isFlipped: true
            }
        })

        setCards(UPDATED_CARDS)
        setSelectedCards((currentSelectedCards) => [
            ...currentSelectedCards,
            selectedCard
        ])
    }

    useEffect(() => {
        if (selectedCards.length !== 2) return

        const [firstCard, secondCard] = selectedCards,
            CARDS_MATCH = firstCard.type === secondCard.type;

        setIsBoardLocked(true)

        if (CARDS_MATCH) {
            setCards((currentCards) =>
                currentCards.map((card) => {
                    if (card.type !== firstCard.type) return card

                    return {
                        ...card,
                        isMatched: true
                    }
                })
            )

            setSelectedCards([])
            setIsBoardLocked(false)

            return
        }

        const FLIP_BACK_TIMEOUT = setTimeout(() => {
            setCards((currentCards) =>
                currentCards.map((card) => {
                    const CARD_SHOULD_FLIP_BACK = card.id === firstCard.id || card.id === secondCard.id

                    if (!CARD_SHOULD_FLIP_BACK) return card

                    return {
                        ...card,
                        isFlipped: false
                    }

                })
            )

            setSelectedCards([])
            setIsBoardLocked(false)
        }, CARD_FLIP_BACK_DELAY)

        return () => clearTimeout(FLIP_BACK_TIMEOUT)
    }, [selectedCards])

    return (
        <main className='min-h-screen bg-slate-950 px-4 py-8'>
            <section className='mx-auto max-w-4xl'>
                <div className='mb-8 flex flex-col items-center'>
                    <h1 className='text-4xl font-bold text-white mb-6'>Memory Game</h1>
                    <button
                        type='button'
                        onClick={() => onFinishGame(false)}
                        className='rounded-full bg-red-400 px-5 py-2 font-bold text-slate-950 transition-transform duration-300 hover:scale-105'
                    >Exit Test</button>
                </div>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                    {cards.map((card) => (
                        <MemoryCard
                            key={card.id}
                            card={card}
                            isDisabled={isBoardLocked}
                            onSelectCard={handleSelectedCard}
                        />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Game