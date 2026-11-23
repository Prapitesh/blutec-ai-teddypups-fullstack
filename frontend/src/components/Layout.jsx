import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Instagram, Mail, MapPin, Menu, MessageCircle, PawPrint, Phone, X } from 'lucide-react';
import { CONTACT_ROUTE } from '../config/contact';

function ScrollReset(){
  const {pathname}=useLocation();
  useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});document.title='TeddyPups U.A.E. · '+(pathname==='/'?'Premium teacup puppies in Dubai':pathname.split('/').filter(Boolean).at(-1)?.replaceAll('-',' ')||'Home')},[pathname]);
  return null;
}

function Header(){
  const [open,setOpen]=useState(false);
  const {pathname}=useLocation();
  useEffect(()=>setOpen(false),[pathname]);
  const items=[['/','Home'],['/puppies','Puppies'],['/happy-families','Happy families'],['/how-it-works','How it works'],['/faq','FAQ'],['/contact','Visit & contact']];
  return <header className="site-header">
    <div className="header-inner">
      <Link to="/" className="logo-link" aria-label="TeddyPups home"><img src="/brand/logo.png" alt="TeddyPups" /><span>TeddyPups</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{items.map(([url,text])=><NavLink key={url} end={url==='/'} to={url} className={({isActive})=>isActive?'active':''}>{text}</NavLink>)}</nav>
      <Link className="header-whatsapp" to={CONTACT_ROUTE}><MessageCircle size={17}/> Send an enquiry</Link>
      <button className="hamburger" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </div>
    {open&&<nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{items.map(([url,text])=><Link key={url} to={url}>{text}<ArrowUpRight size={18}/></Link>)}<Link to={CONTACT_ROUTE}>Send an enquiry <MessageCircle size={18}/></Link></nav>}
  </header>;
}

function Footer(){
  return <footer className="footer">
    <div className="footer-blob">Made with love & a little puppy magic <PawPrint size={26}/></div>
    <div className="footer-grid wrap">
      <div><Link to="/" className="footer-brand"><img src="/brand/logo.png" alt=""/><span>TeddyPups</span></Link><p>Little paws. Big love. Helping lovely puppies find their forever families in Dubai and beyond.</p><div className="socials"><Link to="/happy-families" aria-label="See happy family photos"><Instagram/></Link><Link to={CONTACT_ROUTE} aria-label="Send an enquiry"><MessageCircle/></Link></div></div>
      <div><h3>Explore</h3><Link to="/puppies">Available puppies</Link><Link to="/gone-home">Gone home</Link><Link to="/happy-families">Happy families</Link><Link to="/how-it-works">Delivery & collection</Link><Link to="/faq">Questions & answers</Link></div>
      <div><h3>Say hello</h3><p><MapPin size={17}/> Downtown Dubai, U.A.E.</p><p><Phone size={17}/> Reach us through the demo enquiry form</p><Link to="/contact"><Mail size={17}/> Send us a little letter</Link><Link to={CONTACT_ROUTE}><MessageCircle size={17}/> Send an enquiry</Link></div>
    </div>
    <div className="footer-bottom wrap"><span>© {new Date().getFullYear()} TeddyPups U.A.E. · Made with care</span><span>Every love story starts with a paw print ♡</span></div>
  </footer>;
}

export { ScrollReset, Header, Footer };
