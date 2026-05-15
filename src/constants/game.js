import cometImage from '../assets/images/comet.svg'
import moonImage from '../assets/images/moon.svg'
import starImage from '../assets/images/star.svg'
import sunImage from '../assets/images/sun.svg'

export const INITIAL_GAME_TIMER_SECONDS = 30
export const CARD_FLIP_BACK_DELAY = 900
export const MATCH_MODAL_DURATION = 1000
export const TICKING_SOUND_START_TIME = 10

export const GAME_SCREENS = {
    home: 'HOME',
    game: 'GAME',
    result: 'RESULT'
}

export const GAME_RESULT_MESSAGES = {
    win: 'You did it',
    lose: "Oops you didn't find them all"
}

export const CARD_TYPES = {
    star: 'STAR',
    moon: 'MOON',
    sun: 'SUN',
    comet: 'COMET'
}

export const CARD_SYMBOLS = {
    [CARD_TYPES.star]: starImage,
    [CARD_TYPES.moon]: moonImage,
    [CARD_TYPES.sun]: sunImage,
    [CARD_TYPES.comet]: cometImage
}

export const BASE_CARDS = [
    {
        type: CARD_TYPES.star,
        image: CARD_SYMBOLS[CARD_TYPES.star],
        label: 'Star'
    },
    {
        type: CARD_TYPES.moon,
        image: CARD_SYMBOLS[CARD_TYPES.moon],
        label: 'Moon'
    },
    {
        type: CARD_TYPES.sun,
        image: CARD_SYMBOLS[CARD_TYPES.sun],
        label: 'Sun'
    },
    {
        type: CARD_TYPES.comet,
        image: CARD_SYMBOLS[CARD_TYPES.comet],
        label: 'Comet'
    }
]

export const TOTAL_MATCHES = BASE_CARDS.length

export const MATCH_MODAL_MESSAGES = {
    success: "nice! it's a match",
    fail: 'sorry, but this is not a match'
}

export const AUDIO_TYPES = {
    background: 'BACKGROUND',
    correct: 'CORRECT',
    incorrect: 'INCORRECT',
    ticking: 'TICKING'
}