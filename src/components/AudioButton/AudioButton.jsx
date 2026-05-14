/**
 * AudioButton component
 * Renders the button used to mute or unmute the game audio.
 *
 * This component displays a fixed audio control button on the screen.
 * The icon and accessibility label change depending on whether the audio
 * is currently muted or enabled.
 *
 * @param <Boolean> isMuted Indicates whether the game audio is currently muted
 * @param <Function> onToggleAudio Callback function used to toggle the audio state
 * @return <JSX.Element> Audio toggle button UI
 */
function AudioButton({ isMuted, onToggleAudio }) {
    return (
        <button
            type='button'
            onClick={onToggleAudio}
            className='fixed right-4 top-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-2xl shadow-xl transition-transform duration-300 hover:scale-110'
            aria-label={isMuted ? 'Unmute game audio' : 'Mute game audio'}
        >
            {isMuted ? '🔇' : '🔊'}
        </button>
    )
}

export default AudioButton