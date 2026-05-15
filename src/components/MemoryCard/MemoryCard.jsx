/**
 * MemoryCard component
 * Renders an individual card for the memory game.
 *
 * This component controls the visual state of a single card. The card
 * is shown as visible when it is flipped or already matched. When the
 * card is hidden, the user can select it by clicking the button, which
 * sends the full card data to the onSelectCard callback.
 *
 * @param <Object> card Card data used to render and control the card state
 * @param <Function> onSelectCard Callback function executed when the card is selected
 * @param <Boolean> isDisabled Indicates whether the card selection should be blocked
 * @return <JSX.Element> Memory card UI
 */
function MemoryCard({ card, onSelectCard, isDisabled }) {
    const CARD_IS_VISIBLE = card.isFlipped || card.isMatched

    return (
        <button
            type='button'
            disabled={isDisabled || CARD_IS_VISIBLE}
            onClick={() => onSelectCard(card)}
            className='group aspect-square w-full disabled:cursor-not-allowed'
            aria-label={CARD_IS_VISIBLE ? `${card.type} card` : 'Hidden memory card'}
        >
            <div
                className={`relative h-full w-full rounded-2xl transition-transform duration-500 transform-style-preserve-3d sm:rounded-3xl
                        ${CARD_IS_VISIBLE ? 'rotate-y-180' : ''}`
                }
            >
                <div className='absolute inset-0 flex items-center justify-center rounded-2xl border-4 border-yellow-300/80 bg-blue-700 shadow-xl shadow-blue-950/40 backface-hidden transition-transform duration-300 group-hover:scale-105 sm:rounded-3xl'>
                    <span className='text-5xl font-black text-yellow-300 drop-shadow-lg sm:text-6xl'>?</span>
                </div>

                <div className='absolute inset-0 flex rotate-y-180 items-center justify-center rounded-2xl border-4 border-white/80 bg-slate-100 shadow-xl shadow-blue-950/40 backface-hidden sm:rounded-3xl'>
                    <span className='text-5xl drop-shadow-md sm:text-6xl md:text-7xl'>{card.symbol}</span>
                </div>
            </div>
        </button>
    )
}

export default MemoryCard