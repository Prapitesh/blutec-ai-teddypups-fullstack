import React from 'react';
import { Tag, Heading } from '../components/Shared';
import { CTA } from '../components/CTA';

function Process(){
  const steps=[['01','Meet your puppy in person','Visit our Downtown Dubai showroom. Spend time with our locally available puppies and see which tiny face steals your heart.','🏡'],['02','Order upon request','Have a special breed in mind? Tell us about your dream puppy. We help you find the right match from trusted partners.','💌']];
  const deliveries=[['Take your puppy home the same day','For locally available, ready-to-go puppies, cuddle today and make memories tonight.','🏠'],['Delivery within Dubai','We can help safely bring your new furry family member straight to your doorstep.','🚗'],['Safe international cargo','Your puppy travels with care, appropriate documentation, and well-planned transport.','✈️'],['Worldwide delivery','Ask us about travel options when your puppy needs to join you beyond the UAE.','🌍']];
  return <><section className="page-hero mint-hero"><div className="wrap"><Tag>From first hello to forever</Tag><h1>How it works <span className="title-paw">✳</span></h1><p>A simple, caring journey to finding the perfect furry addition to your family.</p></div></section>
  <section className="section wrap"><Heading tag="A little love goes a long way" title={<>Two ways <em>home.</em></>} center/><div className="ways-grid">{steps.map(([num,title,description,emoji])=><article className="way-card process-way" key={num}><div className="way-art"><span>{emoji}</span></div><span className="small-number">{num}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
  <section className="section promise"><div className="wrap"><Heading tag="Our promise" title={<>Our premium <em>puppy promise.</em></>} center/><div className="promise-grid">{[['🌸','Loved from day one','Each puppy is treated with the warmth and attention they deserve.'],['🩺','Health comes first','Vaccination, vet checks and wellbeing are essential parts of our care.'],['💛','Always here for you','We guide you through your exciting new beginning together.']].map(([emoji,title,body])=><div className="promise-card" key={title}><div>{emoji}</div><h3>{title}</h3><p>{body}</p></div>)}</div></div></section>
  <section className="section wrap delivery" id="delivery"><Heading tag="Travel safe, arrive happy" title={<>Delivery <em>& collection.</em></>} center/><div className="delivery-grid">{deliveries.map(([title,body,emoji],i)=><div className="delivery-card" key={title}><span>{emoji}</span><small>0{i+1}</small><h3>{title}</h3><p>{body}</p></div>)}</div></section>
  <section className="section reasons"><div className="wrap"><Heading tag="Because tiny paws matter" title={<>Why <em>choose us?</em></>} center/><div className="reasons-row"><div>✈️ <b>International cargo</b></div><div>💌 <b>Support 24/7</b></div><div>🩺 <b>Health guarantee</b></div></div></div></section><CTA/></>;
}

export { Process };
