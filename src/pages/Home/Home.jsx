import logo from '../../assets/images/logo.svg'

/**
 * Home component
 * Renders the initial screen of the Memory Game.
 *
 * This component displays the game title, a text with 
 * the instructions and a start button.
 * When the user clicks the button, it executes the onStartGame callback
 * to move from the home screen to the game screen.
 *
 * @param <Function> onStartGame Callback function used to start the game
 * @return <JSX.Element> Home screen UI
 */
function Home({ onStartGame }) {
    return (
        <main className='min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4'>
            <section className='mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center text-center'>
                <div className='animate-slide-in-from-top mb-10'>
                    <p className="mb-3 text-3xl font-bold uppercase tracking-[0.45em] text-yellow-300">Challenge</p>

                    <img src={logo} alt="Memory Game Logo" className="mx-auto w-64 max-w-xs drop-shadow-2xl md:max-w-md" />

                    <p className="mx-auto mt-5 max-w-xl text-lg font-medium text-blue-100">Match the cosmic pairs before time runs out.</p>
                </div>

                <button
                    type='button'
                    onClick={onStartGame}
                    className='animate-slide-in-from-bottom rounded-full bg-yellow-400 px-8 py-4 text-xl font-bold text-slate-950 transition-transform duration-300 hover:scale-110'
                >Start</button>
            </section>
        </main>
    )
}

export default Home