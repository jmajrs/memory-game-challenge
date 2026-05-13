import { useState } from "react"
import Game from './pages/Game/Game'
import Home from './pages/Home/Home'
import Result from './pages/Result/Result'
import { GAME_SCREENS } from './constants/game'

function App() {
  const [currentScreen, setCurrentScreen] = useState(GAME_SCREENS.home),
    [hasWon, setHasWon] = useState(false);

  function handleStartGame() {
    setCurrentScreen(GAME_SCREENS.game)
  }

  function handleFinishGame(gameWasWon) {
    setHasWon(gameWasWon)
    setCurrentScreen(GAME_SCREENS.result)
  }

  function handlePlayAgain() {
    setHasWon(false)
    setCurrentScreen(GAME_SCREENS.game)
  }

  switch (currentScreen) {
    case GAME_SCREENS.game:
      return (
        <Game onFinishGame={handleFinishGame} />
      )

    case GAME_SCREENS.result:
      return (
        <Result hasWon={hasWon} onPlayAgain={handlePlayAgain} />
      )

    case GAME_SCREENS.home:
    default:
      return (
        <Home onStartGame={handleStartGame} />
      )
  }
}

export default App