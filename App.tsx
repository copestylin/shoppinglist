import React, { useState } from 'react';
import { isTemplateSpan } from 'typescript';
import './App.css';

interface ItemProps {
  name: string
  del: () => void
}

function ShoppingListItem({ name, del }: ItemProps) {
  const [checked, setChecked] = useState<boolean>(false)
  return (
  <li><input type="checkbox" onClick={function() {setChecked(!checked);}} />
  {checked ? <span style={{textDecoration:"line-through"}}>{name}</span> : name}<button onClick={del}>delete</button></li>
  )}

function App() {
  const [items, setItems] = useState<string[]>(["milk", "coffee", "gts3090"])
  const [newItem, setNewItem] = useState<string>("")
  return (
    <div id="app" style={{maxWidth:"500px", margin: "0 auto"}}>
      <h1>Shopping List</h1>
      <input value={newItem} onChange={function(e: React.ChangeEvent<HTMLInputElement>) {
        setNewItem(e.currentTarget.value);
      }} />
      <button onClick={() => {
        setItems([...items, newItem])
        setNewItem("")
      }}>add</button>
      <ul className="shopping-list">
        {items.map(function(name: string) {
            return <ShoppingListItem key={name} name={name} del={() => setItems(items.filter((item) => name !== item))} /> 
        })}
     </ul>
    </div>
  );
}

export default App;