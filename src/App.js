import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    })
  }, []);

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      "title": `Projeto React ${Date.now()}`,
      "url": "Gabriel Vasconcelos",
      "techs": ["React", "Node"]
    });

    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`/repositories/${id}`);
    if (res.status === 204) {
      setRepositories(repositories.filter(rep => rep.id !== id));
    }
  }

  return (
    <div>
      <button type="button" onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {repositories.map(rep =>
          <li key={rep.id}>
            {rep.title}
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
          </button>
          </li>)}
      </ul>
    </div>
  );
}

export default App;
