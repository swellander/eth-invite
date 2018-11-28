export default (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_EDIT_MODE':
            return action.editMode
        default:
            return state
    }
}