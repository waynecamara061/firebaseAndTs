import { useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { handleSuccess, handleWarn } from '../../components/Utils/Utils'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';


function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate()

    async function handleRegister(e: any) {
        e.preventDefault();
        {
            email !== '' && senha !== ''
                ?
                await createUserWithEmailAndPassword(auth, email, senha)
                    .then(() => {
                        navigate('/admin', { replace: true })
                        handleSuccess();
                        setSenha('')
                        setEmail('')
                    })
                    .catch((erro: any) => {
                        console.log("Erro: " + erro)
                    })
                :
                handleWarn()

        }
    }

    return (
        <section>
            <div className="home-page-container">
                <h1>Cadastre-se</h1>
                <h2>Vamos criar sua conta!</h2>

                <form className='form-task-list' onSubmit={handleRegister}>
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

                    <button>Cadastrar</button>
                    <Link to={"/"}>
                        já possui uma conta? Faça login.
                    </Link>
                </form>
            </div>
        </section>
    )
}

export default Login