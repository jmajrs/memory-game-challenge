/**
 * shuffleCards function
 * Creates a shuffled copy of the received cards array.
 *
 * This function keeps the original cards array unchanged by creating
 * a new array before sorting it randomly. It is used to display the
 * game cards in a different order each time a new game starts.
 *
 * @param <Array> cards List of cards to shuffle
 * @return <Array> New shuffled cards array
 */
export function shuffleCards(cards) {
    return [...cards].sort(() => Math.random() - 0.5)
}

/**
 * createGameCards function
 * Creates the complete set of cards needed for the memory game.
 *
 * This function receives the base cards and duplicates each one to create
 * a pair. Each generated card receives a unique id and the initial game
 * state properties needed to control whether the card is flipped or matched.
 * After creating all pairs, the cards are shuffled before being returned.
 *
 * @param <Array> baseCards List of base cards used to generate card pairs
 * @return <Array> Shuffled list of game cards with duplicated pairs
 */
export function createGameCards(baseCards) {
    const CARD_PAIRS = baseCards.flatMap((card) => [
        {
            ...card,
            id: `${card.type}-1`,
            isFlipped: false,
            isMatched: false
        },
        {
            ...card,
            id: `${card.type}-2`,
            isFlipped: false,
            isMatched: false
        }
    ])

    return shuffleCards(CARD_PAIRS)
}