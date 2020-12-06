const fs = require('fs')

try {
    const data = fs.readFileSync('puzzle_input.txt', 'utf-8')
    const groups1 = data.split('\n\n').reduce((acc, currentValue) => {
        acc.push(currentValue.replaceAll('\n', ''))
        return acc
    }, [])

    console.log('-- Puzzle 1')
    let sum = 0
    groups1.map(group => {
        
        // for each group lets break down the string into an array of characters
        // reduce the array to only the unique characters
        const chars = group.split('').reduce((acc, currentChar) => {
            if(!acc.includes(currentChar)) acc.push(currentChar)
            return acc
        }, [])
        //console.log(`${group} => ${chars}`)

        // the number of unique characters is the number of unique yes answers
        sum = sum + chars.length
    })
    console.log(`The sum is ${sum}`) // 6662

    console.log('-- Puzzle 2')
    let sum2 = 0

    // We need to break down the groups differently because we want to know 
    // the answer for each individual person instead of collectively like before
    const groups2 = data.split('\n\n').reduce((acc, currentValue) => {
        acc.push(currentValue.split('\n'))
        return acc
    }, [])

    groups2.map(group => {
        // If the group submitted their answers on 1 line 
        // that implies that everyone answered the same way therefore
        // the length of string is the amount of yes votes
        if(group.length == 1){
            sum2 = sum2 + group[0].length
            return
        }

        // for each group lets maintain an dictionary of the characters
        // that were found and how many times they were found
        let uniqueChars = {}

        group.map(answers => {
            // Split the answer into characters to cycle thru each character
            answers.split('').map(answer => {
                // if the character exist in the dictionary then increment its values
                // otherwise add it and set it to 1 to indicuate someone answered yes 
                // to that particular question
                uniqueChars[answer] = uniqueChars[answer]? uniqueChars[answer] + 1: 1 
            })
        })

        // filter the object keys in which the total amount of yes answers equals the size of the group
        const everyoneAnsweredYes = Object.values(uniqueChars).filter(val => val == group.length)

        // the size of  everyoneAnsweredYes is the amount of yes for this group
        sum2 = sum2 + everyoneAnsweredYes.length
    })
    console.log(`The sum is ${sum2}`) //3382
}catch(err) {
    console.log(err)
}