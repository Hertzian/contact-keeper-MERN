import {
    ADD_CONTACT,
    GET_CONTACTS,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CONTACT_ERROR,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }
        case ADD_CONTACT:
            return {
                ...state,
                // this add data into state, state are inmutable (...state.contacts)
                // action.payload brings the data from the form
                contacts: [...state.contacts, action.payload],
                loading: false
            }
            
        case UPDATE_CONTACT:
            return {
                ...state,
                // contacts arr: if the id === payload for the form ? updated payload : contact as is
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact),
                loading: false
            }

        case DELETE_CONTACT:
            return {
                ...state,
                // return all contacts except the one in the filter down below
                contacts: state.contacts.filter(contact => contact.id !== action.payload),
                loading: false
            }

        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filtered: null,
                error: null,
                current: null
            }

        case SET_CURRENT:
            return {
                ...state,
                // return all contacts except the one in the filter down below
                current: action.payload
            }

        case CLEAR_CURRENT:
            return {
                ...state,
                // return all contacts except the one in the filter down below
                current: null
            }

        case FILTER_CONTACTS:
            return {
                ...state,
                // filtered is part of state
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');

                    return contact.name.match(regex) || contact.email.match(regex);
                })
            }

        case CLEAR_FILTER:
            return {
                ...state,
                // return all contacts except the one in the filter down below
                filtered: null
            }
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }
    
        default:
            return state;
    }
}
