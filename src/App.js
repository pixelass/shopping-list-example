import { useEffect, useState } from "react";

const endpoint = "https://fetch-me.vercel.app/api/shopping/items";


function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const [data, setData] = useState(null);
  const [activeItems, setActiveItems] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const response = await fetch(endpoint);
      const json = await response.json();
      setData(json.data);

    }

    fetchData();

  }, []);

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
              {item.name.de}
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
