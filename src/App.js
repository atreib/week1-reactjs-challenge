import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const getRepositories = async () => {
    const { data } = await api.get("repositories");
    setRepositories(data);
  }

  useEffect(() => {
    getRepositories();
  }, []);

  async function handleAddRepository() {
    const dateId = Date.now();
    const newRepo = {
      title: `teste ${dateId}`,
      url: `teste url ${dateId}`,
      techs: [`teste tech ${dateId}`, `teste tech 2${dateId}`]
    };
    const { data } = await api.post('repositories', newRepo);
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(item => item.id !== id))
  }

  async function handleLikeRepository(id) {
    await api.post(`repositories/${id}/like`);
    await getRepositories();
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return (
            <li key={repo.id}>
              [{repo.likes} LIKES] <b style={{padding: '8px'}}> {repo.title} </b> ({repo.url})
              <button className="btn-primary" onClick={() => handleLikeRepository(repo.id)}>
                Curtir
              </button>
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          );
        })}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
