import {puzzleAnswer} from './puzzleAnswer'

export const solvePuzzle1 = (input) => {
    const puzzle = puzzleAnswer()
    const mem = {}
    let mask = ''
    input.split('\n').map(line => {
        if(line.startsWith('mask')){
            mask = line.split('=')[1].trim()
            puzzle.log(`mask: ${mask} | ${mask.length}`)
        }

        if(line.startsWith('mem')){
            const parts = line.split('=')
            const memIndex = parts[0].replace('mem[', '').replace(']', '').trim()
            const decimal = Number(parts[1])
            const binary = (decimal >>> 0).toString(2)
            const binaryFull = binary.padStart(mask.length, '0')
            puzzle.log(`mem[${memIndex}] = ${decimal} => ${binaryFull} | ${binaryFull.length}`)
            let decoded = ''.padStart(mask.length, '0').split('')

            for(var index=0; index<decoded.length; index++){
                decoded[index] = mask.charAt(index) === 'X'
                    ? binaryFull.charAt(index) : mask.charAt(index)
            }

            mem[memIndex] = parseInt(decoded.join(''), 2)

            puzzle.log(`Decoded: ${decoded.join('')}`)

        }
    })
    
    let answer = Object.keys(mem).reduce((a, val) => {
        a = a + mem[val]
        return a
    }, 0)

    puzzle.log(`Answer is ${answer}`)

}

export const solvePuzzle2 = (input) => {

}