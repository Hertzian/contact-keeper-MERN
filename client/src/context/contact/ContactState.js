import React, {useReducer} from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
        GET_CONTACTS,
        ADD_CONTACT,
        DELETE_CONTACT,
        SET_CURRENT,
        CLEAR_CURRENT,
        UPDATE_CONTACT,
        FILTER_CONTACTS,
        CLEAR_CONTACTS,
        CONTACT_ERROR,
        CLEAR_FILTER,
        SET_ALERT,
        REMOVE_ALERT
} from '../types';

export const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get contacts
    const getContacts = async () => {
        try{
            const res = await axios.get('/api/contacts');

            dispatch({
                type: GET_CONTACTS,
                payload: res.data.contacts
            });
        }catch(err){
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    }


    // Add contact
    const addContact = async contact => {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

        try{
            const res = await axios.post('/api/contacts', contact, config);

            dispatch({
                type: ADD_CONTACT,
                payload: res.data.contact
            });
        }catch(err){
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    }
    
    // Delete contact
    const deleteContact = async id => {
        try{
            const res = await axios.delete(`/api/contacts/${id}`);

            dispatch({
              type: DELETE_CONTACT,
              payload: id
            });
        }catch(err){
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    }

    // Clear contacts
    const clearContacts = () => {
        // This just set back initialState.current = null
        dispatch({type: CLEAR_CONTACTS});
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
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    );
}

// export default ContactState;
