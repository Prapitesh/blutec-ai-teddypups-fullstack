import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { available } from '../data/catalogue';
import { Tag, Photo } from './Shared';

function CTA(){return <section className="bottom-cta"><div className="wrap cta-inner"><div><Tag>Wagging tails start here</Tag><h2>Ready to meet your <em>new best friend?</em></h2><p>Your forever friend might just be one little hello away.</p><div className="button-row"><Link to="/puppies" className="btn btn-dark">Meet the puppies <ArrowUpRight size={18}/></Link><Link to="/contact" className="btn btn-outline">Let's talk <ArrowRight size={18}/></Link></div></div><div className="cta-pup"><Photo src={available[1]?.image||available[0]?.image} alt="Cute puppy"/><span>♡</span></div></div></section>}

export { CTA };
