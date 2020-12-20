import {puzzleAnswer} from './puzzleAnswer'


// sample.txt =
//puzzle_input.txt =

const createRuleTree = (pointer, parentRule, rules, messages) => {
    console.log(`Pointer: ${pointer}`)

    const value = rules[pointer]
    //messages.map(message => message = message.replace(pointer.trim(), value.trim()))
    
    const valueParts = value.match(/\d*[^\s]/g)
    console.log(`ValueParts: ${valueParts}`)

    if(value === 'a' || value === 'b') {
        messages = [...messages.map(message => message = message.replace(pointer.trim(), value.trim()))]
        parentRule = parentRule.replace(pointer, value)
        return parentRule
    }

    const delimeter = value.indexOf('|')
    if(delimeter > -1) { // || valueParts.length > 1){
        const subRules = value.split('|')
        subRules.map(subRule => {
            messages.push(parentRule.replace(pointer, subRule.trim()))
            
            const subParts = subRule.match(/\d*[^\s\|]/g)
            console.log(`Subparts: ${subParts}`)
            subParts.map(innerRule => {
                parentRule = createRuleTree(innerRule.trim(), parentRule, rules, messages)
            })
        })
        return parentRule
    }

    

    //if(value) {
        //messages.push(parentRule.replace(rule, value))
        valueParts.map( innerPointer => {
            messages.map(message => message = message.replace(pointer.trim(), value.trim()))
            parentRule = parentRule.replace(pointer.trim(), value.trim())
            parentRule = createRuleTree(value, parentRule, rules, messages)
            console.log(`lookup ${value}`)
        })
        return parentRule
    //}
}

export const solvePuzzle1 = ({input}) => {
    const puzzle = puzzleAnswer();
    const data = input.split('\n\n')

    // using an object because the rules are necessary in order
    const rules = {}
    data[0].split('\n').map(rule => {
        const ruleParts = rule.split(':')
        const ruleNumber = ruleParts[0]
        const ruleValues = ruleParts[1].replaceAll('"', '').trim()
        rules[ruleNumber] = ruleValues
    })

    // Find the root rules that contain the a or b
    const rootRules = Object.keys(rules).filter(rule => rules[rule].includes('a') || rules[rule].includes('b'))
    let validMessages = {...rules}
    
    // rootRules.map(rootKey => {
    //     Object.keys(validMessages).map(rule => {
    //         validMessages[rule] = validMessages[rule].replace(rootKey, rules[rootKey])
    //     })
    // })

    // const tt = []
    // let ff = validMessages[0]
    // tt.push(ff)

    const tt = []

    tt.push(validMessages[0])
    let answer = validMessages[0]
    validMessages[0].split(' ').map(pointer => {
        answer = createRuleTree(pointer, answer, validMessages, tt)
    })
    //const answer = createRuleTree(validMessages[0], validMessages[0], validMessages, tt)
    const messages = data[1].split('\n')
    //console.log(`message: ${answer}`)
    console.log(tt)

    puzzle.log(JSON.stringify(rules))
    return puzzle
}

export const solvePuzzle2 = ({input}) => {
    const puzzle = puzzleAnswer()
    return puzzle
}