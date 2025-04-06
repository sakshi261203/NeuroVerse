import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for reaching out!');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-container">
            <h2 className="contact-h">Contact Us</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
                <input className="contact-inp" type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                <input className="contact-inp" type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                <textarea className="contact-text" name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
                <button className="contact-btn" type="submit">Send Message</button>
            </form>
        </div>
    );
};
export default Contact;
