import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CircleCheck, MessageCircle, PawPrint } from 'lucide-react';
import { CONTACT_ROUTE } from '../config/contact';
import { Tag, Heading, Photo, PuppyCard } from '../components/Shared';
import { CTA } from '../components/CTA';

function Detail({items}){
  const {slug}=useParams(),navigate=useNavigate();
  const [activePhoto,setActivePhoto]=useState(0);
  useEffect(()=>setActivePhoto(0),[slug]);
  const puppy=items.find(p=>p.slug===slug);
  if(!puppy)return <div className="not-found wrap"><PawPrint size={50}/><h1>Oops, this puppy wandered off!</h1><Link className="btn btn-dark" to="/puppies">See all puppies</Link></div>;
  const related=items.filter(p=>p.status==='AVAILABLE'&&p.slug!==puppy.slug).slice(0,3);
  return <><section className="section detail-page wrap"><button className="back-link" onClick={()=>navigate(-1)}><ArrowLeft size={18}/> Back to puppies</button><div className="detail-layout">
    <div className="detail-art"><div className="detail-photo"><Photo src={(puppy.gallery||[puppy.image])[activePhoto]||puppy.image} alt={puppy.name+' puppy'}/></div><span className="detail-doodle">♡</span><span className="detail-footnote">100% cuteness guaranteed!</span>{(puppy.gallery||[]).length>1&&<div className="detail-thumbs">{puppy.gallery.map((src,i)=><button key={src} type="button" className={activePhoto===i?'selected':''} onClick={()=>setActivePhoto(i)} aria-label={'Show puppy photo '+(i+1)}><Photo src={src} alt={'Photo '+(i+1)}/></button>)}</div>}</div>
    <div className="detail-content"><Tag>Hello, I'm...</Tag><h1>{puppy.name}<span> ✳</span></h1><p className="detail-sub">{puppy.breed} · {puppy.gender} {puppy.age&&'· '+puppy.age}</p><span className={'availability '+(puppy.status==='AVAILABLE'?'green':'rose')}>{puppy.status==='AVAILABLE'?'Ready for a forever home':'Already found my forever home'}</span><p className="detail-intro">Little paws, sparkling eyes, and a huge amount of love to give. Come say hello and find out if we're the perfect match!</p>
    <div className="detail-facts"><div><span>Breed</span><b>{puppy.breed}</b></div><div><span>Gender</span><b>{puppy.gender||'Ask us'}</b></div><div><span>Age</span><b>{puppy.age||'Ask us'}</b></div><div><span>Location</span><b>Dubai, U.A.E.</b></div></div>
    <div className="button-row">{puppy.status==='AVAILABLE'?<Link className="btn btn-dark" to={'/contact?puppy='+puppy.slug}>Ask about me <ArrowUpRight size={18}/></Link>:<Link className="btn btn-dark" to="/puppies">Meet available puppies <ArrowRight size={18}/></Link>}<Link className="btn btn-outline" to={CONTACT_ROUTE}><MessageCircle size={18}/> Ask a question</Link></div>
    <p className="detail-care"><CircleCheck size={18}/> Every puppy is health checked and cared for with love.</p></div></div></section>
    <section className="section related wrap"><Heading tag="More tiny best friends" title={<>You might also <em>love...</em></>} /><div className="puppy-grid">{related.map((p,i)=><PuppyCard p={p} index={i} key={p.slug}/>)}</div></section><CTA/></>;
}

export { Detail };
