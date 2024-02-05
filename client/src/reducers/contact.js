const initialState = {
    phonebooks: [],
    page: 1,
    pages: 1,
    limit: 30,
    total: 31
}

const contact = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_PHONEBOOKS_SUCCESS':
            return { ...state, ...action.data, }

        case 'LOAD_PAGE_SUCCESS':
            return { ...state, phonebooks: [...state.phonebooks, ...action.data.phonebooks], page: action.data.page }

        case 'ADD_PHONEBOOKS_SUCCESS':
            return state
        case 'DELETE_PHONEBOOKS_SUCCESS':
            return { phonebooks: state.phonebooks.filter(data => data.id !== action.data.id) }

        case 'UPDATE_PHONEBOOKS_SUCCESS':
            return {
                phonebooks: state.phonebooks.map((item) => {
                    if (item.id === action.data.id) {
                        item.name = action.data.name;
                        item.phone = action.data.phone;
                    }
                    return item
                })
            }

        case 'UPDATE_AVATAR_SUCCESS':
            return {
                phonebooks: state.phonebooks.map((item) => {
                    if (item.id === action.data.id) {
                        item.avatar = action.data.avatar;
                    }
                    return item
                })
            }


        case 'LOAD_PHONEBOOKS_FAILED':
        case 'LOAD_PAGE_FAILED':
        case 'ADD_PHONEBOOKS_FAILED':
        case 'DELETE_PHONEBOOKS_FAILED':
        case 'UPDATE_PHONEBOOKS_FAILED':
        case 'UPDATE_AVATAR_FAILED':
        default:
            return state
    }
}

export default contact