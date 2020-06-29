import React, {Fragment, useContext} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
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
            {/* fade in, fade out animations */}
            <TransitionGroup>

                {filtered !== null // just checks if filtered input is empty to return correct contacts
                    ? 
                        // Show filtered contacts in ContactItem component
                        filtered.map(contact => (
                            // the key={contact.id} moves to CSSTransition, it was before in ContactItem
                            <CSSTransition key={contact.id} timeout={500} classNames='item'>
                                <ContactItem contact={contact}/>
                            </CSSTransition>
                        ))
                    : 
                        // Show contacts in ContactItem component
                        contacts.map(contact => (
                            <CSSTransition key={contact.id} timeout={500} classNames='item'>
                                <ContactItem contact={contact}/>
                            </CSSTransition>
                        ))
                }
            </TransitionGroup>
        </Fragment>
    )
}
