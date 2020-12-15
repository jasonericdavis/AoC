import {puzzleAnswer} from './puzzleAnswer'

export const solvePuzzle1 = ({input, turns}) => {
    const puzzle = puzzleAnswer();
    const numbers = input.split(',')
    const spokenNumbers = {}

    /*
     after the initial set of numbers the last number that 
     was spoken will be 0
    */
    let lastNumberSpoken = 0
    

    // add the inital numbers to the set of unspoken numbers
    numbers.map((number, index) => {
        spokenNumbers[number] = [index + 1]
    })

    for(var turn=numbers.length + 2; turn<=turns; turn++){ 
        // this is for debuggin purposes only
        if(turn%100000 === 0){
            console.log(`On turn: ${turn}`)
        }
        if(!spokenNumbers[lastNumberSpoken]) {
            spokenNumbers[lastNumberSpoken] = [0, turn - 1]
            lastNumberSpoken = 0
            continue
        } 

        spokenNumbers[lastNumberSpoken].push(turn - 1)
        const lastTwoSpokenTurns = spokenNumbers[lastNumberSpoken].slice(spokenNumbers[lastNumberSpoken].length - 2)
        lastNumberSpoken = lastTwoSpokenTurns[1] - lastTwoSpokenTurns[0]
    }

    puzzle.answer = lastNumberSpoken
    return puzzle
}

export const solvePuzzle2 = (input) => {
    const puzzle = puzzleAnswer()
    puzzle.answer = "I wasnt smart enought to answer this puzzle"
    return puzzle
}