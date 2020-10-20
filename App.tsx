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
  const [newItemValue, setNewItemValue] = useState<string>("")
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


  const addItemToList = () => {

    let newLists = state.map((el) => {

      // Make a copy of items
      const newItems = el.items.map(item => {

        return item
      })

      // Need to check IF is in the right list, and only apply then
      if (activeTab === el.name) {
        // Push new item into the copied array
        newItems.push({ name: newItemValue, checked: false })
      }

      // Build and return new list
      return {
        name: el.name,
        items: newItems,
      }
    })
    setState(newLists)
  }



  const deleteFromList = (listToDeleteFrom: string, itemToDelete: string) => {
    // Iterate over every list in the state
    let newState = state.map(el => {

      // Return the same list if its not the listToDeleteFrom
      if (el.name !== listToDeleteFrom) {
        return el
      }

      // Iterate over every item in the list we want to delete from
      const newItems = el.items.filter(item => {
        // Do not return the item if the name matches itemToDelete
        if (item.name === itemToDelete) {
          return false
        }
        // Return the item
        return true
      })

      // Build new list
      return {
        name: el.name,
        items: newItems,
      }
    })

    // Set updated lists
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


      <input onChange={(e) => {
        setNewListTitle(e.currentTarget.value)
      }} value={newListTitle}></input>
      <button onClick={() => { addListToState() }}>+</button>
      <br />

      {state.map(el => {
        return <button onClick={() => {
          setActiveTab(el.name)
        }}>{el.name}</button>
      })}
      <br /><br />

      <input onChange={(e) => {
        setNewItemValue(e.currentTarget.value)
      }} value={newItemValue}></input>
      <button onClick={() => { addItemToList() }}>+</button>
      <br />

      {activeList.items.map((el) => {
        return (
          <>
            <input type="checkbox"
              checked={el.checked}
              onChange={() => { setChecked(el.checked = !checked) }}
            />

            <ShoppingItem
              name={el.name}
              isChecked={el.checked}
              deleteFromList={() => { deleteFromList(activeList.name, el.name) }}
            />

            <br />

          </>
        )
      })}
    </h1>
  );
}


interface ShoppingItemProps {
  name: string
  isChecked: boolean
  deleteFromList: () => void
}

const ShoppingItem = (props: ShoppingItemProps) => {
  // Destructuring fields from the props
  const {
    name,
    isChecked,
    deleteFromList,
  } = props

  return (
    <li>
      {name}: {isChecked.toString()}
      <button onClick={() => {
        // Function closure declared in parent component
        deleteFromList()
      }}>Delete</button>
    </li>

  )
}

export default App;