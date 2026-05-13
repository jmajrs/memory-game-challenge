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
    const RESULT_MESSAGE = hasWon ? GAME_RESULT_MESSAGES.win : GAME_RESULT_MESSAGES.lose

    return (
        <main className='min-h-screen bg-slate-950 flex items-center justify-center px-4'>
            <section className='text-center'>
                <h1 className='text-5xl md:text-7xl font-black text-white mb-8'>{RESULT_MESSAGE}</h1>
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