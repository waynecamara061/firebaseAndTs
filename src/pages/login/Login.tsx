import { useEffect, useState } from 'react'
import './style.css'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { handleWarnLogin } from '../../components/Utils/Utils'


function Login() {

    const [senha, setSenha] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState(false)
    const [userDetail, setUserDetail] = useState({})

    const navigate = useNavigate()

    async function newUser() {
        await createUserWithEmailAndPassword(auth, email, senha)
            .then(() => {
                navigate("/home", { replace: true });
                setEmail('')
                setSenha('')
            })

            .catch((erro: any) => {
                console.log("Erro ao entrar " + erro)
                if (erro.code === 'auth/weak-password') {
                    return handleWarnLogin()
                }

            })
    }

    async function existingUser() {
        await signInWithEmailAndPassword(auth, email, senha)
            .then((value: any) => {
                navigate("/home", { replace: true });
                setUserDetail({
                    uid: value.user.uid,
                    email: value.user.email,
                })
                setUser(true);

                setEmail('')
                setSenha('')
            })

            .catch((erro: any) => {
                console.log("Erro ao entrar " + erro)
            })
    }

    // async function logOut() {
    //     await signOut(auth)
    //     setUser(false)
    //     setUserDetail({})
    // }
    // {
    //    
    //             <div className="btn-logout-container">
    //                 <button onClick={() => logOut()}>
    //                     Logout
    //                 </button>
    //             </div>
    useEffect(() => {
        async function checkLogin() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(true);
                    setUserDetail({
                        uid: user.uid,
                        email: user.email,
                    })
                } else {
                    setUser(false)
                    setUserDetail({})
                }
            })
        }
        checkLogin()
    }, [])


    return (
        <section>
            <div className="login-container">
                <h1>Projeto TypeScript + FireBase</h1> <br />
                <h2>Entrar/Login</h2>
                <div className="field-container">
                    <label> E-mail: </label>
                    <input type="text" placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="field-container">
                    <label>Senha: </label>
                    <input type="text" placeholder='Digite sua senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>
                <button onClick={() => newUser()}>
                    Cadastrar
                </button>
                <button onClick={() => existingUser()}>
                    Login
                </button>

            </div>
        </section>
    )
}

export default Login