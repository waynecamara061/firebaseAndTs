import { useEffect, useState } from 'react'
import './style.css'
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { handleSuccess, handleSuccessDelete, handleWarn } from '../../components/Utils/Utils';

function Admin() {

  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState<any>({})
  const [listaTarefa, setListaTarefa] = useState([])
  const [edit, setEdit] = useState({})


  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser")
      // @ts-expect-error
      setUser(JSON.parse(userDetail))

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const tarefaRef = collection(db, "tarefas");
        const queryContent = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))

        const unsub = onSnapshot(queryContent, (snapshot: any) => {
          // @ts-expect-error
          const lista = [];

          snapshot.forEach((doc: any) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid,
            })
            //@ts-ignore
            setListaTarefa(lista)
          });
        })

      }
    }



    loadTarefas()
  }, [])


  async function handleFormClick(e: any) {
    e.preventDefault();
    if (tarefaInput === '') {
      handleWarn()
      return;
    }

    // @ts-expect-error
    if (edit?.id) {
      handleUpdateTask()
      return;
    }

    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })

      .then(() => {
        handleSuccess()
        setTarefaInput('')
      })

      .catch((erro: any) => {
        console.log("Erro" + erro)
      })
  }

  async function handleLogout() {
    await signOut(auth)
  }

  async function handleDeletTask(id: any) {
    const docRef = doc(db, "tarefas", id)
    await deleteDoc(docRef)

      .then(() => {
        handleSuccessDelete()
      })

      .catch((erro: any) => {
        console.log("Erro" + erro)
      })
  }

  function handleEditTask(item: any) {
    setTarefaInput(item.tarefa)
    setEdit(item)
  }

  async function handleUpdateTask() {
    // @ts-expect-error
    const docRef = doc(db, "tarefas", edit?.id)
    await updateDoc(docRef, {
      tarefa: tarefaInput,
    })
      .then(() => {
        handleSuccess()
        setTarefaInput('')
        setEdit({})
      })

      .catch((erro: any) => {
        console.log("Erro" + erro)
        setTarefaInput('')
        setEdit({})
      })

  }

  return (
    <div className='admin-container'>
      <h1>Minhas Tarefas</h1>
      <form className="form-task-list" onSubmit={handleFormClick}>
        <textarea
          cols={70} rows={10}
          placeholder='Digite sua tarefa'
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}>

        </textarea>

        {Object.keys(edit).length > 0 ? (
          <button type='submit' onClick={() => handleUpdateTask()}> Editar tarefa </button>
        ) : (
          <button type='submit'> Registrar tarefa </button>
        )}

      </form>

      <div className="article-content">
        {listaTarefa.map((item: any) => (
          <article key={item.id} className="list-container">
            <p>{item.tarefa}</p>
            <div className="btn-article-section">
              <button onClick={() => handleEditTask(item)}>Editar</button>
              <button onClick={() => handleDeletTask(item.id)}>Concluir</button>
            </div>
          </article>
        ))}
      </div>

      <button className='btn-logout' onClick={handleLogout}>Sair</button>
    </div>
  )
}

export default Admin