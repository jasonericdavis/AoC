import {puzzleAnswer} from './puzzleAnswer'


// sample.txt = 306
//puzzle_input.txt = 33561
//18, 50, 9, 4, 25, 37, 39, 40, 29, 6, 41, 28, 3, 11, 31, 8, 1, 38, 33, 30, 42, 15, 26, 36, 43
const createDecks = (input) => {
    const data = input.split('\n\n')
    const players = []

    data.map(data=> {
        const player = { name: null, cards: []}
        data.split('\n').map((card, index) => {
            if(index === 0){
                player.name = card
                return
            }
            player.cards.push(Number(card))
        })
        players.push(player)
    })
    return players
}

const simulateGame = (player1, player2, game, allowSubGame) => {
    const simPlayer1 = {cards: [...player1.cards]}
    const simPlayer2 = {cards: [...player2.cards]}
    const player1Hands = []
    const player2Hands = []
    console.log(`=== Game ${game} ===`)
    let round = 1
    while(simPlayer1.cards.length > 0 && simPlayer2.cards.length > 0){
        

        console.log(`-- Round ${round} Game ${game} --`)
        console.log(`Player 1's deck: ${simPlayer1.cards.join(',')}`)
        console.log(`Player 2's deck: ${simPlayer2.cards.join(',')}`)
        
        const player1Card = simPlayer1.cards.shift()
        const player2Card = simPlayer2.cards.shift()

        if(handAlreadyPlayed(simPlayer1.cards, player1Hands) || handAlreadyPlayed(simPlayer2.cards, player2Hands)) {
            return [{cards: [...simPlayer1.cards]}, {cards: []}, false]
        }

        console.log(`Player 1 plays: ${player1Card}`)
        console.log(`Player 2 plays: ${player2Card}`)

        if(allowSubGame && player1Card <= player1.cards.length && player2Card <= player2.cards.length) {
            // Recursive Battle
            //let recursivePlayer1 = {cards:player1.cards}
            //let recursivePlayer2 = {cards:player2.cards}
            game++
            const [recursivePlayer1, recursivePlayer2, winner] 
                = simulateGame(
                    {cards: simPlayer1.cards.slice(0, player1Card)}
                    , {cards: simPlayer2.cards.slice(0, player2Card)}
                    , game, true)

            if(winner) return [recursivePlayer1, recursivePlayer2, winner] 
            if(recursivePlayer1.cards.length > 0) {
                simPlayer1.cards.push(player1Card)
                simPlayer1.cards.push(player2Card)
            } else {
                simPlayer2.cards.push(player2Card)
                simPlayer2.cards.push(player1Card)
            }
            continue
        }

        if(player1Card > player2Card){
            simPlayer1.cards.push(player1Card)
            simPlayer1.cards.push(player2Card)
            console.log(`Player 1 Wins round ${round} of game ${game}!`)
        } else {
            simPlayer2.cards.push(player2Card)
            simPlayer2.cards.push(player1Card)
            console.log(`Player 2 Wins round ${round} of game ${game}!`)
        }

        player1Hands.push([...simPlayer1.cards])
        player2Hands.push([...simPlayer2.cards])
        //attempts++
        round++ 
    }
    return [simPlayer1, simPlayer2, false]
}

const handAlreadyPlayed = (cards, hands) => {
    if(cards.length === 0 ) return false
    let validHands = []
    hands.map(hand => validHands.push(hand))
    for(var cardIndex = 0; cardIndex<cards.length; cardIndex++){
        validHands = validHands.filter(hand => hand[cardIndex] === cards[cardIndex] && cards.length === hand.length)
        if(validHands.length === 0){
            return false
        }
    }
    return true
}

export const solvePuzzle1 = ({input}) => {
    const puzzle = puzzleAnswer();
    
    const [player1, player2] = createDecks(input)
    const [player1Results, player2Results] = simulateGame(player1, player2, 1, false)

    // instead of checking who has the cards we know that one of the players
    // has the cards in the correct order and the other has none
    const cards = [...player1Results.cards, ...player2Results.cards]

    const answer = cards.reduce((accumulator, card, index) => {
        accumulator += card * (cards.length - index)
        return accumulator
    }, 0)

    console.log([player1Results, player1Results])
    console.log(cards)
    console.log(answer)
    return puzzle
}

export const solvePuzzle2 = ({input}) => {
    const puzzle = puzzleAnswer()
    const [player1, player2] = createDecks(input)

    let games = 1
    let round = 1

    const [player1Results, player2Results] = simulateGame(player1, player2, 1, true)
    const cards = [...player1Results.cards, ...player2Results.cards]

    const answer = cards.reduce((accumulator, card, index) => {
        accumulator += card * (cards.length - index)
        return accumulator
    }, 0)

    console.log([player1, player2])
    console.log(cards)
    console.log(answer)
    return puzzle
}