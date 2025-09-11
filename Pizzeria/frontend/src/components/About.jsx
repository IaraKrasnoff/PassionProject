import React, {useEffect, useState} from 'react';
import { fetchAbout } from '../api';

export default function About(){
  const [about, setAbout] = useState(null);
  useEffect(()=> {
    fetchAbout().then(setAbout);
  }, []);
  if(!about) return <div>Loading...</div>;
  return (
    <div className="card">
      <h2>Sobre Nós</h2>
      <p><strong>{about.name}</strong></p>
      <p>{about.description}</p>
      <p><strong>Horário:</strong> {about.hours}</p>
      <p><strong>Endereço:</strong> {about.address}</p>
      <p><strong>Telefone:</strong> {about.phone}</p>
    </div>
  );
}
