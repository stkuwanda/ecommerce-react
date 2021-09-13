import React from "react";
import "./contacts.styles.scss";

const ContactsPage = ({ email }) => (
  <div className='contacts'>
    <h1>Ecommerce: Get In Touch With Us</h1>
    <div className='contact-details'>
      <span>Email:</span>
      <span>stkuwanda@gmail.com</span>
    </div>
    <div className='contact-details'>
      <span>Call:</span>
      <span>+263779550103</span>
    </div>
    <div className='contact-details'>
      <span>Twitter:</span>
      <span>@stkuwanda</span>
    </div>
    <div className='contact-details'>
      <span>WhatsApp:</span>
      <span>+263779550103</span>
    </div>
  </div>
);

export default ContactsPage;
