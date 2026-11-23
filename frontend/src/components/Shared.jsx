import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, PawPrint } from 'lucide-react';

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

export { Tag, Heading, Photo, PuppyCard };
