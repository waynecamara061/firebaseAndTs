import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

export default function Private({ children }: any) {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function checkLogin() {
            const unsub = onAuthStateChanged(auth, (user: any) => {
                console.log(user)
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    }

                    localStorage.setItem("@detailUser", JSON.stringify(userData))
                    setLoading(false)
                    setSigned(true)

                } else {
                    setLoading(false)
                    setSigned(false)
                }
            })
        }

        checkLogin()
    }, []);

    if (loading) {
        return (
            <div> </div>
        )
    }

    if (!signed) {
        navigate("/");
    }

    return children;
}