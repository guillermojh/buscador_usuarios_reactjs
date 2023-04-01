import React from 'react';
import Header from './Header';
import Resultados from './Resultados';
import {useState} from 'react';
import {mock1} from "./constants/users";
import CONFIG from './config/config'

const App = () => {
  const [query,setQuery] = useState(""); 
  const [resultado,setResultado] = useState(null); 
  const [error,setError] = useState(null);

  const callServer = async (param) => {
    if(CONFIG.use_server){
      try {
        let queryParams;
        if (param==="all") {
          queryParams = "?limit=" + CONFIG.num_items;
        } else {
          queryParams = "/search?q=" + query;
        }
        const response = await fetch (`${CONFIG.server_url}${queryParams}`);
        const data = await response.json();
        setResultado(data.users);
        setError(null);
      } catch(error){
        console.log(error);
        setError({description: error.message});
      }
    } else {
      setResultado(mock1.users)
      setError(null);
    }
  }

  return (
    <div id= "main">
    <Header/>
    <h2 id='buscador'>Buscador</h2>
    <input type="text" id='query' value={query} onChange={e=>setQuery(e.target.value)} placeholder='Texto a buscar'/>
    <button id='botonsearch' onClick={()=>callServer()}>Buscar</button>
    <button id='botonall' onClick={()=>callServer("all")}>Buscar Todos</button>
    {error && <h1>Ha ocurrido un error: {error.description}</h1>}

    {/* hay dos opciones para que al iniciar la aplicacion no me de un error, ya que resultado para ese momento es igual a null */}

    {/* opcion 1: Si resultado no tiene valor no se imprime */}
    {resultado && <Resultados resultado={resultado}/>} 
    
    {/* opcion 2: con un ternario */}
    {/* {resultado !==null ? <Resultados resultado={resultado}/> : null}  */}

    </div>
  )
}

export default App