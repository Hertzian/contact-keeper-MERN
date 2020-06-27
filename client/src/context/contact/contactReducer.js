import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                // this add data into state, state are inmutable (...state.contacts)
                // action.payload brings the data from the form
                contacts: [...state.contacts, action.payload]
            }
            break;
    
        default:
            return state;
    }
}