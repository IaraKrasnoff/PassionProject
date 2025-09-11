import React, {useEffect, useState} from 'react';
import { fetchPizzas } from '../api';
import PizzaCard from './PizzaCard';

export default function PizzaMenu(){
  const [pizzas, setPizzas] = useState([]);
  useEffect(()=>{ fetchPizzas().then(setPizzas); }, []);
  return (
    <div className="card">
      <h2>Sabores</h2>
      <div className="grid">
        {pizzas.map(p => <PizzaCard key={p.id} pizza={p} />)}
      </div>
    </div>
  );
}
