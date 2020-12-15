import {solvePuzzle1, solvePuzzle2} from '../lib/13'
import Puzzle from '../components/puzzle'

const Page = () => {
    return (
        <div>
            <Puzzle 
            name={'Puzzle 1'}
            puzzleHandler={solvePuzzle1}
            day={13} />
            <Puzzle 
            name={'Puzzle 2'}
            puzzleHandler={solvePuzzle2}
            day={13} />
        </div>
        
    )
}

export default Page