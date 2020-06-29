import React from 'react';
import {Contacts} from '../contacts/Contacts';
import {ContactForm} from '../contacts/ContactForm';
import {ContactFilter} from '../contacts/ContactFilter';
// import contactContext from '../../context/contact/contactContext';

export const Home = () => {
    return (
        <div className='grid-2'>
            <div>
                {/* Contact form */}
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}
