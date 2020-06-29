import React, {useState, useContext, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';

export const ContactForm = () => {
    // ContactContext is the hook
    // this needs for addContact()
    const contactContext = useContext(ContactContext);

    // the form will be filled if there any values in current
    const {addContact, updateContact, clearCurrent, current} = contactContext;

    // this hook mimics life cycle method of componentDidMount()
    useEffect(() => {
        if(current !== null){
            // to fill the form with valor of current
            setContact(current);
        }else{
            // clear the form
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
        // add dependencies as param of useEffect()
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const {name, email, phone, type} = contact;

    // to preserve the data indtroduced by user and added to state to persist
    // then copy the original state, and add the new values
    // in setContact, -> [e.target.name]: e.target.value <- its a key-value pair
    const onChange = e => {
        setContact({...contact, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();

        // to switch button actions
        if(current === null){
            // to add contact
            addContact(contact);
        }else{
            // take param the state of the form
            updateContact(contact);
        }

        // clear the form after update or added contact
        clearAll()
    }

    const clearAll = () => {
        // to clear all fields with click in button form, and brings back to default state, becase current is now null
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit contact': 'Add contact'}</h2>
            <input type="text" placeholder='Name' name='name' value={name} onChange={onChange} />
            <input type="text" placeholder='Email' name='email' value={email} onChange={onChange} />
            <input type="text" placeholder='Phone' name='phone' value={phone} onChange={onChange} />
            <h5>Contact type</h5>
            <input type="radio" name='type' value='personal' checked={type === 'personal'} onChange={onChange} /> Personal{' '}
            <input type="radio" name='type' value='profesional' checked={type === 'professional'} onChange={onChange} /> profesional
            <div>
                <input type="submit" value={current ? 'Update contact': 'Add contact'} className='btn btn-primary btn-block' />
            </div>
            {
            current && (
            <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>    
            </div>
            )}
        </form>
    )
}
