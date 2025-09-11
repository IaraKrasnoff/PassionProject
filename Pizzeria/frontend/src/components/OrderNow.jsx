import React, {useState, useEffect} from 'react';
import { fetchPizzas, placeOrder } from '../api';

export default function OrderNow(){
  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState({});
  const [form, setForm] = useState({customer_name:'', address:'', phone:''});
  const [message, setMessage] = useState(null);

  useEffect(()=>{ fetchPizzas().then(setPizzas); }, []);

  function addToCart(pizzaId){
    setCart(prev => ({...prev, [pizzaId]: (prev[pizzaId] || 0) + 1}));
  }

  function removeFromCart(pizzaId){
    setCart(prev => {
      const copy = {...prev};
      if(!copy[pizzaId]) return copy;
      copy[pizzaId]--;
      if(copy[pizzaId] <= 0) delete copy[pizzaId];
      return copy;
    });
  }

  async function submit(){
    const items = Object.entries(cart).map(([pizza_id, quantity]) => ({pizza_id: Number(pizza_id), quantity}));
    const payload = {...form, items};
    const result = await placeOrder(payload);
    if(result && result.id){
      setMessage(`Pedido recebido! ID ${result.id}`);
      setCart({});
      setForm({customer_name:'', address:'', phone:''});
    } else {
      setMessage('Erro ao enviar pedido.');
    }
  }

  return (
    <div className="card">
      <h2>Peça Agora</h2>
      <div className="menu-list">
        {pizzas.map(p => (
          <div key={p.id} className="order-item">
            <div className="item-details">
              <strong>{p.name}</strong> - <span className="price">R$ {parseFloat(p.price).toFixed(2)}</span><br/>
              <small style={{color: '#666'}}>{p.description}</small>
            </div>
            <div className="quantity-controls">
              <button className="qty-btn" onClick={()=>removeFromCart(p.id)}>-</button>
              <span className="quantity">{cart[p.id] || 0}</span>
              <button className="qty-btn" onClick={()=>addToCart(p.id)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <h3>Seu Pedido</h3>
        <div className="cart-items">
          {Object.entries(cart).length === 0 ? (
            <p style={{color: '#666', fontStyle: 'italic'}}>Carrinho vazio</p>
          ) : (
            <ul style={{listStyle: 'none', padding: 0}}>
              {Object.entries(cart).map(([id,qty])=>{
                const pizza = pizzas.find(p=>p.id===Number(id));
                return (
                  <li key={id} style={{padding: '8px 0', borderBottom: '1px solid #eee'}}>
                    {pizza?.name} x {qty} = <span className="price">R$ {(parseFloat(pizza?.price || 0) * qty).toFixed(2)}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="customer-form">
        <h3>Dados para Entrega</h3>
        <input 
          placeholder="Nome" 
          value={form.customer_name} 
          onChange={e=>setForm({...form, customer_name:e.target.value})}
        />
        <input 
          placeholder="Endereço" 
          value={form.address} 
          onChange={e=>setForm({...form, address:e.target.value})}
        />
        <input 
          placeholder="Telefone" 
          value={form.phone} 
          onChange={e=>setForm({...form, phone:e.target.value})}
        />
        <button 
          onClick={submit} 
          disabled={Object.keys(cart).length===0}
          className={Object.keys(cart).length===0 ? 'disabled' : ''}
        >
          Enviar Pedido
        </button>
        {message && <div className="notice">{message}</div>}
      </div>
    </div>
  );
}
