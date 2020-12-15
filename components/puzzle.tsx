import getInput from '../lib/getInput'
import {useEffect, useState} from 'react'

const filename = 'puzzle_input.txt'

const PuzzleBody = ({puzzleAnswer}) => {
  return (
    <div>
      <ul>
        {puzzleAnswer.logs.map((log, index) => <li key={index}>{log}</li>)}
      </ul>
      <p>The answer is {puzzleAnswer.answer}</p>
    </div>
  )
}

const Puzzle = ({ name, day, puzzleHandler }) => {
  const [puzzleAnswer, setPuzzleAnswer] = useState(null)
  const [input, setInput] = useState(null)

  useEffect(() => {
    getInput(day, filename).then(input => setInput(input))
  }, [])

  const onClickSolve = async () => {
    const answer = await puzzleHandler(input)
    setPuzzleAnswer(answer)
  }

  if(!input) return <div>Loading Input</div>
  return (
    <div>
      <h1>{name}</h1>
      {(!puzzleAnswer)? <div>Click to Solve the Puzzle</div> : <PuzzleBody puzzleAnswer={puzzleAnswer} />}
      <div><button onClick={onClickSolve} >Solve</button></div>
    </div>
  );
};

export default Puzzle;
