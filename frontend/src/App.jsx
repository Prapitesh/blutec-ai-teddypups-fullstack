import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useCatalogue } from './hooks/useCatalogue';
import { ScrollReset, Header, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { Catalogue } from './pages/Catalogue';
import { Detail } from './pages/Detail';
import { Families } from './pages/Families';
import { Process } from './pages/Process';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export default function App() {
  const { items, apiError } = useCatalogue();
  return <><ScrollReset/><Header/>{apiError && <div role="alert" className="api-fallback-notice">Live catalogue temporarily unavailable. Showing saved demo profiles.</div>}<main><Routes>
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
