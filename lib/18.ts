import next from 'next';
import { isResSent } from 'next/dist/next-server/lib/utils';
import {puzzleAnswer} from './puzzleAnswer'


// sample.txt =
//puzzle_input.txt =

const solveParenthesis = (inputString) => {
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
        newString = newString.replace(`(${parenthesisString})`, solveParenthesis(parenthesisString))
        f1 = newString.indexOf('(')
    }

    return solve(newString)
}

const solve = (inputString) => {
    const answer = inputString.split('').reduce((a, current,index) => {
        if(index==0){
            if(current==='*') return 1
            if(current==='+') return 0
            return Number(Number(inputString.match(/\d*/).join('')))
        }

        const remainingString = inputString.substring(index + 1, inputString.length)
        const nextNumber = Number(remainingString.match(/\d*/).join(''))
        console.log(`Remaining string: ${remainingString} next Number: ${nextNumber}`)
        if(current === '*') a *= nextNumber
        if(current === '+') a += nextNumber
        return a
    },0)
    console.log(`${inputString}=${answer}`)
    return answer
}


export const solvePuzzle1 = ({input}) => {
    const puzzle = puzzleAnswer();
    const expressions = input.split('\n')

    const regex = new RegExp('\(.*\)', 'g')
    let answer:number = 0
    expressions.map(exp => {
        puzzle.log(`Solving: ${exp}`)
        let chars = exp.replaceAll(' ', '')
        answer += solveParenthesis(chars)
    })
    puzzle.answer = answer
    return puzzle
}

export const solvePuzzle2 = ({input}) => {
    const puzzle = puzzleAnswer()
    return puzzle
}