import {puzzleAnswer} from './puzzleAnswer'


// sample.txt = 71
//puzzle_input.txt - 26941

const createTicketParts = (input, puzzle) => {
    const notes = input.split('\n\n')
    
    /*
        First cycle thru the rules and push all of the ranges into an array
        that can be used to validate if a value in nearby field can be checked for
    */
    const validFields = []
    notes[0].split('\n').map(rule => {
        puzzle.log(`Rule: ${rule}`)
        const fieldRange = []
        const ruleParts = rule.split(':')
        ruleParts[1].split(' or ').map(range => {
            const  [min, max] = range.split('-')
            
            //puzzle.log(`Range: ${min} - ${max}`)
            for(var index=Number(min); index<=Number(max); index++){
                fieldRange.push(index)
            }
        })
        validFields.push({name: ruleParts[0], fieldRange})
    })

    // sorting the fields in unnecessary it just makes it easier to read
    validFields.sort((a,b) => a - b)
    // puzzle.log(validFields.join(','))

    const yourTicket = notes[1].split(':')[1].trim().split(',').map(Number)
    // puzzle.log(`your ticket: ${yourTicket}`)

    const nearbyTickets = notes[2].split(':')[1].trim().split('\n')
    //puzzle.log(`nearby tickest: ${nearbyTickets.join('\n')}`)
    return {validFields,  yourTicket, nearbyTickets}
}


export const solvePuzzle1 = ({input}) => {
    const puzzle = puzzleAnswer();
    const{validFields, yourTicket, nearbyTickets} = createTicketParts(input, puzzle)
    

    let scanningErrorRate = 0
    let validFieldsCombined = validFields.reduce((a, currentRange) => {
        a = a.concat(currentRange.fieldRange)
        return a
    }, [])
    nearbyTickets.map(ticket => {
        // split the ticket into the individual fields
        const individualFields = ticket.split(',')

        for(var index=0; index<individualFields.length; index++){

            const field = individualFields[index]
            // the validFields are made up of an array of different ranges
            if(!validFieldsCombined.includes(Number(field))) {
                puzzle.log(`${field} not found`)
                scanningErrorRate += Number(field)
                break
            }
        }
    })
    puzzle.answer = scanningErrorRate
    puzzle.trackVariable(validFields)
    puzzle.trackVariable(nearbyTickets)
    puzzle.trackVariable(nearbyTickets)
    return puzzle
}

export const solvePuzzle2 = ({input}) => {
    const puzzle = puzzleAnswer()
    const{validFields, yourTicket, nearbyTickets} = createTicketParts(input, puzzle)

    
    let validFieldsCombined = validFields.reduce((a, currentRange) => {
        a = a.concat(currentRange.fieldRange)
        return a
    }, [])

    const fieldsByColumn = {}
    const validTickets = nearbyTickets.filter(ticket => {
        // split the ticket into the individual fields
        const fields = ticket.trim().split(',')

        for(var index=0; index<fields.length; index++){

            const field = fields[index]
            // the validFields are made up of an array of different ranges
            if(!validFieldsCombined.includes(Number(field))) {
                return false
            }
        }
        return true
    })

    
    validTickets.map(ticket => {
        const fields = ticket.trim().split(',')
        fields.map((field, index) => {
            if(!fieldsByColumn[index]) fieldsByColumn[index] = [yourTicket[index]]
            fieldsByColumn[index].push(Number(field))
        })
    })

    validFields.map(fields => {
        // for(var index=0; index<validFields.length;index++){       
        //     const numberNotFound = fieldsByColumn[index].filter(current => {
        //         return !fields.fieldRange.includes(current)
        //     })
 
        //     if(numberNotFound.length === 0){
        //         fields.index = index
        //         return
        //     }
        // }
        const temp = Object.keys(fieldsByColumn).map((key,index) => {
            if (!(fieldsByColumn[key].filter(val => fields.fieldRange.includes(val)).length == 0)){
                fields.index = index
                return
            }
        } )
        console.log(temp)
    })

    // let multiplier = validFields.reduce((a, currentValue, index) => {
    //     if(currentValue.name.startsWith('departure')) {
    //         puzzle.log(`${currentValue.name}[${yourTicket[index]}]`)
    //         a *= yourTicket[index]
    //     }
    //     return a
    // },1)


    // puzzle.answer = multiplier
    return puzzle
}