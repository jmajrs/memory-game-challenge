/**
 * GameTimer component
 * Renders the remaining game time.
 *
 * This component displays the current time left in seconds. When the
 * timer reaches a low value, it changes its visual style to warn the
 * player that the game is close to ending.
 *
 * @param <Number> timeLeft Remaining game time in seconds
 * @return <JSX.Element> Game timer UI
 */
function GameTimer({ timeLeft }) {
    const TIMER_IS_LOW = timeLeft <= 10

    return (
        <div
            className={`min-w-20 rounded-full px-5 py-2 text-center text-lg font-black shadow-xl
            ${TIMER_IS_LOW ? 'bg-red-500 text-white animate-pulse shadow-red-500/30' : 'bg-yellow-400 text-slate-950 shadow-yellow-400/30'}`}
        >
            {timeLeft}s
        </div>
    )
}

export default GameTimer