
import {useState, useEffect} from 'react'
import Message from '../components/message'

const getInput = async () =>  {
    return fetch('/data/10/puzzle_input.txt').then(response => response.text())
}

const solvePuzzle1 = (plugs, console) => {
    try{

        // These could just be accumulators but for the sake of seeing
        // how the loop interates I made them arrays
        const oneJoltAdapters = []
        const threeJoltAdapters = []
        
        console.log(plugs)
        for(var index=1; index<plugs.length; index++) {
            //console.log(`${plugs[index-1]} => ${plugs[index]}`)
            threeJoltAdapters.push(Math.floor((plugs[index] - plugs[index-1])/3))
            oneJoltAdapters.push((plugs[index] - plugs[index-1])%3)
        }

        // the final adapter is a 3 jolt adapter so add this to that array
        threeJoltAdapters.push(1)
        // console.log(oneJoltAdapters)
        // console.log(oneJoltAdapters.filter(val => val > 0).length)

        // console.log(threeJoltAdapters)
        // console.log(threeJoltAdapters.filter(val => val > 0).length)
        console.log(`The answer is ${ 
            oneJoltAdapters.reduce((acc, current) => acc + current)
            *
            threeJoltAdapters.reduce((acc, current) => acc + current)

        }`)
        
    } catch(err) {
        console.log(err)
    }
}


const solvePuzzle2 = (plugs, console) => {
    try {
        const paths = [1]
        //paths.push(1)
        let x = 0

        const getNumberOfRoutes = (index, offset) => {
            let routes = 0
            if(plugs[index - offset] >= plugs[index] - 3) {
                return paths[index - offset]
            } else {
                return 0
            }
            return routes
        }
        
        for(var index=1; index < plugs.length; index++ ) {
            const t = getNumberOfRoutes(index, 1) 
                + getNumberOfRoutes(index, 2) 
                + getNumberOfRoutes(index, 3) 
            paths.push(t)
        }

        let answer = 0
        paths.map((c, index) => {
            answer = answer + c
        })
        console.log(`${paths[paths.length - 1]}`)
        console.log(paths)
    } catch(err) {
        console.log(err)
    }
}

// https://www.reddit.com/r/adventofcode/comments/ka8z8x/2020_day_10_solutions/
const solve = (input, console) => {
	//input.unshift('0'); //add the starting value to the array
	input.push(`${Number(input[input.length-1]) + 3}`); //add the ending value to the array
	let countArr = [1];
	let iterate = (index, joltDif) => (input[index - joltDif] >= (input[index] - 3) ) ? Number(countArr[index - joltDif]) : 0;
	for(let i=1;i<input.length;i++){
		let count = iterate(i, 1) + iterate(i, 2) + iterate(i, 3);
		countArr.push(count);
	}
    const answer =  countArr[countArr.length-1];
    console.log(countArr)
    console.log(`the answer is ${answer}`)
}

const Puzzle1 = ({input, console}) => {
    return (
        <div>The answer is: {solvePuzzle2(input, console)}</div>
    )
}

const Puzzle2 = ({input, console}) => {
    return (
        <div>The answer is: {solve(input, console)}</div>
    )
}


const Page = () => {
    const [input, setInput] = useState(null)
    const [logs, setLogs] = useState([])
    
    useEffect(() => {
        getInput().then(data => {
            const adapters = data.split('\n')
            const plugs = [0, ...adapters].map(Number).sort((a,b) => a-b)
            setInput(plugs)
        })
    }, [])

    const myConsole = {
        log: (m) => console.log(`LOG: ${m}`)
    }

    if(!input) return <div>Loading</div>
    return (
        <div>
            <Puzzle1 input={input} console={myConsole} />
            <Puzzle2 input={input} console={myConsole} />
        </div>
    )
}

export default Page
