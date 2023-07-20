import { useState } from 'react'
import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs
} from 'firebase/firestore';
import { toast } from "react-toastify";
import './App.css'

function App() {

  const [autor, setAutor] = useState('');
  const [titulo, setTitulo] = useState('');
  const [posts, setPosts] = useState([])

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

  async function handlesSearchPosts() {
    const postsRef = collection(db, 'posts');
    await getDocs(postsRef)

      .then((snapshot: any) => {
        //@ts-ignore
        const lista = []

        snapshot.forEach((doc: any) => {
          // colocando os elemntos no array. ex: id, titulo e autor
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });
        //@ts-ignore
        setPosts(lista);

      })
      .catch((erro) => {
        console.log("erro ao buscar informações" + erro)
      })
  }

  return (
    <>
      <div className="app-container">
        <h1>React + Fire base</h1>
        <div className="app-content">
          <div className="field-content">
            <label>
              Titulo:
            </label>
            <textarea
              placeholder='Digite o titulo'
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </ div>
          <div className="field-content">
            <label>
              Autor:
            </label>
            <textarea
              placeholder='Digite o autor'
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
          </ div>

          <div className="btn-container">
            <button onClick={() => handleAddDocument()}>
              Cadastrar
            </button>
            <button onClick={() => handlesSearchPosts()}>
              Buscar posts
            </button>
          </div>

          <div className="list-container">
            <ul>
              {posts.map((post: any) => {
                return (
                  <div className="list-content">
                  <li key={post.id}>
                    <span>Title: {post.titulo}</span> <br />
                    <span>Autor: {post.autor} </span> <br />
                  </li>
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
