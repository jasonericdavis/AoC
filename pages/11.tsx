import {useState, useEffect} from 'react'

const occupiedSeat = '#'
const emptySeat = 'L'
const floor = '.'
const filename = 'puzzle_input.txt'

const getAdjacentSeats = (seat, seatingChart) => {
    const up = -1
    const down = 1
    const left = -1
    const right = 1
    
    return seatingChart.filter(adjacentSeat => {
        return (
               (seat.row ===  adjacentSeat.row + up && seat.seat === adjacentSeat.seat + left) // up left
            || (seat.row ===  adjacentSeat.row + up && seat.seat === adjacentSeat.seat)     // up
            || (seat.row ===  adjacentSeat.row + up && seat.seat === adjacentSeat.seat + right) // up right
            || (seat.row ===  adjacentSeat.row && seat.seat === adjacentSeat.seat + left)     // left
            || (seat.row ===  adjacentSeat.row && seat.seat === adjacentSeat.seat + right)     // right
            || (seat.row ===  adjacentSeat.row + down && seat.seat === adjacentSeat.seat + left) // down left
            || (seat.row ===  adjacentSeat.row + down && seat.seat === adjacentSeat.seat)     // down
            || (seat.row ===  adjacentSeat.row + down && seat.seat === adjacentSeat.seat + right) // down right
        )
    })
}

const getFirstSeatInDirection = (seat, seatingChart, {vertical, horizontal}) => {
    let direction = {vertical: seat.row + vertical, horizontal: seat.seat + horizontal} 
    let lookupChairs = seatingChart.filter(seat => (seat.row == direction.vertical) && (seat.seat == direction.horizontal))
     while(lookupChairs.length > 0){
         if(lookupChairs[0].currentValue != floor) {
             return lookupChairs[0]
         }
         direction.vertical += vertical
         direction.horizontal += horizontal
         lookupChairs = seatingChart.filter(seat => (seat.row == direction.vertical) && (seat.seat == direction.horizontal))
     }
     return null
}

const createSeatingChart = (data) => {
    const rows = data.split('\n')
    let seats = []
    const seatingChart = []
    rows.map((row, rowIndex) => {
        seats = row.split('')
        seats.map((seat, seatIndex) => {
            seatingChart.push({
                index: (rowIndex * 10) + seatIndex,
                row: rowIndex + 1,
                seat: seatIndex + 1,
                currentValue: seat,
                previousValue: null,
                selected: false,
                occupiedAdjacentSeats: 0
            })

        })
    })
    return {chart: seatingChart, size: {rows: rows.length, seats: seats.length}}
}

const solvePuzzle1 =(seatingChart) => {
    const temp =  seatingChart.reduce((a, current) => {
        a.push({...current})
        return a
    }, [])

    temp.map(seat => {
        if(seat.currentValue === floor) return
        const adjacentSeats = getAdjacentSeats(seat, seatingChart)
        if(seat.currentValue === emptySeat && adjacentSeats.filter(filter => filter.currentValue === occupiedSeat).length === 0) {
            seat.previousValue = emptySeat
            seat.currentValue = occupiedSeat
            return
        }

        if(seat.currentValue == occupiedSeat && (adjacentSeats.filter(seat => seat.currentValue === occupiedSeat).length >= 4 )) {
            seat.previousValue = occupiedSeat
            seat.currentValue = emptySeat
        }

    })
    return temp
}

const solvePuzzle2 =(seatingChart) => {
    const temp =  seatingChart.reduce((a, current) => {
        a.push({...current})
        return a
    }, [])

    temp.map(seat => {
        if(seat.currentValue === floor) return
        const adjacentSeats = [
            getFirstSeatInDirection(seat, seatingChart, {vertical: -1, horizontal: -1}),
            getFirstSeatInDirection(seat, seatingChart, {vertical: -1, horizontal:  0}),
            getFirstSeatInDirection(seat, seatingChart, {vertical: -1, horizontal:  1}),
            getFirstSeatInDirection(seat, seatingChart, {vertical:  0, horizontal: -1}),
            getFirstSeatInDirection(seat, seatingChart, {vertical:  0, horizontal:  1}),
            getFirstSeatInDirection(seat, seatingChart, {vertical:  1, horizontal: -1}),
            getFirstSeatInDirection(seat, seatingChart, {vertical:  1, horizontal:  0}),
            getFirstSeatInDirection(seat, seatingChart, {vertical:  1, horizontal:  1})            
        ]
            getAdjacentSeats(seat, seatingChart)
        if(seat.currentValue === emptySeat && adjacentSeats.filter(filter => filter && filter.currentValue === occupiedSeat).length === 0) {
            seat.previousValue = emptySeat
            seat.currentValue = occupiedSeat
            return
        }

        if(seat.currentValue == occupiedSeat && (adjacentSeats.filter(seat => seat && seat.currentValue === occupiedSeat).length >= 5 )) {
            seat.previousValue = occupiedSeat
            seat.currentValue = emptySeat
        }
    })
    return temp
}

const getInput = async () =>  {
    return fetch(`/data/11/${filename}`).then(response => response.text())
}

const Seat = ({seat, seatClickHandler}) => {
    return <div onClick={() => seatClickHandler(seat)}>{seat.currentValue}</div>
}

const SeatingChart = ({seatingChart, chartSize, seatClickHandler}) => {
    return (
        <div style={{display: 'grid', grid: `repeat(${chartSize.rows}, 25px) / repeat(${chartSize.seats}, 25px)`}}>
            {seatingChart.map((seat, index) => <Seat key={index} seat={seat} seatClickHandler={seatClickHandler} />)}
        </div>
    )
}

const CurrentSeat = ({seat}) => {
    return (
        <div>
            <p>Row: {seat.row}</p>
            <p>Seat: {seat.seat}</p>
        </div>
    )
}

const Page = () => {
    const [seatingChart, setSeatingChart] = useState(null)
    const [currentSeat, setCurrentSeat] = useState(null)
    const [chartSize, setChartSize] = useState({rows:0, seats:0})
    const [simulating, setSimulating] = useState(false)
    const [puzzle, setPuzzle] = useState(1)
    
    useEffect(() => {
        getInput().then(data => {
            const {chart, size} = createSeatingChart(data)
            setSeatingChart(chart)
            setChartSize(size)
        })
    }, [])

    useEffect(() => {
        const simulate = async (seatingChart) => {
            let newSeatingChart = seatingChart.reduce((a, current) => {
                a.push({...current})
                return a
            },[])
            
            let newCount = seatingChart.filter((seat) => seat.currentValue === occupiedSeat).length
            let currentCount = -1
    
            while(simulating && newCount != currentCount) {
                console.log(`Current Seat Count: ${currentCount} | New Count: ${newCount}`)
                
                //newSeatingChart.splice(0, newSeatingChart.length)
                if(puzzle === 1){
                    newSeatingChart = solvePuzzle1(newSeatingChart).reduce((a, current) => {
                        a.push({...current})
                        return a
                    }, [])

                }
                
                if(puzzle === 2){
                    newSeatingChart = solvePuzzle2(newSeatingChart).reduce((a, current) => {
                        a.push({...current})
                        return a
                    }, [])
                }
                
                currentCount = newCount
                newCount = newSeatingChart.filter((seat) => seat.currentValue === occupiedSeat).length
            }
            return newSeatingChart
        }

        if(seatingChart && simulating){
            const nsc = simulate(seatingChart).then(data => {
                setSeatingChart(data)
            })
        }

        console.log(`Simulating: ${simulating}`)
    }, [simulating])

    const onClickSeat = (seat) => {
        console.log(`Clicked Seat ${JSON.stringify(seat)}`)
        setCurrentSeat(seat)
    }

    const onClickRun = () => {
        const newSeatingChart = solvePuzzle2(seatingChart)
        setSeatingChart(newSeatingChart)
    }

    const onClickReset = () => {
        getInput().then(data => {
            const chart = createSeatingChart(data)
            setSeatingChart(chart)
        })
    }

    const onClickSimulate = async () => {
        setSimulating(true)
        setPuzzle(1)
    }

    const onClickSimulate2 = async () => {
        setSimulating(true)
        setPuzzle(2)
    }

    const onClickStopSimulate = () => {
        setSimulating(false)
        
    }

    if(!seatingChart) return <div>Loading</div>
    return (
        <div>
            <SeatingChart seatingChart={seatingChart} seatClickHandler={onClickSeat} chartSize={chartSize} />
            <div>
                <div>Occupied Seats: {seatingChart.filter(seat => seat.currentValue == occupiedSeat).length}</div>
                <button onClick={onClickRun}>Run</button>
                <button onClick={onClickReset}>Reset</button>
                <button onClick={onClickSimulate}>Simulate</button>
                <button onClick={onClickSimulate2}>Simulate Puzzle 2</button>
                <button onClick={onClickStopSimulate}>Stop Simulate</button>
            </div>
            {(currentSeat)?<CurrentSeat seat={currentSeat} />:null}    
        </div>
    )
}

export default Page
//puzzle 1 => 2243