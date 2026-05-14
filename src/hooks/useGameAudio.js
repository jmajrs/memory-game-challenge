import { useEffect, useRef, useState } from 'react'
import { AUDIO_TYPES } from '../constants/game'
import backgroundSound from '../assets/audio/background.mp3'
import correctSound from '../assets/audio/correct.mp3'
import incorrectSound from '../assets/audio/incorrect.mp3'
import tickingSound from '../assets/audio/ticking.mp3'

/**
 * useGameAudio hook
 * Handles the audio behavior for the memory game.
 *
 * This hook stores the game audio instances, controls whether the game
 * is muted, and exposes helper functions to play, stop, and reset audio.
 * It also configures the background music loop and the volume level for
 * each sound effect used during the game.
 *
 * @return <Object> Audio state and helper functions used to control game sounds
 */
function useGameAudio() {
    const [isMuted, setIsMuted] = useState(false),
        AUDIO_REFS = useRef({
            [AUDIO_TYPES.background]: new Audio(backgroundSound),
            [AUDIO_TYPES.correct]: new Audio(correctSound),
            [AUDIO_TYPES.incorrect]: new Audio(incorrectSound),
            [AUDIO_TYPES.ticking]: new Audio(tickingSound)
        });

    function toggleMute() {
        setIsMuted((currentIsMuted) => !currentIsMuted)
    }

    function stopAudio(audioType) {
        const AUDIO = AUDIO_REFS.current[audioType]

        if (!AUDIO) return

        AUDIO.pause()
        AUDIO.currentTime = 0
    }

    function playAudio(audioType) {
        if (isMuted) return

        const AUDIO = AUDIO_REFS.current[audioType]

        if (!AUDIO) return

        AUDIO.currentTime = 0
        AUDIO.play().catch(() => { })
    }

    function stopAllAudio() {
        Object.values(AUDIO_REFS.current).forEach((audio) => {
            audio.pause()
            audio.currentTime = 0
        })
    }

    useEffect(() => {
        const BACKGROUND_AUDIO = AUDIO_REFS.current[AUDIO_TYPES.background]

        BACKGROUND_AUDIO.loop = true
        BACKGROUND_AUDIO.volume = 0.35

        AUDIO_REFS.current[AUDIO_TYPES.correct].volume = 0.75
        AUDIO_REFS.current[AUDIO_TYPES.incorrect].volume = 0.75
        AUDIO_REFS.current[AUDIO_TYPES.ticking].volume = 0.8
    }, [])

    useEffect(() => {
        const BACKGROUND_AUDIO = AUDIO_REFS.current[AUDIO_TYPES.background]

        if (isMuted) {
            stopAllAudio()
            return
        }

        BACKGROUND_AUDIO.play().catch(() => { })

        return () => { stopAllAudio() }
    }, [isMuted])

    return {
        isMuted,
        toggleMute,
        playAudio,
        stopAudio,
        stopAllAudio
    }
}

export default useGameAudio