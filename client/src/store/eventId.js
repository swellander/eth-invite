
export default (state = '', action) => {
    switch (action.type) {
        case 'LOAD_EVENT':
            return action.id
        default:
            return state
    }
}