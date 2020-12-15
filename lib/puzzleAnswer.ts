

export const puzzleAnswer = () => {
    const logs = []

    const log = (message) => {
        console.log(message)
        logs.push(message)
    }
    return {
        answer: null,
        log: (message) => log(message),
        logs
    }
}

