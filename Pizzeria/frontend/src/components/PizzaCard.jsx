import React from 'react';

export default function PizzaCard({pizza}){
  return (
    <div className="pizza-card">
      <h3>{pizza.name} <span className="price">R$ {parseFloat(pizza.price).toFixed(2)}</span></h3>
      <p>{pizza.description}</p>
      {pizza.is_vegetarian && <small>Vegetariana</small>}
    </div>
  );
}
