import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import familyData from '../data/families.json';
import { CONTACT_ROUTE } from '../config/contact';
import { Tag, Heading, Photo, PuppyCard } from '../components/Shared';
import { FaqAccordion } from '../components/FaqAccordion';
import { CTA } from '../components/CTA';

function Home({items}){
  const live=items.filter(p=>p.status==='AVAILABLE');
  return <>
    <section className="reference-hero">
      <div className="reference-hero-copy wrap">
        <p className="reference-hero-note">every puppy is family</p>
        <h1>Premium teacup<br/>puppies in Dubai</h1>
        <p className="reference-hero-description">Meet your new best friend in our Dubai showroom, or order a rare<br className="desktop-break"/> miniature breed from trusted breeders worldwide.</p>
        <div className="reference-hero-actions">
          <Link to="/puppies" className="reference-hero-primary">View available puppies</Link>
          <Link to={CONTACT_ROUTE} className="reference-hero-secondary">Send an enquiry</Link>
        </div>
      </div>
      <div className="reference-puppy-lineup">
        {live.slice(0,6).map((p,i)=><Link key={p.slug} to={'/puppies/'+p.slug} className={'reference-lineup-pup reference-lineup-'+i} aria-label={'Meet '+p.name}><Photo src={p.image} alt={p.name}/></Link>)}
        <img className="reference-mascot" src="/assets/puppy-mascot.svg" alt="Teddy the TeddyPups puppy"/>
        <span className="reference-lineup-tag">Pomeranian</span>
      </div>
      <div className="reference-quilt"><div className="reference-quilt-hem"></div></div>
    </section>
    <section className="section section-puppies wrap"><Heading tag="Meet the pups" title={<>Tiny paws, <em>huge personalities.</em></>} description="Say hello to our sweet little faces. Each one is ready to steal your heart." center/>
      <div className="puppy-grid">{live.slice(0,6).map((p,i)=><PuppyCard p={p} index={i} key={p.slug}/>)}</div><div className="section-action"><Link className="btn btn-dark" to="/puppies">See all available puppies <ArrowUpRight size={19}/></Link></div>
    </section>
    <section className="section two-ways"><div className="wrap"><Heading tag="Made just for you" title={<>Two ways to <em>meet your puppy.</em></>} center/><div className="ways-grid">
      <article className="way-card peach"><div className="way-art"><span>🏡</span><span>🐶</span></div><span className="small-number">01 / Meet me here</span><h3>Puppies in Dubai</h3><p>Come meet your little one in person, cuddle, connect, and bring your new best friend home.</p><Link to="/contact">Visit our showroom <ArrowUpRight size={18}/></Link></article>
      <article className="way-card mint"><div className="way-art"><span>✈️</span><span>🐾</span></div><span className="small-number">02 / Made for you</span><h3>Imported for you</h3><p>Have a dream puppy in mind? We can help find the perfect little companion and arrange safe travel.</p><Link to="/how-it-works">How importing works <ArrowUpRight size={18}/></Link></article>
    </div></div></section>
    <section className="section journey wrap"><Heading tag="Simple as one, two, three" title={<>Your <em>puppy journey.</em></>} center/><div className="journey-grid">{[['01','Choose your breed','Find your perfect puppy from the adorable faces we have available.','🐾'],['02','Get photos & details','We share photos, health checks and all the little things you want to know.','💌'],['03','Secure & safe delivery','Your new family member arrives safely, ready for a lifetime of love.','🏡']].map(([num,title,body,emoji])=><div className="journey-item" key={num}><span className="journey-icon">{emoji}</span><span className="journey-number">{num}</span><h3>{title}</h3><p>{body}</p></div>)}</div><div className="section-action"><Link to="/how-it-works" className="link-underline">Discover how it works <ArrowRight size={19}/></Link></div></section>
    <section className="section trust"><div className="wrap trust-grid"><div><Tag>Good hearts, happy paws</Tag><h2>Why families <em>trust TeddyPups.</em></h2><p>Every puppy is more than a pet. They're a little family member, and we treat them that way from day one.</p><div className="trust-items"><span><ShieldCheck/> Health checked & cared for</span><span><Heart/> Raised with love</span><span><Sparkles/> Support from first hello to forever</span></div><Link to="/contact" className="btn btn-dark">Let's talk puppies <ArrowUpRight size={18}/></Link></div><div className="trust-photo"><Photo src={familyData[0]} alt="A happy family and puppy"/><div className="trust-note">Happy tails<br/>start here! ♡</div></div></div></section>
    <section className="section families-section wrap"><Heading tag="Forever looks adorable" title={<>Happy families <em>& puppies.</em></>} center/><div className="home-family-grid">{familyData.slice(0,6).map((src,i)=><div key={i} className="family-image"><Photo src={src} alt="Happy TeddyPups family"/></div>)}</div><div className="section-action"><Link className="btn btn-outline" to="/happy-families">More happy stories <ArrowUpRight size={19}/></Link></div></section>
    <section className="section short-faq"><div className="wrap"><Heading tag="Good to know" title={<>Questions, <em>answered.</em></>} center/><FaqAccordion max={4}/><div className="section-action"><Link to="/faq" className="link-underline">See all FAQs <ArrowRight size={18}/></Link></div></div></section>
    <CTA/>
  </>;
}

export { Home };
