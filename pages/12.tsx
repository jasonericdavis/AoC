import getInput from '../lib/getInput'
import {useEffect, useState} from 'react'

const filename = 'puzzle_input.txt'

// north = 0
// east = 1
// south = 2
// west = 3

const northIndex = 0
const eastIndex = 1
const sourthIndex = 2
const westIndex = 3

const changeDirection = (coordinates, degrees) => {
    const turns = degrees/90
    for(var x=0; x < turns; x++){
        const temp = {...coordinates[0]}
        coordinates = coordinates.slice(1)
        coordinates.push(temp)
        
    }
    return coordinates
}

const moveDirection = (coordinates, direction, units) => {
    const coord = coordinates.filter(c => c.direction == direction)[0].units += units
    return coordinates
}

const solvePuzzle1 = (coordinates, instructions) => {
    let newCoordinates = coordinates.reduce((a, current) => {
        a.push({...current})
        return a
    }, [])

    instructions.map(command => {
        if(command[0] === 'F') {
            newCoordinates[eastIndex].units += Number(command.replace('F', ''))
            // return
        }

        if(command[0] === 'N') {
            newCoordinates = moveDirection(newCoordinates, 'north', Number(command.replace('N', '')))
            // return
        }

        if(command[0] === 'S') {
            newCoordinates = moveDirection(newCoordinates, 'south', Number(command.replace('S', '')))
            // return
        }

        if(command[0] === 'E') {
            newCoordinates = moveDirection(newCoordinates, 'east', Number(command.replace('E', '')))
            // return
        }

        if(command[0] === 'W') {
            newCoordinates = moveDirection(newCoordinates, 'west', Number(command.replace('W', '')))
            // return
        }

        if(command[0] === 'L') {
            newCoordinates = changeDirection(newCoordinates, 360 -  Number(command.replace('L', '')))
            // return
        }

        if(command[0] === 'R') {
            newCoordinates = changeDirection(newCoordinates, Number(command.replace('R', '')))
            // return
        }
        console.log(newCoordinates.slice(0))
    })
    console.log(newCoordinates)
    // console.log(`
    //     ${Math.abs(newCoordinates.south - newCoordinates.north)}
    //     +
    //     ${Math.abs(newCoordinates.east - newCoordinates.)}
    
    // `)
    return newCoordinates
}

const Page = () => {
    const [instructions, setInstructions] = useState(null)
    const [coordinates, setCoordinates] = useState([
        {direction: 'north', units: 0}, {direction: 'east', units: 0},
        {direction: 'south', units: 0}, {direction: 'west', units: 0}
    ])

    useEffect(() => {
        getInput('12', filename).then(data => {
            setInstructions(data.split('\n'))
        })
    }, [])

    const onClickRun = () => {
        solvePuzzle1(coordinates, instructions)
    }

    if(!instructions) return <div>Loading</div>
    return (
        <div>
            <button onClick={onClickRun}>Run</button>
            <ul>
                {instructions.map((command, index) => <li key={index}>{command}</li>)}
            </ul>
        </div>
    )
}

export default Page

//998