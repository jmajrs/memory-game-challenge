function MemoryCard({ card, onSelectCard }) {
    const CARD_IS_VISIBLE = card.isFlipped || card.isMatched

    return (
        <button type='button' onClick={() => onSelectCard(card)} className='group aspect-square w-full'>
            <div
                className={`relative h-full w-full rounded-3xl transition-transform duration-500 transform-style-preserve-3d 
                        ${CARD_IS_VISIBLE ? 'rotate-y-180' : ''}`
                }
            >
                <div className='absolute inset-0 flex items-center justify-center rounded-3xl bg-blue-700 shadow-xl backface-hidden'>
                    <span className='text-6xl font-black text-yellow-300'>?</span>
                </div>

                <div className='absolute inset-0 flex rotate-y-180 items-center justify-center rounded-3xl bg-slate-100 shadow-xl backface-hidden'>
                    <span className='text-6xl'>{card.symbol}</span>
                </div>
            </div>
        </button>
    )
}

export default MemoryCard