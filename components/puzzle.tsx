import getInput from '../lib/getInput'
import {useEffect, useState} from 'react'

const filename = 'puzzle_input.txt'

const PuzzleBody = ({puzzleAnswer}) => {
  return (
    <div>
      <p>The answer is {puzzleAnswer.answer}</p>
      <ul>
        {puzzleAnswer.logs.map((log, index) => <li key={index}>{log}</li>)}
      </ul>
    </div>
  )
}

const PuzzleInputSource = ({input, inputSource, inputSourceHandler}) => {
  return (
    <>
      <div>
        <input 
          type="radio" value="sample.txt" name="inputSource" 
          checked={(inputSource == 'sample.txt')} onChange={() => inputSourceHandler("sample.txt")}/> Sample
        <input type="radio" value="puzzle_input.txt" name="inputSource" 
          checked={(inputSource == 'puzzle_input.txt')} onChange={() => inputSourceHandler("puzzle_input.txt")}/> Puzzle Input
        <input type="radio" value="" name="inputSource" 
        checked={(inputSource == 'inputSource')} onChange={() => inputSourceHandler("inputSource")}/> Your Puzzle Input
      </div>
    </>
  )
}

const Puzzle = ({ name, day, puzzleHandler, ...rest }) => {
  const [puzzleAnswer, setPuzzleAnswer] = useState(null)
  const [input, setInput] = useState(null)
  const [inputSource, setInputSource] = useState('sample.txt')

  useEffect(() => {
    if(inputSource !=  ''){
      console.log('Changing Input Source')
      getInput(day, inputSource).then(input => setInput(input))
    }
  }, [inputSource])

  const onChangeinputSource = (inputSource) => {
    console.log(inputSource)
    setInputSource(inputSource)
  }

  const onClickSolve = async () => {
    const answer = await puzzleHandler({input, ...rest})
    setPuzzleAnswer(answer)
  }

  if(!input) return <div>Loading Input</div>
  return (
    <div className="flex flex-row justify-evenly">
      <div className="w-1/2">
        <h1>{name}</h1>
        {(!puzzleAnswer)? <div>Click to Solve the Puzzle</div> : <PuzzleBody puzzleAnswer={puzzleAnswer} />}
        <div><button onClick={onClickSolve} >Solve</button></div>
      </div>
      <div className="w-1/2">
        <PuzzleInputSource input={input} inputSource={inputSource} inputSourceHandler={onChangeinputSource} />
        <textarea value={input} />
      </div>
    </div>
  );
};

export default Puzzle;
