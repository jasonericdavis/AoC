import {useState, useEffect} from 'react'
import Message from '../components/message'

const getInput = async () =>  {
    return fetch('/data/9/sample.txt').then(response => response.text())
}

const solvePuzzle = (input:string, console) => {
    try{
        const numbers = input.split("\n");
        const preamble = 5;
        const invalidNumbers = [];
        for (var index = preamble; index < numbers.length; index++) {
            const setOfNumbers = [...numbers.slice(index - preamble, index)];
        
            let valid = false;
            console.log(setOfNumbers);
            setOfNumbers.map((value) => {
              const lookupNumber =
                Math.abs(Number(numbers[index]) - Number(value)) + "";
              const numberFound =
                setOfNumbers.includes(lookupNumber) && value != lookupNumber;
              valid = valid || numberFound;
            });
            if (!valid) invalidNumbers.push(numbers[index]);
          }
          //console.log(invalidNumbers);
          // setMessageCallback(invalidNumbers)
          return Number(invalidNumbers[0]);
    } catch(err) {
        console.log(err)
    }
}

const Puzzle1 = ({input, console}) => {
    return (
        <div>The answer is: {solvePuzzle(input, console)}</div>
    )
}

const Messages = ({}) => {
    const [logs, setLogs] = useState([])

    return (
        <ul>
            {logs.map((message, index) => <Message message={message} key={index} />)}
        </ul>
    )
}

const Page = () => {
    const [input, setInput] = useState(null)
    const [logs, setLogs] = useState([])
    
    useEffect(() => {
        getInput().then(data => setInput(data))
    }, [])

    const myConsole = {
        log: (m) => console.log(`This is my message: ${m}`)
    }

    if(!input) return <div>Loading</div>
    return (
        <div>
            <Puzzle1 input={input} console={myConsole} />
            <ul>
                {logs.map((message, index) => <Message message={message} key={index} />)}
            </ul>
        </div>
    )
}

export default Page
