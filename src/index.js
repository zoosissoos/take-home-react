import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

function firstLetterUppercase (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

async function fetchData (url) {
  if(url) {
    try{
      const res = await fetch(url)
      return res.json()
    } catch (e) {
      console.log(e)
    }
  }
}


function DataCol({title, data}) {
  const styles = {
    col: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }
  }
  return (
    <div styles={styles.col}>
      <h2>{title}</h2>
      {data ? data.map(({name}) => {
        const formattedName = firstLetterUppercase(name)
        return <p>{formattedName}</p>
      }): null}
    </div>
  )
}


function App() {
  const [data, setData] = useState(null)

  async function gatherData() {
    const users = await fetchData('https://jsonplaceholder.typicode.com/users')
    const { results } = await fetchData('https://pokeapi.co/api/v2/pokemon-species/')
    return ({users, pokemon: results})
  }

  useEffect(() => {
    gatherData().then((data) => setData(data))
  }, [])

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid black',
      padding: '1rem',
      borderRadius: '6px',
      background: 'ivory',
      flexWrap: 'wrap',
      textAlign: 'center'
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      textAlign: 'left'
    }
  };

  return (
    <div style={styles.container}>
      <h1>Users & Pokemon</h1>
      <div style={styles.row}>
        <DataCol title='Users' data={data?.users || null}/>
        <DataCol title='Pokemon' data={data?.pokemon || null}/>
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);