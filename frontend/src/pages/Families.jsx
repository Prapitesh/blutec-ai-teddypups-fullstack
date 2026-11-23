import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import familyData from '../data/families.json';
import { Tag, Photo } from '../components/Shared';
import { CTA } from '../components/CTA';

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

export { Families };
