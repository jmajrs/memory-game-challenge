/**
 * Game component
 * Temporal function to render a temporary game screen used to simulate the end of a match.
 * note: This function and comment will change in the future
 */
function Game({ onFinishGame }) {
    return (
        <main className='min-h-screen bg-slate-950 flex items-center justify-center px-4'>
            <section className='text-center'>
                <h1 className='text-4xl font-bold text-white mb-6'>Game Screen</h1>
                <button
                    className='rounded-full bg-green-400 px-6 py-3 font-bold text-slate-950 transition-transform duration-300 hover:scale-105'
                    type='button'
                    onClick={() => onFinishGame(true)}
                >Simulate Win</button>
                <button
                    className='ml-4 rounded-full bg-red-400 px-6 py-3 font-bold text-slate-950 transition-transform duration-300 hover:scale-105'
                    type='button'
                    onClick={() => onFinishGame(false)}
                >Simulate Lose</button>
            </section>
        </main>
    )
}

export default Game