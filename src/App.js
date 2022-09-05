import { useEffect, useState } from "react";

const endpoint = "https://fetch-me.vercel.app/api/shopping/items";


function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const [data, setData] = useState(null);
  const [activeItems, setActiveItems] = useState([() => {
    const storedItems = window.localStorage.getItem("shoppingList")
    return JSON.parse(storedItems);
  }]);

  useEffect(() => {

    async function fetchData() {
      const response = await fetch(endpoint);
      const json = await response.json();
      setData(json.data);

    }

    fetchData();

  }, []);

  useEffect(() => {
    window.localStorage.setItem("shoppingList", JSON.stringify(activeItems));
  }, [activeItems]);

  if (data === null) {
    return <div>loading...</div>
  }

  return (
    <div >
      <h1>Shopping List</h1>
      <input type="search" value={searchQuery} onChange={(event) => {
        setSearchQuery(event.target.value);
      }} />
      <h2>Active Items</h2>
      <ul>
        {activeItems.map(item => {
          return (
            <li key={item._id} >
              {item.name.de} <button type="button" onClick={() => {
                // Filter the clicked item from the list
                const nextActiveItems = activeItems.filter(activeItem => {
                  return activeItem._id !== item._id
                });
                // Now update the activeItems
                setActiveItems(nextActiveItems);
              }}>Remove</button>
            </li>
          )

        })}
      </ul>
      <h2>Filtered Items</h2>
      <ul>
        {searchQuery === "" ? <h2>Please Enter a search term</h2> : data.filter(item => {
          return item.name.de.toLowerCase().includes(searchQuery.toLowerCase());
        }).map(item => {
          return (
            <li key={item._id} >
              <button type="button" onClick={() => {
                // Here
                setActiveItems([...activeItems, item])
                setSearchQuery("");
              }}>
                {item.name.de}
              </button>
            </li>
          )
        })}
      </ul>
      {data?.some(item => {
        return item.name.de.toLowerCase().includes(searchQuery.toLowerCase());
      }) ? null : "No matches"}
    </div>
  );
}

export default App;
