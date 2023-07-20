import { useState } from 'react'
import { db } from './firebase';
import { doc, setDoc, collection, addDoc, getDoc } from 'firebase/firestore';
import { toast } from "react-toastify";
import './App.css'

function App() {

  const [autor, setAutor] = useState('');
  const [titulo, setTitulo] = useState('');

  function handleWarn() {
    toast.warn('Os campos devem ser preenchidos', { autoClose: 3000 });
  }
  function handleSuccess() {
    toast.success('Informações cadastradas', { autoClose: 3000 });
  }

  async function handleAddDocument() {
    if (autor.length > 0 && titulo.length > 0) {

      return await addDoc(collection(db, "posts"), {
        titulo: titulo,
        autor: autor,
      })

        .then(() => {
          handleSuccess()
          setAutor('')
          setTitulo('')
        })

        .catch((erro: any) => {
          console.log("Erro ao cadastrar" + erro)
        })
    } else {
      handleWarn();
    }
  }

  return (
    <>
      <div className="app-container">
        <h1>React + Fire base</h1>
        <div className="app-content">
          <label>
            Titulo:
          </label>
          <textarea
            placeholder='Digite o titulo'
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <label>
            Autor:
          </label>
          <textarea
            placeholder='Digite o autor'
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />

          <button onClick={() => handleAddDocument()}>
            Cadastrar
          </button>
        </div>
      </div>
    </>
  )
}

export default App
