import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import { Tag } from '../components/Shared';
import { FaqAccordion } from '../components/FaqAccordion';
import { CTA } from '../components/CTA';

function FAQ(){
  const [q,setQ]=useState('');
  return <><section className="page-hero yellow-hero"><div className="wrap"><Tag>Everything you're wondering</Tag><h1>Questions & answers <span className="title-paw">?</span></h1><p>Good questions make great puppy parents. We're here to help every step of the way.</p></div></section><section className="section wrap faq-page"><label className="search-wrap faq-search"><Search size={20}/><input type="search" placeholder="Search your question..." value={q} onChange={e=>setQ(e.target.value)}/></label><FaqAccordion query={q}/><div className="faq-bottom">Still have questions? <Link to="/contact">Write us a little letter <ArrowUpRight size={17}/></Link></div></section><CTA/></>;
}

export { FAQ };
