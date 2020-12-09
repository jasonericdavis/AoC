const fs = require('fs')
try {
    const numbers = fs.readFileSync('puzzle_input.txt', 'utf-8').split('\n')
    const preamble = 25
    const invalidNumbers = []

    for(var index=preamble; index < numbers.length; index++){
        const setOfNumbers = [...numbers.slice(index - preamble, index)]

        let valid = false
        console.log(setOfNumbers)
        setOfNumbers.map( value => {
            const lookupNumber = Math.abs(Number(numbers[index]) - Number(value)) + ''
            const numberFound = setOfNumbers.includes(lookupNumber) && value != lookupNumber
            //console.log(`${numbers[index]} - ${value} = ${lookupNumber} | ${numberFound}`)
            valid = valid || numberFound
        })
        if(!valid) invalidNumbers.push(numbers[index])
    }

    console.log(invalidNumbers)

} catch(err) {
    console.log(err)
}