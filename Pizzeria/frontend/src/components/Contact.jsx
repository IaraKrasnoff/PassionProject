import React, {useState} from 'react';
import { submitContact } from '../api';

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', phone:'', message:''});
  const [sent, setSent] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    await submitContact(form);
    setSent(true);
    setForm({name:'', email:'', phone:'', message:''});
  }

  if(sent) return <div className="card"><h3>Obrigado! Entraremos em contato.</h3></div>;

  return (
    <div className="card">
      <h2>Contato</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nome" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input placeholder="Telefone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
        <textarea placeholder="Mensagem" value={form.message} onChange={e=>setForm({...form, message:e.target.value})}/>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
