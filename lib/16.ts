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

    // First remove the invalid tickets
    const validTickets = []
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
            if(!validFieldsCombined.includes(Number(field))) return
        }

        validTickets.push(ticket.trim().split(',').map(Number))
    })

    // Next combine each column of the remaining valid tickets
    const combinedFields = {}
    validTickets.map(ticket => {
        ticket.map((field, index) => {
            if(!combinedFields[index]) combinedFields[index] = [yourTicket[index]]
            combinedFields[index].push(field)
        })
    })

    // Next go thru each valid field and determine if all of the
    // values in the combined fields exist in the valid field
    // if one of the values does not exist then that valid field 
    // doesnt map to the set of fields
    Object.keys(combinedFields).map(key => {
        const values = combinedFields[key]

        for(var validFieldsIndex=0;validFieldsIndex<validFields.length;validFieldsIndex++){
            //if(validFields[validFieldsIndex].index != null) continue

            const currentFieldsToLookup = validFields[validFieldsIndex].fieldRange
            const valueNotIncludedInValidFields = values.filter(val => {
                const found = !currentFieldsToLookup.includes(val)
                console.log(`Is ${val} Not in ${currentFieldsToLookup}: ${found}`)
                return found
            })

            console.log(`Found ${valueNotIncludedInValidFields.length} that were not valid for ${key}`)
            
            if(valueNotIncludedInValidFields.length === 0){
                console.log(`Setting Index to ${validFieldsIndex} for ${currentFieldsToLookup}`)
                if(!validFields[validFieldsIndex].validIndexes) validFields[validFieldsIndex].validIndexes = []
                validFields[validFieldsIndex].validIndexes.push(Number(key))
            }
        }
    })

    
    
    return puzzle
}