import { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { handleSuccess, handleWarn, handleWarnLogin } from '../../components/Utils/Utils';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Home() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();


  async function handleLogin(e: any) {
    e.preventDefault();

    {
      email !== '' && senha !== ''
        ?
        await signInWithEmailAndPassword(auth, email, senha)
          .then(() => {
            navigate('/admin', { replace: true })
            handleSuccess();
            setSenha('')
            setEmail('')
          })
          .catch((erro: any) => {
            console.log("Erro em: " + erro)
            handleWarnLogin()
            setSenha('')

          })
        :
        handleWarn()

    }
  }

  return (
    <section>
      <div className="home-page-container">
        <h1>Lista de tarefas</h1>
        <h2>Organize suas atividades diaria.!</h2>

        <form className='form-task-list' onSubmit={handleLogin}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Digite seu email'
            type='text' />

          <input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder='********'
            type='password' />

          <button>Login</button>
          <Link to={"/login"}>
            não possui uma conta? Cadastre-se.
          </Link>
        </form>
      </div>
    </section>
  )
}

export default Home;