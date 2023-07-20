import { useEffect, useState } from 'react'
import { db } from './firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import './App.css'
import { handleSuccess, handleWarn } from './components/Utils/Utils';

function App() {

  const [autor, setAutor] = useState('');
  const [titulo, setTitulo] = useState('');
  const [postId, setPostId] = useState('');
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function handleListPosts() {
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        //@ts-ignore
        const listPost = []

        snapshot.forEach((doc: any) => {
          // colocando os elemntos no array. ex: id, titulo e autor
          listPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });
        //@ts-ignore
        setPosts(listPost);
      })
    }
    handleListPosts()
  }, [])


  async function handleAddDocument() {
    if (autor.length > 0 && titulo.length > 0 && postId === '') {

      return await addDoc(collection(db, "posts"), {
        titulo: titulo,
        autor: autor,
      })

        .then(() => {
          handleSuccess()
          handlesSearchPosts()
          setAutor('')
          setTitulo('')
        })

        .catch((erro: any) => {
          console.log("Erro ao cadastrar: " + erro)
        })
    } else {
      handleWarn();
    }
  }


  async function handlesSearchIdPosts() {
    const idPostsRef = doc(db, 'posts', postId);
    await updateDoc(idPostsRef, {
      titulo: titulo,
      autor: autor,
    })

      .then(() => {
        setAutor('')
        setTitulo('')
        setPostId('')
      })
      .catch((erro) => {
        console.log("erro ao atualizar informações: " + erro)
      })
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
        console.log("erro ao buscar informações: " + erro)
      })
  }

  async function handleDeletePost(id: any) {
    const deleteRef = doc(db, "posts", id);
    await deleteDoc(deleteRef)

      .then(() => {
        handleSuccess()
        handlesSearchPosts()
      })

      .catch((erro: any) => {
        console.log("Erro ao axcluir: " + erro)
      })

  }

  return (
    <>
      <div className="app-container">
        <h1>React + Fire base</h1>
        <div className="app-content">
          <div className="field-content">
            <label>
              ID:
            </label>
            <textarea
              placeholder='Digite o id'
              value={postId}
              onChange={(e) => setPostId(e.target.value)}
            />
          </ div>
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
            <button onClick={() => handlesSearchIdPosts()}>
              Atualizar informações
            </button>
          </div>

          <div className="list-container">
            <ul>
              {posts.map((post: any) => {
                return (
                  <div className="list-content">
                    <li key={post.id}>
                      <span>Id: {post.id}</span> <br />
                      <span>Title: {post.titulo}</span> <br />
                      <span>Autor: {post.autor} </span> <br />
                      <button onClick={() => handleDeletePost(post.id)}>
                        Excluir
                      </button>
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
