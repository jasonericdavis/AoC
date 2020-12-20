import {puzzleAnswer} from './puzzleAnswer'


// sample.txt =
//puzzle_input.txt =

const solveParenthesis = (inputString, solve) => {
    let newString = inputString
    let f1 = newString.indexOf('(')
    
    while(f1 != -1){
        let p = 0
        let end = f1 + 1
        for(var index=f1+1;index<newString.length;index++){
            if(newString[index] === ')') p--
            if(newString[index] === '(') p++
            //console.log(`character[${index}]:${newString[index]} p:${p}`)
            end = index
            if(p < 0) break
        }
  
        const parenthesisString = newString.substring(f1 + 1, end)
        newString = newString.replace(`(${parenthesisString})`, solveParenthesis(parenthesisString, solve))
        f1 = newString.indexOf('(')
    }

    return solve(newString)
}

const solver1 = (inputString) => {
    const answer = inputString.split('').reduce((a, char,index) => {
        if(index==0){
            if(char==='*') return 1
            if(char==='+') return 0
            return Number(Number(inputString.match(/\d*/).join('')))
        }

        const remainingString = inputString.substring(index + 1, inputString.length)
        const nextNumber = Number(remainingString.match(/\d*/).join(''))
        //console.log(`Remaining string: ${remainingString} next Number: ${nextNumber}`)
        if(char === '*') a *= nextNumber
        if(char === '+') a += nextNumber
        return a
    },0)
    //console.log(`${inputString}=${answer}`)
    return answer
}

const solver2 = (inputString) => {
    // This regex will get the addition symbol and the number
    // before and after the addition symbol
    let parts = inputString.match(/[0-9]*\+[0-9]*/, 'g')
    //console.log(`input: ${inputString}`)
    
    // cycle thru the inputstring until there isn't anymore addition 
    while(parts && parts.length){
        parts && parts.map(part => {
            inputString = inputString.replace(part, solver1(part))
            //console.log(`input: ${inputString}`)
        })
        parts = inputString.match(/[0-9]*\+[0-9]*/, 'g')
    }
    return solver1(inputString)
}


export const solvePuzzle1 = ({input}) => {
    const puzzle = puzzleAnswer();
    const expressions = input.split('\n')
    let answer:number = 0
    expressions.map(exp => {
        let chars = exp.replaceAll(' ', '')
        const expressionAnswer = solveParenthesis(chars, solver1)
        puzzle.log(`${exp} =  ${expressionAnswer}`)
        answer += expressionAnswer
    })
    puzzle.answer = answer
    return puzzle
}

export const solvePuzzle2 = ({input}) => {
    const puzzle = puzzleAnswer();
    const expressions = input.split('\n')
    let answer:number = 0
    expressions.map(exp => {
        let chars = exp.replaceAll(' ', '')
        const expressionAnswer = solveParenthesis(chars, solver2)
        puzzle.log(`${exp} =  ${expressionAnswer}`)
        answer += expressionAnswer
    })
    puzzle.answer = answer
    return puzzle
}