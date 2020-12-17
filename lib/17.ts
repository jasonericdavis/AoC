import { Console } from 'console'
import {puzzleAnswer} from './puzzleAnswer'


// sample.txt =
//puzzle_input.txt =
const expandCube = (plane) => {

}

const getValueAtPoint = (x,y,z,axis) => {
    try{
        //console.log(`Point: ${z}, ${y}, ${x} => `)
        const zAxis = axis[z]
        const yAxis = zAxis[y]
        const value = (axis[z][y][x])? axis[z][y][x]: '.'
        console.log(`Point: ${z}, ${y}, ${x} => ${value}`)
        return value
    } catch {
        console.log(`Point: ${z}, ${y}, ${x} => .`)
        return '.'
    }
}

const getNeighbors = (z,x,y, zAxis) => {
    console.log(`${x} ${y}, ${z}`)
    const neighbors = []

    let counter = 1
    for(var zIndex=-1; zIndex<2;zIndex+=1){
        for(var yIndex=-1;yIndex<2;yIndex+=1){
            for(var xIndex=-1;xIndex<2; xIndex+=1) {
                neighbors.push(getValueAtPoint(x+xIndex, y+yIndex, z+zIndex, zAxis))
                //const xValue = 
                //console.log(`Point ${counter}: ${getValueAtPoint(x+xIndex, y+yIndex, z+zIndex, zAxis)}`)
                counter++
            }
        }
    }
    return neighbors
}

export const solvePuzzle1 = ({input}) => {
    const puzzle = puzzleAnswer();
    const twoDPlane = []
    const threeDPlane = []
    
    input.split('\n').map((xAxis, index) => {
        //const values = xAxis.split('')
        twoDPlane.push(xAxis.split(''))
    })

    threeDPlane.push([...twoDPlane])

    const new3DPlane = [...threeDPlane]

    threeDPlane.map((zAxis, z) => {
        zAxis.map((yAxis, y) => {
            yAxis.map((xAxis, x) => {
                const value = getValueAtPoint(z,y,x, threeDPlane)
                const neighbors =  getNeighbors(z,x,y, threeDPlane)

                if(value === '#') {
                    const activeNeighbors = neighbors.filter(neighbor => neighbor === '#') 
                    if(activeNeighbors.length != 2 && activeNeighbors.length != 3) {
                        new3DPlane[z][y][x] = '.'
                    }
                }

                if(value === '.') {
                    const activeNeighbors = neighbors.filter(neighbor => neighbor === '#') 
                    if(activeNeighbors.length != 3) {
                        new3DPlane[z][y][x] = '#'
                    }
                }
               
             })
        })
    })

    new3DPlane.map(twodPlane => {
        twodPlane.map(plane => puzzle.log(plane))
    })
        

    // zAxis[-1] = twoDPlane.reduce((a,xyAxis) =>{
    //     const newAxis = [...xyAxis]
    //     a.push([...newAxis.fill('.')])
    //     return a
    // }, [])

    // zAxis[0] = twoDPlane.reduce((a,xAxis) =>{
    //     a.push([... xAxis])
    //     return a
    // }, [])

    // zAxis[1] = twoDPlane.reduce((a,xyAxis) =>{
    //     const newAxis = [...xyAxis]
    //     a.push([... newAxis.fill('.')])
    //     return a
    // }, [])
    return puzzle
}

export const solvePuzzle2 = ({input}) => {
    const puzzle = puzzleAnswer()

    return puzzle
}