import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, PawPrint, ArrowUpRight } from 'lucide-react';
import { PuppyCard } from '../components/Shared';
import { CTA } from '../components/CTA';
import { filterPuppies, initialFilters } from '../utils/catalogue';

function Catalogue({items,mode='available'}){
  const isGone=mode==='gone';
  const all=items.filter(p=>p.status===(isGone?'GONE_HOME':'AVAILABLE'));
  const [search,setSearch]=useState('');
  const [place,setPlace]=useState(initialFilters.location);
  const [breed,setBreed]=useState('All breeds');
  const [gender,setGender]=useState('All');
  const resetFilters=()=>{setSearch('');setPlace('Everywhere');setBreed('All breeds');setGender('All')};
  const filtered=filterPuppies(all,{search,location:place,breed,gender});
  return <><section className="reference-catalog-hero">
    <div className="wrap">
      <p className="sketch-caption">{isGone?"our happy endings":"from Teddy's sketchbook"}</p>
      <div className="reference-catalog-heading">
        <div><h1>{isGone?'Gone home':'Available puppies'}</h1><p>{isGone?'These lovely pups have found their forever families. Take a peek at our happy endings.':'Every listing shows photos of the actual puppy. Open a profile to see them all, then send a demo enquiry.'}</p></div>
        <div className="sketch-portrait"><div><img src="/assets/puppy-portrait.svg" alt="Teddy the puppy"/></div><span>self-portrait</span></div>
      </div>
    </div>
  </section>
  <section className="section wrap catalog-section">{!isGone&&<div className="reference-filter-board">
    <div className="reference-filter-row"><span>puppy type</span><div>{['Everywhere','Korean Teacup'].map(location=><button className={place===location?'selected':''} key={location} onClick={()=>setPlace(place===location&&location!=='Everywhere'?'Everywhere':location)}>{location}</button>)}</div></div>
    <div className="reference-filter-row"><span>breed</span><div>{['Maltipoo','Pomeranian','Poodle','Cavapoo','Shih Tzu'].map(value=><button className={breed===value?'selected':''} key={value} onClick={()=>setBreed(breed===value?'All breeds':value)}>{value}</button>)}</div></div>
    <div className="reference-filter-row"><span>boy or girl</span><div>{[['Boy','Boys'],['Girl','Girls']].map(([value,title])=><button className={gender===value?'selected':''} key={value} onClick={()=>setGender(gender===value?'All':value)}>{title}</button>)}</div></div>
  </div>}
  {!isGone&&<div className="reference-search"><label className="search-wrap"><Search size={18}/><input type="search" placeholder="Search puppies by name or breed..." value={search} onChange={e=>setSearch(e.target.value)}/></label>{(search||place!=='Everywhere'||breed!=='All breeds'||gender!=='All')&&<button onClick={resetFilters}>Clear filters</button>}</div>}
  <div className="catalog-count"><span>{filtered.length} {isGone?'happy endings':'puppies looking for a home'}</span><PawPrint size={22}/></div>
  {filtered.length?<div className={'puppy-grid '+(isGone?'gone-grid':'')}>{filtered.map((p,i)=><PuppyCard p={p} index={i} key={p.slug}/>)}</div>:<div className="empty-state"><PawPrint size={46}/><h3>No puppies found</h3><p>Try a different breed or search to discover more fluffy friends.</p><button className="btn btn-dark" onClick={resetFilters}>Clear filters</button></div>}
  {!isGone&&<div className="other-puppies"><span>Some of our puppies have already found their families!</span><Link to="/gone-home">See the happy endings <ArrowUpRight size={18}/></Link></div>}
  </section><CTA/></>;
}

export { Catalogue };
