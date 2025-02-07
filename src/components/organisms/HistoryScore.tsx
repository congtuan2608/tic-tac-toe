import { History } from "../../App"

type Props = {
  history: History[]
  className?: string
}

export default function HistoryScore({ history, className }: Props) {

  return <>
    <div className={className}>
      <h3 className="text-3xl mb-2">History</h3>
      <ul className="flex flex-col gap-3">
        {!history.length && <p className="my-4"><i>No playing history yet</i></p>}

        {history.map((item, index) => {
          return <li key={String(index)} className='flex flex-col items-start shadow-lg p-2 rounded-lg'>
            <span>
              <b>{item.winner === 'Draw' ? "It's a" : 'Winner:'}</b> {item.winner}
            </span>
            <span>
              <b>Timestamp:</b> {new Date(item.timestamp).toLocaleString()}
            </span>
            <span>
              <b>Score:</b> Player <b>X</b> - {item.score.X} | Player <b>O</b> - {item.score.O}
            </span>
          </li>
        })}
      </ul>
    </div>
  </>
}