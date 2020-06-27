import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

export const ContactFilter = () => {
    // useContext hook
    const contactContext = useContext(ContactContext);

    const {filterContacts, clearFilter, filtered} = contactContext;

    // use ref hook
    const text = useRef('');

    // if text is null, be remplace for '', onChanger requirements
    useEffect(() => {
        if(filtered === null){
            text.current.value = '';
        }
    });

    // onChange need text.current.value === '' || some text
    const onChange = e => {
        // compares if input is empty
        if(text.current.value !== ''){
            // then run filterContacs method
            filterContacts(e.target.value);
        }else{
            clearFilter();
        }
    }

    return (
        <form>
            <input ref={text} type="text" placeholder='Filter contacts...' onChange={onChange} />
        </form>
    )
}
