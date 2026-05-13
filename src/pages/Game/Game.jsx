import { useState } from 'react'
import { BASE_CARDS } from '../../constants/game'
import { createGameCards } from '../../utils/cards'

/**
 * Game component
 * Temporal function to render a temporary game screen used to simulate the end of a match.
 * note: This function and comment will change in the future
 */
function Game({ onFinishGame }) {
    const [cards] = useState(() => createGameCards(BASE_CARDS))

    return (
        <main className='min-h-screen bg-slate-950 flex items-center justify-center px-4'>
            <section className='mx-auto max-w-4xl'>
                <div className='mb-8 flex flex-col items-center justify-between'>
                    <h1 className='text-4xl font-bold text-white mb-6'>Game Screen</h1>
                    <button
                        type='button'
                        onClick={() => onFinishGame(false)}
                        className='rounded-full bg-red-400 px-5 py-2 font-bold text-slate-950 transition-transform duration-300 hover:scale-105'
                    >Exit Test</button>
                </div>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                    {cards.map((card) => (
                        <article
                            key={card.id}
                            className='flex aspect-square items-center justify-center rounded-2xl bg-blue-700 text-5xl shadow-lg'
                        >{card.symbol}</article>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Game