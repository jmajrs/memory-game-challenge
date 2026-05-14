import { GAME_RESULT_MESSAGES } from '../../constants/game'

/**
 * Result component
 * Renders the final screen of the Memory Game.
 *
 * This component displays a result message based on whether the player
 * won or lost the game. It also provides a button that allows the user
 * to restart the game by executing the onPlayAgain callback.
 *
 * @param <Boolean> hasWon Indicates whether the player won the game
 * @param <Function> onPlayAgain Callback function used to restart the game
 * @return <JSX.Element> Result screen UI
 */
function Result({ hasWon, onPlayAgain }) {
    const RESULT_MESSAGE = hasWon ? GAME_RESULT_MESSAGES.win : GAME_RESULT_MESSAGES.lose,
        RESULT_ICON = hasWon ? '✨' : '⏰';


    return (
        <main className='min-h-screen flex items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900'>
            <section className='text-center'>
                <div className="animate-slide-in-from-top mb-10">
                    <span className="mb-6 block text-7xl md:text-8xl">{RESULT_ICON}</span>
                    <h1 className='text-5xl md:text-7xl font-black text-white mb-8'>{RESULT_MESSAGE}</h1>

                    <p className="mx-auto mt-5 max-w-xl text-lg font-medium text-blue-100">
                        {hasWon
                            ? 'Great job! You found all cosmic pairs in time.'
                            : 'Time is up! Try again and find all pairs before the timer ends.'}
                    </p>
                </div>
                <button
                    className='rounded-full bg-yellow-400 px-8 py-4 text-xl font-bold text-slate-950 transition-transform duration-300 hover:scale-110'
                    type='button'
                    onClick={onPlayAgain}
                >Play Again</button>
            </section>
        </main>
    )
}

export default Result