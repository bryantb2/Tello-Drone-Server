import {IDroneState} from "../services";

export const parseState = (state: string): any => {
    // parse out string into js object
    const stateProps =
        state.split(';')
            .map(prop => prop.split(':'))
    const newState = {}
    for (const [key, value] of stateProps) {
        if (!key.includes('\\r') && !key.includes('\\n'))
            newState[key] = value
    }
    return newState
}
