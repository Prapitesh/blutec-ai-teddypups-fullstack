import { useState } from 'react';
import { Send, PawPrint } from 'lucide-react';
import { available } from '../data/catalogue';
import { submitEnquiry } from '../services/api';
import { isValidPhoneNumber } from '../utils/validation';

function ContactForm({puppySlug=''}) {
  const [form,setForm]=useState({name:'',phone:'',email:'',area:'',puppySlug,message:'',website:''});
  const [result,setResult]=useState({state:'idle',text:''});
  const update=(e)=>{
    const {name,value}=e.currentTarget;
    if(name==='phone') e.currentTarget.setCustomValidity(
      value && !isValidPhoneNumber(value) ? 'Use 7â€“32 digits, spaces or + ( ) -.' : ''
    );
    setForm(v=>({...v,[name]:value}));
  };
  const submit=async(e)=>{
    e.preventDefault();
    if(!isValidPhoneNumber(form.phone)){
      setResult({state:'error',text:'Please enter a valid phone number.'});
      return;
    }
    setResult({state:'loading',text:''});
    try {
      await submitEnquiry(form);
      setResult({state:'success',text:'Your enquiry was saved in this demo. No message was sent to the reference business.'});
      setForm({name:'',phone:'',email:'',area:'',puppySlug:'',message:'',website:''});
    } catch(error){setResult({state:'error',text:'Could not submit your letter. Please try again. '+(error?.message||'')})}
  };
  return <form id="letter-form" className="letter-form" onSubmit={submit}>
    <div className="letter-stamp"><PawPrint size={31}/></div>
    <p className="letter-greeting">Dear TeddyPups,</p>
    <div className="letter-line">My name is <input name="name" value={form.name} onChange={update} required minLength={2} maxLength={80} placeholder="your name" aria-label="Your name"/> and you can reach me at <input name="phone" value={form.phone} onChange={update} required type="tel" minLength={7} maxLength={32} placeholder="+971 50 123 4567" aria-label="Phone number"/>.</div>
    <div className="letter-line">My email is <input name="email" value={form.email} onChange={update} type="email" placeholder="email (optional)" aria-label="Email address"/> and I live in <input name="area" value={form.area} onChange={update} maxLength={80} placeholder="your area" aria-label="Area"/>.</div>
    <div className="letter-line">I'm curious about <select name="puppySlug" value={form.puppySlug} onChange={update} aria-label="Puppy you're interested in"><option value="">any lovely puppy</option>{available.map(p=><option key={p.slug} value={p.slug}>{p.name}</option>)}</select>.</div>
    <label className="letter-label" htmlFor="letter-message">A little note from me...</label>
    <textarea id="letter-message" name="message" maxLength={3000} rows={4} value={form.message} onChange={update} placeholder="Tell us what you're looking for. We can't wait to hear from you!"/>
    <input aria-hidden="true" tabIndex={-1} className="honeypot" name="website" value={form.website} onChange={update} autoComplete="off"/>
    <p className="letter-signoff">With love, <span>{form.name||'a future puppy parent'} ♡</span></p>
    <button className="btn btn-dark letter-button" disabled={result.state==='loading'} type="submit"><Send size={18}/>{result.state==='loading'?'Sending your letter...':'Send my little letter'}</button>
    {result.text&&<p className={'form-result '+result.state} role="status">{result.text}</p>}
    <p className="form-disclaimer">Demo only. Enquiries are saved in this app's database and are not delivered to TeddyPups or other businesses. Do not submit sensitive personal information.</p>
  </form>;
}

export { ContactForm };
