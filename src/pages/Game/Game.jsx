import { useEffect, useState } from 'react'
import {
    BASE_CARDS,
    CARD_FLIP_BACK_DELAY,
    MATCH_MODAL_DURATION,
    MATCH_MODAL_MESSAGES,
    INITIAL_GAME_TIMER_SECONDS,
    TOTAL_MATCHES,
    AUDIO_TYPES,
    TICKING_SOUND_START_TIME
} from '../../constants/game'
import { createGameCards } from '../../utils/cards'
import MemoryCard from '../../components/MemoryCard/MemoryCard'
import FeedbackModal from '../../components/FeedbackModal/FeedbackModal'
import GameTimer from '../../components/GameTimer/GameTimer'
import AudioButton from '../../components/AudioButton/AudioButton'
import useGameAudio from '../../hooks/useGameAudio'

/**
 * Game component
 * Temporal function to render a temporary game screen used to simulate the end of a match.
 * note: This function and comment will change in the future
 */
function Game({ onFinishGame }) {
    const [cards, setCards] = useState(() => createGameCards(BASE_CARDS)),
        [selectedCards, setSelectedCards] = useState([]),
        [isBoardLocked, setIsBoardLocked] = useState(false),
        [modalMessage, setModalMessage] = useState(''),
        [timeLeft, setTimeLeft] = useState(INITIAL_GAME_TIMER_SECONDS),
        [matchesFound, setMatchesFound] = useState(0);

    const {
        isMuted,
        toggleMute,
        playAudio,
        stopAudio,
        stopAllAudio
    } = useGameAudio()

    function showFeedbackModal(message) {
        setModalMessage(message)
    }

    function hideFeedbackModal() {
        setModalMessage('')
    }

    function finishGame(gameWasWon) {
        stopAllAudio()
        onFinishGame(gameWasWon)
    }

    function handleSelectedCard(selectedCard) {
        if (isBoardLocked || selectedCards.length === 2 || timeLeft === 0) return

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
        if (timeLeft === 0) {
            onFinishGame(false)
            return
        }

        const TIMER_INTERVAL = setInterval(() => {
            setTimeLeft((currentTimeLeft) => currentTimeLeft - 1)
        }, 1000)

        return () => clearInterval(TIMER_INTERVAL)
    }, [timeLeft])

    useEffect(() => {
        if (timeLeft === TICKING_SOUND_START_TIME) playAudio(AUDIO_TYPES.ticking)

        if (timeLeft === 0) stopAudio(AUDIO_TYPES.ticking)
    }, [timeLeft, playAudio, stopAudio])

    useEffect(() => {
        if (matchesFound === TOTAL_MATCHES) onFinishGame(true)
    }, [matchesFound])

    useEffect(() => {
        if (selectedCards.length !== 2) return

        const [firstCard, secondCard] = selectedCards,
            CARDS_MATCH = firstCard.type === secondCard.type;

        setIsBoardLocked(true)

        if (CARDS_MATCH) {
            playAudio(AUDIO_TYPES.correct)
            showFeedbackModal(MATCH_MODAL_MESSAGES.success)

            const MATCH_TIMEOUT = setTimeout(() => {
                setCards((currentCards) =>
                    currentCards.map((card) => {
                        if (card.type !== firstCard.type) return card

                        return {
                            ...card,
                            isMatched: true
                        }
                    })
                )

                setMatchesFound((currentMatchesFound) => currentMatchesFound + 1)
                setSelectedCards([])
                setIsBoardLocked(false)
                hideFeedbackModal()
            }, MATCH_MODAL_DURATION)

            return () => clearTimeout(MATCH_TIMEOUT)
        }

        playAudio(AUDIO_TYPES.incorrect)
        showFeedbackModal(MATCH_MODAL_MESSAGES.fail)

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
            hideFeedbackModal()
        }, CARD_FLIP_BACK_DELAY + MATCH_MODAL_DURATION)

        return () => clearTimeout(FLIP_BACK_TIMEOUT)
    }, [selectedCards])

    return (
        <main className='min-h-screen bg-slate-950 px-4 py-8'>
            <FeedbackModal message={modalMessage} isVisible={Boolean(modalMessage)} />
            <AudioButton isMuted={isMuted} onToggleAudio={toggleMute} />
            <section className='mx-auto max-w-4xl'>
                <div className='mb-8 flex justify-between items-center '>
                    <h1 className='text-4xl font-bold text-white m-0'>Memory Game</h1>
                    <GameTimer timeLeft={timeLeft} />
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