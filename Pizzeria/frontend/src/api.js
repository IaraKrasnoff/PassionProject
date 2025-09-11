const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export async function fetchAbout(){
  const res = await fetch(`${API_BASE}/about`);
  return res.json();
}

export async function fetchPizzas(){
  const res = await fetch(`${API_BASE}/pizzas`);
  return res.json();
}

export async function placeOrder(order){
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(order)
  });
  return res.json();
}

export async function submitContact(contact){
  const res = await fetch(`${API_BASE}/contacts`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(contact)
  });
  return res.json();
}

export async function fetchOrders(){
  const res = await fetch(`${API_BASE}/orders`);
  return res.json();
}
