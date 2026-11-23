import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { available } from '../data/catalogue';
import { CONTACT_NOTICE } from '../config/contact';
import { Photo } from '../components/Shared';
import { ContactForm } from '../components/ContactForm';

function Contact(){
  const {search}=useLocation();const puppy=new URLSearchParams(search).get('puppy')||'';
  return <section className="reference-contact-page"><div className="wrap">
    <div className="reference-contact-top"><h1>Get in touch<br/>with us</h1><p>Have questions about puppy adoption? Try this demonstration enquiry form. Your message is stored in this project's database; it is not sent to the original business.</p></div>
    <div className="reference-contact-main"><div className="reference-contact-sidebar">
      <a className="reference-contact-whatsapp" href="#letter-form">Write us an enquiry</a>
      <div className="reference-contact-method"><b>contact</b><span>Use the secure demo enquiry form</span></div>
      <div className="reference-contact-method"><b>demo notice</b><span>{CONTACT_NOTICE}</span></div>
      <div className="reference-contact-visit"><div className="reference-visit-awning"></div><div><h2>Visit us in<br/>Downtown Dubai</h2><p>Step into our Downtown Dubai showroom and meet your new best friend. Please reach out before visiting.</p><Photo src={available[0].image} alt="A TeddyPups puppy"/><Link to="/puppies">See available puppies <ArrowRight size={17}/></Link></div></div>
    </div><ContactForm key={puppy} puppySlug={puppy}/></div>
  </div></section>;
}

export { Contact };
