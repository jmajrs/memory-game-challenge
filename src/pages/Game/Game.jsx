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
 * Renders and controls the main Memory Game screen.
 *
 * This component manages the full game state, including the shuffled cards,
 * selected cards, matched pairs, timer, feedback modal, board lock state,
 * and game audio. It validates selected cards, checks if they match, updates
 * their visual state, plays the corresponding sound effects, and finishes
 * the game when the player finds all pairs or the timer reaches zero.
 *
 * @param <Function> onFinishGame Callback function used to finish the game and send the final result
 * @return <JSX.Element> Main game screen UI
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
        <main className='relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4 py-8'>
            <FeedbackModal message={modalMessage} isVisible={Boolean(modalMessage)} />
            <AudioButton isMuted={isMuted} onToggleAudio={toggleMute} />
            <section className='mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center'>
                <header>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-4xl font-black text-white drop-shadow-2xl md:text-5xl'>Memory Game</h1>
                        <GameTimer timeLeft={timeLeft} />
                    </div>

                    <div className='flex items-center justify-between my-8'>
                        <p className='m-0 text-xs font-bold uppercase tracking-[0.35em] text-yellow-300'>Find all pairs</p>
                        <span className='rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-blue-100'>
                            {matchesFound}/{TOTAL_MATCHES} matches
                        </span>
                    </div>

                </header>
                <div className='mx-auto grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:gap-5'>
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