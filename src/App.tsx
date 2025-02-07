import React from 'react'
import TicTacToe, { Player, Score } from './components/organisms/TicTacToe'
import HistoryScore from './components/organisms/HistoryScore'
import Drawer from './components/molecules/Drawer'

export type History = {
  winner: Exclude<Player, null> | "Draw"
  timestamp: number
  score: Score
}

function App() {
  const [history, setHistory] = React.useState<History[]>([]);

  React.useEffect(() => {
    const history = localStorage.getItem("history");

    if (history) setHistory(JSON.parse(history))

    document.title = "Tic Tac Toe";
  }, []);

  React.useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  return (
    <>
      <div className="justify-center max-w-7xl m-auto p-8 text-center">
        <div><h2 className='mb-5 text-3xl'><b>TIC TAC TOE</b></h2></div>
        <TicTacToe setHistory={setHistory} />
        <Drawer button="History" buttonClassName='absolute top-10 right-10'
          footer={
            <>
              {!!history.length && <button
                onClick={() => setHistory([])}
                className="my-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 text-white"
              >
                Reset history
              </button>}
            </>
          }
        >
          <HistoryScore history={history} className='flex-1' />
        </Drawer>
      </div>
    </>
  )
}

export default App
