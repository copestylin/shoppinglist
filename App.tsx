import React, { useState } from 'react';

interface List {
  name: string
  items: Item[]
}

interface Item {
  name: string
  checked: boolean
}

function App() {
  const [activeTab, setActiveTab] = useState<string>("drinks")
  const [checked, setChecked] = useState<boolean>(false)
  const [newListTitle, setNewListTitle] = useState<string>("new list")
  const [state, setState] = useState<List[]>([
    {
      name: "drinks",
      items: [
        { name: "coffee", checked: false },
        { name: "coke", checked: false },
      ]
    },
    {
      name: "food",
      items: [
        { name: "bread", checked: false },
        { name: "cookies", checked: false }
      ],
    },
  ])

  const addListToState = () => {
    let newState = state.map((el) => { return el })
    newState.push({ name: newListTitle, items: [] })
    setState(newState)
  }

  const activeList = state.find((el) => {
    return el.name === activeTab
  })

  if (!activeList) {
    return <div>List not found</div>
  }

  return (
    <h1 className="App">
      NINJA SHOPPING LIST - ACTIVE TAB:{activeTab}
      <br />
      {state.map(el => {
        return <button onClick={() => {
          setActiveTab(el.name)
        }}>{el.name}</button>
      })}
      <input onChange={(e) => {
        setNewListTitle(e.currentTarget.value)
      }} value={newListTitle}></input>
      <button onClick={() => { addListToState() }}>+</button>
      <div>
        {activeList.items.map((el) => {
          return (
            <>
          <input type="checkbox" 
            checked={el.checked} 
            onChange={() => {setChecked(el.checked = !checked)}}
          />
          <li>{el.checked ? <u>{el.name}</u> : el.name}</li>
          </>
          ) 
        })}
      </div>
    </h1>
  );
}

export default App;