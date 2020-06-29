import React, {useReducer} from 'react';
import {v4} from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
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

export const ContactState = props => {
    const initialState = {
        contacts:[
            {
                id: 1,
                name: 'Jill Johnson',
                email: 'jill@gmail.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Sara Watson',
                email: 'sara@gmail.com',
                phone: '222-111-1111',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Harry White',
                email: 'harry@gmail.com',
                phone: '333-111-1111',
                type: 'professional'
            },
        ],
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add contact
    const addContact = contact => {
        contact.id = v4();

        dispatch({type: ADD_CONTACT, payload: contact});
    }
    
    // Delete contact
    const deleteContact = id => {
        dispatch({type: DELETE_CONTACT, payload: id});
    }
    
    // Set current contact
    const setCurrent = contact => {
        // This set current = payload, the data in contact selected
        dispatch({type: SET_CURRENT, payload: contact});
    }
    
    // Clear current contact
    const clearCurrent = () => {
        // This just set back initialState.current = null
        dispatch({type: CLEAR_CURRENT});
    }

    // Update contact
    const updateContact = contact => {
        // This set current = payload, the data in contact selected
        dispatch({type: UPDATE_CONTACT, payload: contact});
    }
    
    // Filter contacts
    const filterContacts = text => {
        // This set current = payload, the data in contact selected
        dispatch({type: FILTER_CONTACTS, payload: text});
    }
    
    // Clear filter
    const clearFilter = () => {
        // This just set back initialState.current = null
        dispatch({type: CLEAR_FILTER});
    }

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}>
            {props.children}
        </ContactContext.Provider>
    );
}

// export default ContactState;