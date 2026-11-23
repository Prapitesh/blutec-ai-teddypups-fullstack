import { useState } from 'react';
import faqData from '../data/faqs.json';

function FaqAccordion({max=0,query=''}) {
  const [active,setActive]=useState(0);
  const questions=faqData.filter(f=>(f.question+' '+f.answer).toLowerCase().includes(query.toLowerCase()));
  return <div className="faq-list">{questions.slice(0,max||undefined).map((f,i)=><div className={'faq-row '+(active===i?'expanded':'')} key={f.question}>
    <button className="faq-question" aria-expanded={active===i} onClick={()=>setActive(active===i?-1:i)}><span>{String(i+1).padStart(2,'0')}</span><b>{f.question}</b><span className="faq-plus">{active===i?'−':'+'}</span></button>
    {active===i&&<div className="faq-answer"><p>{f.answer}</p></div>}
  </div>)}{questions.length===0&&<div className="empty-state">No matching questions. Try another search!</div>}</div>;
}

export { FaqAccordion };
