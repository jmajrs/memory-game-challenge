/**
 * FeedbackModal component
 * Renders a feedback modal over the game screen.
 *
 * This component is only displayed when isVisible is true. It shows
 * a centered message that can be used to give the player quick feedback,
 * such as a correct match or incorrect match.
 *
 * @param <String> message Text message displayed inside the modal
 * @param <Boolean> isVisible Indicates whether the modal should be rendered
 * @return <JSX.Element|null> Feedback modal UI when visible, otherwise null
 */
function FeedbackModal({ message, isVisible }) {
    if (!isVisible) return null

    const IS_SUCCESS_MESSAGE = message.includes('nice')

    return (
        <div className="fixed inset-0 flex flex-col items-center px-4">
            <section
                className="animate-modal-pop mt-12 rounded-3xl bg-white px-8 py-6 text-center shadow-2xl">
                <p className="text-2xl font-black text-slate-950">{IS_SUCCESS_MESSAGE ? '✨' : '💫'}{message}</p>
            </section>
        </div>
    )
}

export default FeedbackModal