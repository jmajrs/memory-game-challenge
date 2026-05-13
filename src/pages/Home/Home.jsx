/**
 * Home component
 * Renders the initial screen of the Memory Game.
 *
 * This component displays the game title and a start button.
 * When the user clicks the button, it executes the onStartGame callback
 * to move from the home screen to the game screen.
 *
 * @param <Function> onStartGame Callback function used to start the game
 * @return <JSX.Element> Home screen UI
 */
function Home({ onStartGame }) {
    return (
        <main className='min-h-screen bg-slate-950 flex items-center justify-center px-4'>
            <section className='text-center'>
                <h1 className='text-5xl md:text-7xl font-black text-yellow-300 mb-8'>Memory Game</h1>
                <button
                    className='rounded-full bg-yellow-400 px-8 py-4 text-xl font-bold text-slate-950 transition-transform duration-300 hover:scale-110'
                    type='button'
                    onClick={onStartGame}
                >Start</button>
            </section>
        </main>
    )
}

export default Home