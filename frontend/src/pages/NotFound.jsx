import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PawPrint } from 'lucide-react';

function NotFound(){return <div className="not-found wrap"><PawPrint size={56}/><h1>This page has wandered away!</h1><p>Find your way back to the cutest puppies around.</p><Link to="/" className="btn btn-dark">Back home <ArrowRight size={18}/></Link></div>}

export { NotFound };
