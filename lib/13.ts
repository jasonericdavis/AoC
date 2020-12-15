import {puzzleAnswer} from './puzzleAnswer'

const outOfService = 'x'

export const solvePuzzle1 = ({input}) => {
    const puzzle = puzzleAnswer()
    const data = input.split('\n')
    const earliestTimeStamp = data[0]
    const buses = data[1].split(',')

    puzzle.log(`Arrival Time: ${earliestTimeStamp}`)
    puzzle.log(`Buses: ${buses.join(',')}`)

    let departId = earliestTimeStamp
    let availableBuses = buses.filter(bus => departId%bus === 0)

    while(availableBuses.length < 1){
        departId++
        availableBuses = buses.filter(bus => departId%bus === 0)
    }
    const bus = availableBuses[0]
    puzzle.log(`Bus ${bus} leaves at ${departId}`)
    puzzle.answer = `${(departId - earliestTimeStamp) * Number(bus)}`
    return puzzle
}

export const solvePuzzle2 = ({input}) => {
    const puzzle = puzzleAnswer()
    const buses = input.split('\n')[1].split(',')

    // find the max value because that is the value that we will
    // increment when searching for the timestamp
    // use a for loop because I need to know the index
    //let max = 0
    //let maxIndex = 0
    // let busIndexes = []
    // for(var index=0; index<buses.length;index++){
    //     if(buses[index] === outOfService) continue
    //     // if(max === 0 || Number(buses[index]) < max) {
    //     //     max = Number(buses[index])
    //     //     maxIndex = index
    //     // }
    //     busIndexes.push(index)
    // }
    puzzle.log(buses)

    
    let notFound = true
    let timestamp = 0
    const justBuses = buses.filter(x => x!= 'x').sort((a,b) => a-b)
    const multiplier = justBuses[justBuses.length - 1]

    const maxIndex  = buses.reduce((a,x, index) => {
        if(x === multiplier) a = index
        return a
    })
    
    let x = Math.floor(101909620999158/multiplier)
    while(notFound) {
        if(x%1000000 === 0) {
            console.log(`Crossing another 1000000 | ${x} | ${timestamp}`)
        }

        timestamp = (multiplier * x - maxIndex)  // buses[0] * x
        
        let results = []
        // busIndexes.map(index => {
        //     if(index === maxIndex) {
        //         results.push(true)
        //         return
        //     }
        //     results.push((timestamp - maxIndex)%Number(buses[index]) === index)
        // })

        for(var index = 0; index<buses.length; index++){
            if(buses[index] === 'x') continue

            const delay = (timestamp + index)%Number(buses[index])
            if(delay === 0){
                results.push(index)
            }
        }

        if(results.length === buses.filter(bus => bus != 'x').length){
            // puzzle.log(results.reduce((a, c, index) => {
            //     if(c) a.push(buses[busIndexes[index]])
            //     return a
            // }, []))
            puzzle.log(`I guess the answer is ${timestamp}`)
            notFound = false
        }
        x++
    }
    puzzle.log(`x: ${x}`)
    puzzle.answer = timestamp

}