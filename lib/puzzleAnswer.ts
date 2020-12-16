
export interface iPuzzleAnswer {
    answer: string | number | Array<any>,
    logs: Array<string>
    log: (string)=>void,
    variables: Array<iPuzzleVariable>,
    trackVariable: (iPuzzleVariable)=>void
}

export interface iPuzzleVariable {
    name: string,
    value: any
}

export const puzzleAnswer = ():iPuzzleAnswer => {
    const logs = []
    const comments = []
    const variables = []

    const log = (message) => {
        console.log(message)
        logs.push(message)
    }

    const comment = (comment) => {
        comments.push(comment)
    }

    const trackVariable = (variable:iPuzzleVariable) => {
        variables.push({...variable})
    }

    return {
        answer: null,
        log,
        logs,
        trackVariable,
        variables
    }
}

