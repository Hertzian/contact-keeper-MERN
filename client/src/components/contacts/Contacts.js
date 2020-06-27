import React, {Fragment, useContext} from 'react';
import {ContactItem} from '../../components/contacts/ContactItem';
import ContactContext from '../../context/contact/contactContext';

export const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const {contacts, filtered} = contactContext;

    if(contacts.length === 0){
        return <h4>Please add a contact</h4>
    }

    return (
        <Fragment>
            {filtered !== null // just checks if filtered input is empty to return correct contacts
                ? 
                    // Show filtered contacts in ContactItem component
                    filtered.map(contact => (<ContactItem key={contact.id} contact={contact}/>))
                : 
                    // Show contacts in ContactItem component
                    contacts.map(contact => (<ContactItem key={contact.id} contact={contact}/>))
            }
        </Fragment>
    )
}


