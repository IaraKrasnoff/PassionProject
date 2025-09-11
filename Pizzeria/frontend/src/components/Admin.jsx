import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../api';

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <h2>Admin - Pedidos</h2>
        <p>Carregando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Admin - Pedidos ({orders.length})</h2>
      
      {orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Pedido #{order.id}</h3>
                <div className="order-status">
                  <span className={`status ${order.status}`}>
                    {order.status === 'pending' ? 'Pendente' : order.status}
                  </span>
                  <span className="order-total">R$ {order.total}</span>
                </div>
              </div>
              
              <div className="order-details">
                <div className="customer-info">
                  <p><strong>Cliente:</strong> {order.customer_name}</p>
                  <p><strong>Telefone:</strong> {order.phone}</p>
                  <p><strong>Endereço:</strong> {order.address}</p>
                </div>
                
                <div className="order-items">
                  <h4>Itens:</h4>
                  {order.items && order.items.length > 0 ? (
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          Item #{item} {/* This will be improved when we get pizza details */}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Detalhes dos itens não disponíveis</p>
                  )}
                </div>

                <div className="order-actions">
                  <button className="btn-primary">Confirmar</button>
                  <button className="btn-secondary">Em Preparo</button>
                  <button className="btn-success">Pronto</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
