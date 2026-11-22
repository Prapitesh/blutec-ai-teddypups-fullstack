import React, {useEffect, useMemo, useState} from 'react';
import {Routes, Route, Link, NavLink, useLocation, useParams, useNavigate} from 'react-router-dom';
import {ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, CircleCheck, Heart, Instagram, Mail, MapPin, Menu, MessageCircle, PawPrint, Phone, Search, Send, ShieldCheck, Sparkles, Star, X} from 'lucide-react';
import puppyData from './data/puppies.json';
import familyData from './data/families.json';
import faqData from './data/faqs.json';

const API=(import.meta.env.VITE_API_URL || '').replace(/\/$/,'');
const WHATSAPP='https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I%27d%20like%20to%20discuss%20a%20project.';
const available=puppyData.filter(p=>p.status==='AVAILABLE');
const gone=puppyData.filter(p=>p.status==='GONE_HOME');

function useCatalogue(){
  const [items,setItems]=useState(puppyData);
  useEffect(()=>{
    const controller=new AbortController();
    fetch(API+'/api/puppies',{signal:controller.signal})
      .then(r=>{if(!r.ok)throw new Error('API offline');return r.json()})
      .then(data=>{if(Array.isArray(data)&&data.length)setItems(data.map(p=>({...puppyData.find(local=>local.slug===p.slug),...p})))})
      .catch(()=>{});
    return ()=>controller.abort();
  },[]);
  return items;
}

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
      <a className="header-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp us</a>
      <button className="hamburger" aria-label="Open menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </div>
    {open&&<nav className="mobile-nav">{items.map(([url,text])=><Link key={url} to={url}>{text}<ArrowUpRight size={18}/></Link>)}<a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp us <MessageCircle size={18}/></a></nav>}
  </header>;
}

function Footer(){
  return <footer className="footer">
    <div className="footer-blob">Made with love & a little puppy magic <PawPrint size={26}/></div>
    <div className="footer-grid wrap">
      <div><Link to="/" className="footer-brand"><img src="/brand/logo.png" alt=""/><span>TeddyPups</span></Link><p>Little paws. Big love. Helping lovely puppies find their forever families in Dubai and beyond.</p><div className="socials"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a><a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a></div></div>
      <div><h3>Explore</h3><Link to="/puppies">Available puppies</Link><Link to="/gone-home">Gone home</Link><Link to="/happy-families">Happy families</Link><Link to="/how-it-works">Delivery & collection</Link><Link to="/faq">Questions & answers</Link></div>
      <div><h3>Say hello</h3><p><MapPin size={17}/> Downtown Dubai, U.A.E.</p><p><Phone size={17}/> +971 50 000 0000</p><Link to="/contact"><Mail size={17}/> Send us a little letter</Link><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Chat on WhatsApp</a></div>
    </div>
    <div className="footer-bottom wrap"><span>© {new Date().getFullYear()} TeddyPups U.A.E. · Made with care</span><span>Every love story starts with a paw print ♡</span></div>
  </footer>;
}

function Tag({children}){return <span className="eyebrow"><PawPrint size={15}/>{children}</span>}
function Heading({tag,title,description,center=false}){return <div className={'section-heading '+(center?'center':'')}><Tag>{tag}</Tag><h2>{title}</h2>{description&&<p>{description}</p>}</div>}
function Photo({src,alt='',className=''}){return <img loading="lazy" src={src} alt={alt} className={className} onError={e=>{e.currentTarget.style.opacity=.3}}/>}

function PuppyCard({p,index=0,small=false}){
  return <Link to={'/puppies/'+p.slug} className={'puppy-card '+(small?'small':'')} style={{'--rotate':(index%2===0?'-2':'2')+'deg'}}>
    <div className="card-image"><div className="photo-blob"><Photo src={p.image} alt={p.alt||p.name+' puppy'}/></div><span className="card-heart"><Heart size={20}/></span><span className="card-float-status">{p.status==='AVAILABLE'?'Available':'Gone home'}</span></div>
    <div className="card-meta"><span className={'availability '+(p.status==='AVAILABLE'?'green':'rose')}>{p.status==='AVAILABLE'?'Available':'Gone home'}</span><span className="card-age">{p.age}</span></div>
    <h3>{p.name}</h3><p className="card-info">{p.breed}{p.gender?' · '+p.gender.toLowerCase():''}</p><span className="card-link">Meet me <ArrowUpRight size={17}/></span>
  </Link>;
}

function ContactForm({puppySlug=''}) {
  const [form,setForm]=useState({name:'',phone:'',email:'',area:'',puppySlug,message:'',website:''});
  const [result,setResult]=useState({state:'idle',text:''});
  const update=(e)=>setForm(v=>({...v,[e.target.name]:e.target.value}));
  const submit=async(e)=>{
    e.preventDefault();setResult({state:'loading',text:''});
    try {
      const r=await fetch(API+'/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
      if(!r.ok){let msg='Please check your details and try again.';try{const j=await r.json();msg=j.message||msg}catch{}throw new Error(msg)}
      setResult({state:'success',text:'Your letter has arrived! Thank you for getting in touch.'});
      setForm({name:'',phone:'',email:'',area:'',puppySlug:'',message:'',website:''});
    } catch(error){setResult({state:'error',text:'Could not submit your letter. Please check that the Spring Boot API is running, or contact us on WhatsApp.'})}
  };
  return <form className="letter-form" onSubmit={submit}>
    <div className="letter-stamp"><PawPrint size={31}/></div>
    <p className="letter-greeting">Dear TeddyPups,</p>
    <div className="letter-line">My name is <input name="name" value={form.name} onChange={update} required minLength={2} maxLength={80} placeholder="your name" aria-label="Your name"/> and you can reach me at <input name="phone" value={form.phone} onChange={update} required type="tel" pattern="[+0-9()\\-\\s]{7,32}" placeholder="+971 50 123 4567" aria-label="Phone number"/>.</div>
    <div className="letter-line">My email is <input name="email" value={form.email} onChange={update} type="email" placeholder="email (optional)" aria-label="Email address"/> and I live in <input name="area" value={form.area} onChange={update} maxLength={80} placeholder="your area" aria-label="Area"/>.</div>
    <div className="letter-line">I'm curious about <select name="puppySlug" value={form.puppySlug} onChange={update} aria-label="Puppy you're interested in"><option value="">any lovely puppy</option>{available.map(p=><option key={p.slug} value={p.slug}>{p.name}</option>)}</select>.</div>
    <label className="letter-label" htmlFor="letter-message">A little note from me...</label>
    <textarea id="letter-message" name="message" maxLength={3000} rows={4} value={form.message} onChange={update} placeholder="Tell us what you're looking for. We can't wait to hear from you!"/>
    <input aria-hidden="true" tabIndex={-1} className="honeypot" name="website" value={form.website} onChange={update} autoComplete="off"/>
    <p className="letter-signoff">With love, <span>{form.name||'a future puppy parent'} ♡</span></p>
    <button className="btn btn-dark letter-button" disabled={result.state==='loading'} type="submit"><Send size={18}/>{result.state==='loading'?'Sending your letter...':'Send my little letter'}</button>
    {result.text&&<p className={'form-result '+result.state} role="status">{result.text}</p>}
    <p className="form-disclaimer">Your enquiry is stored securely by this demo application. No message is sent to the reference website.</p>
  </form>;
}

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
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="reference-hero-secondary">Enquire on WhatsApp</a>
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

function Catalogue({items,mode='available'}){
  const isGone=mode==='gone';
  const all=items.filter(p=>p.status===(isGone?'GONE_HOME':'AVAILABLE'));
  const [search,setSearch]=useState('');
  const [place,setPlace]=useState('Everywhere');
  const [breed,setBreed]=useState('All breeds');
  const [gender,setGender]=useState('All');
  const breeds=useMemo(()=>['All breeds',...new Set(all.map(p=>p.breed).filter(Boolean))],[items,mode]);
  const filtered=all.filter(p=>(place==='Everywhere'||(place==='Imported'?(p.name+' '+p.breed).toLowerCase().includes('korean'):(p.name+' '+p.breed).toLowerCase().includes('korean teacup')))&&(breed==='All breeds'||p.breed.toLowerCase().includes(breed.toLowerCase()))&&(gender==='All'||p.gender.toLowerCase().includes(gender.toLowerCase()))&&(p.name+' '+p.breed+' '+p.description).toLowerCase().includes(search.toLowerCase()));
  return <><section className="reference-catalog-hero">
    <div className="wrap">
      <p className="sketch-caption">{isGone?"our happy endings":"from Teddy's sketchbook"}</p>
      <div className="reference-catalog-heading">
        <div><h1>{isGone?'Gone home':'Available puppies'}</h1><p>{isGone?'These lovely pups have found their forever families. Take a peek at our happy endings.':'Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.'}</p></div>
        <div className="sketch-portrait"><div><img src="/assets/puppy-portrait.svg" alt="Teddy the puppy"/></div><span>self-portrait</span></div>
      </div>
    </div>
  </section>
  <section className="section wrap catalog-section">{!isGone&&<div className="reference-filter-board">
    <div className="reference-filter-row"><span>where</span><div>{['Everywhere','Imported','Korean Teacup'].map(location=><button className={place===location?'selected':''} key={location} onClick={()=>setPlace(place===location&&location!=='Everywhere'?'Everywhere':location)}>{location}</button>)}</div></div>
    <div className="reference-filter-row"><span>breed</span><div>{['Maltipoo','Pomeranian','Poodle','Cavapoo','Shih Tzu'].map(value=><button className={breed===value?'selected':''} key={value} onClick={()=>setBreed(breed===value?'All breeds':value)}>{value}</button>)}</div></div>
    <div className="reference-filter-row"><span>boy or girl</span><div>{[['Boy','Boys'],['Girl','Girls']].map(([value,title])=><button className={gender===value?'selected':''} key={value} onClick={()=>setGender(gender===value?'All':value)}>{title}</button>)}</div></div>
  </div>}
  {!isGone&&<div className="reference-search"><label className="search-wrap"><Search size={18}/><input type="search" placeholder="Search puppies by name or breed..." value={search} onChange={e=>setSearch(e.target.value)}/></label>{(search||place!=='Everywhere'||breed!=='All breeds'||gender!=='All')&&<button onClick={()=>{setSearch('');setPlace('Everywhere');setBreed('All breeds');setGender('All')}}>Clear filters</button>}</div>}
  <div className="catalog-count"><span>{filtered.length} {isGone?'happy endings':'puppies looking for a home'}</span><PawPrint size={22}/></div>
  {filtered.length?<div className={'puppy-grid '+(isGone?'gone-grid':'')}>{filtered.map((p,i)=><PuppyCard p={p} index={i} key={p.slug}/>)}</div>:<div className="empty-state"><PawPrint size={46}/><h3>No puppies found</h3><p>Try a different breed or search to discover more fluffy friends.</p><button className="btn btn-dark" onClick={()=>{setSearch('');setBreed('All breeds');setGender('All')}}>Clear filters</button></div>}
  {!isGone&&<div className="other-puppies"><span>Some of our puppies have already found their families!</span><Link to="/gone-home">See the happy endings <ArrowUpRight size={18}/></Link></div>}
  </section><CTA/></>;
}

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
    <div className="button-row">{puppy.status==='AVAILABLE'?<Link className="btn btn-dark" to={'/contact?puppy='+puppy.slug}>Ask about me <ArrowUpRight size={18}/></Link>:<Link className="btn btn-dark" to="/puppies">Meet available puppies <ArrowRight size={18}/></Link>}<a className="btn btn-outline" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp us</a></div>
    <p className="detail-care"><CircleCheck size={18}/> Every puppy is health checked and cared for with love.</p></div></div></section>
    <section className="section related wrap"><Heading tag="More tiny best friends" title={<>You might also <em>love...</em></>} /><div className="puppy-grid">{related.map((p,i)=><PuppyCard p={p} index={i} key={p.slug}/>)}</div></section><CTA/></>;
}

function Families(){
  const [chosen,setChosen]=useState(-1);
  useEffect(()=>{
    const handler=e=>{if(e.key==='Escape')setChosen(-1);if(e.key==='ArrowRight')setChosen(n=>n<0?n:(n+1)%familyData.length);if(e.key==='ArrowLeft')setChosen(n=>n<0?n:(n-1+familyData.length)%familyData.length)};
    window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler);
  },[]);
  return <><section className="page-hero pink-hero"><div className="wrap"><Tag>It's a love story</Tag><h1>Happy families <span className="title-paw">♡</span></h1><p>Our favorite kind of happily ever after? Little paws finding their forever people.</p></div></section><section className="section wrap"><div className="family-masonry">{familyData.map((src,i)=><button className="family-tile" key={src} onClick={()=>setChosen(i)} aria-label={'View family photo '+(i+1)}><Photo src={src} alt={'A happy TeddyPups family with their puppy, photo '+(i+1)}/><span><Heart size={21}/></span></button>)}</div></section>
  {chosen>=0&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Family photo viewer" onClick={()=>setChosen(-1)}><button className="lightbox-close" onClick={()=>setChosen(-1)} aria-label="Close"><X/></button><button className="lightbox-arrow" aria-label="Previous photo" onClick={e=>{e.stopPropagation();setChosen((chosen-1+familyData.length)%familyData.length)}}><ChevronLeft/></button><img src={familyData[chosen]} alt={'Happy family '+(chosen+1)} onClick={e=>e.stopPropagation()}/><button className="lightbox-arrow" aria-label="Next photo" onClick={e=>{e.stopPropagation();setChosen((chosen+1)%familyData.length)}}><ChevronRight/></button><span className="lightbox-count">{chosen+1} / {familyData.length}</span></div>}
  <CTA/></>;
}

function Process(){
  const steps=[['01','Meet your puppy in person','Visit our Downtown Dubai showroom. Spend time with our locally available puppies and see which tiny face steals your heart.','🏡'],['02','Order upon request','Have a special breed in mind? Tell us about your dream puppy. We help you find the right match from trusted partners.','💌']];
  const deliveries=[['Take your puppy home the same day','For locally available, ready-to-go puppies, cuddle today and make memories tonight.','🏠'],['Delivery within Dubai','We can help safely bring your new furry family member straight to your doorstep.','🚗'],['Safe international cargo','Your puppy travels with care, appropriate documentation, and well-planned transport.','✈️'],['Worldwide delivery','Ask us about travel options when your puppy needs to join you beyond the UAE.','🌍']];
  return <><section className="page-hero mint-hero"><div className="wrap"><Tag>From first hello to forever</Tag><h1>How it works <span className="title-paw">✳</span></h1><p>A simple, caring journey to finding the perfect furry addition to your family.</p></div></section>
  <section className="section wrap"><Heading tag="A little love goes a long way" title={<>Two ways <em>home.</em></>} center/><div className="ways-grid">{steps.map(([num,title,description,emoji])=><article className="way-card process-way" key={num}><div className="way-art"><span>{emoji}</span></div><span className="small-number">{num}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
  <section className="section promise"><div className="wrap"><Heading tag="Our promise" title={<>Our premium <em>puppy promise.</em></>} center/><div className="promise-grid">{[['🌸','Loved from day one','Each puppy is treated with the warmth and attention they deserve.'],['🩺','Health comes first','Vaccination, vet checks and wellbeing are essential parts of our care.'],['💛','Always here for you','We guide you through your exciting new beginning together.']].map(([emoji,title,body])=><div className="promise-card" key={title}><div>{emoji}</div><h3>{title}</h3><p>{body}</p></div>)}</div></div></section>
  <section className="section wrap delivery" id="delivery"><Heading tag="Travel safe, arrive happy" title={<>Delivery <em>& collection.</em></>} center/><div className="delivery-grid">{deliveries.map(([title,body,emoji],i)=><div className="delivery-card" key={title}><span>{emoji}</span><small>0{i+1}</small><h3>{title}</h3><p>{body}</p></div>)}</div></section>
  <section className="section reasons"><div className="wrap"><Heading tag="Because tiny paws matter" title={<>Why <em>choose us?</em></>} center/><div className="reasons-row"><div>✈️ <b>International cargo</b></div><div>💌 <b>Support 24/7</b></div><div>🩺 <b>Health guarantee</b></div></div></div></section><CTA/></>;
}

function FaqAccordion({max=0,query=''}) {
  const [active,setActive]=useState(0);
  const questions=faqData.filter(f=>(f.question+' '+f.answer).toLowerCase().includes(query.toLowerCase()));
  return <div className="faq-list">{questions.slice(0,max||undefined).map((f,i)=><div className={'faq-row '+(active===i?'expanded':'')} key={f.question}>
    <button className="faq-question" aria-expanded={active===i} onClick={()=>setActive(active===i?-1:i)}><span>{String(i+1).padStart(2,'0')}</span><b>{f.question}</b><span className="faq-plus">{active===i?'−':'+'}</span></button>
    {active===i&&<div className="faq-answer"><p>{f.answer}</p></div>}
  </div>)}{questions.length===0&&<div className="empty-state">No matching questions. Try another search!</div>}</div>;
}
function FAQ(){
  const [q,setQ]=useState('');
  return <><section className="page-hero yellow-hero"><div className="wrap"><Tag>Everything you're wondering</Tag><h1>Questions & answers <span className="title-paw">?</span></h1><p>Good questions make great puppy parents. We're here to help every step of the way.</p></div></section><section className="section wrap faq-page"><label className="search-wrap faq-search"><Search size={20}/><input type="search" placeholder="Search your question..." value={q} onChange={e=>setQ(e.target.value)}/></label><FaqAccordion query={q}/><div className="faq-bottom">Still have questions? <Link to="/contact">Write us a little letter <ArrowUpRight size={17}/></Link></div></section><CTA/></>;
}

function Contact(){
  const {search}=useLocation();const puppy=new URLSearchParams(search).get('puppy')||'';
  return <section className="reference-contact-page"><div className="wrap">
    <div className="reference-contact-top"><h1>Get in touch<br/>with us</h1><p>Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we'd love to hear from you!</p></div>
    <div className="reference-contact-main"><div className="reference-contact-sidebar">
      <a className="reference-contact-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp +971 50 000 0000</a>
      <div className="reference-contact-method"><b>call us</b><a href="tel:+971500000000">+971 50 000 0000</a></div>
      <div className="reference-contact-method"><b>email</b><a href="mailto:info@instabizweb.com">info@instabizweb.com</a></div>
      <div className="reference-contact-visit"><div className="reference-visit-awning"></div><div><h2>Visit us in<br/>Downtown Dubai</h2><p>Step into our Downtown Dubai showroom and meet your new best friend. Please reach out before visiting.</p><Photo src={available[0].image} alt="A TeddyPups puppy"/><Link to="/puppies">See available puppies <ArrowRight size={17}/></Link></div></div>
    </div><ContactForm key={puppy} puppySlug={puppy}/></div>
  </div></section>;
}

function CTA(){return <section className="bottom-cta"><div className="wrap cta-inner"><div><Tag>Wagging tails start here</Tag><h2>Ready to meet your <em>new best friend?</em></h2><p>Your forever friend might just be one little hello away.</p><div className="button-row"><Link to="/puppies" className="btn btn-dark">Meet the puppies <ArrowUpRight size={18}/></Link><Link to="/contact" className="btn btn-outline">Let's talk <ArrowRight size={18}/></Link></div></div><div className="cta-pup"><Photo src={available[1]?.image||available[0]?.image} alt="Cute puppy"/><span>♡</span></div></div></section>}

function NotFound(){return <div className="not-found wrap"><PawPrint size={56}/><h1>This page has wandered away!</h1><p>Find your way back to the cutest puppies around.</p><Link to="/" className="btn btn-dark">Back home <ArrowRight size={18}/></Link></div>}

export default function App(){
  const items=useCatalogue();
  return <><ScrollReset/><Header/><main><Routes>
    <Route path="/" element={<Home items={items}/>}/>
    <Route path="/puppies" element={<Catalogue items={items}/>}/>
    <Route path="/puppies/:slug" element={<Detail items={items}/>}/>
    <Route path="/gone-home" element={<Catalogue items={items} mode="gone"/>}/>
    <Route path="/happy-families" element={<Families/>}/>
    <Route path="/how-it-works" element={<Process/>}/>
    <Route path="/faq" element={<FAQ/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes></main><Footer/></>;
}
