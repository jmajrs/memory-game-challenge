export const INITIAL_GAME_TIMER_SECONDS = 30
export const CARD_FLIP_BACK_DELAY = 900

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
    [CARD_TYPES.star]: '⭐',
    [CARD_TYPES.moon]: '🌙',
    [CARD_TYPES.sun]: '☀️',
    [CARD_TYPES.comet]: '☄️'
}

export const BASE_CARDS = [
    {
        type: CARD_TYPES.star,
        symbol: CARD_SYMBOLS[CARD_TYPES.star]
    },
    {
        type: CARD_TYPES.moon,
        symbol: CARD_SYMBOLS[CARD_TYPES.moon]
    },
    {
        type: CARD_TYPES.sun,
        symbol: CARD_SYMBOLS[CARD_TYPES.sun]
    },
    {
        type: CARD_TYPES.comet,
        symbol: CARD_SYMBOLS[CARD_TYPES.comet]
    }
]