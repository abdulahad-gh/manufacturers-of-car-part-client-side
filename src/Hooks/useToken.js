import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import auth from "../firebase-init"

const       useToken = user => {
    const [token, setToken] = useState('')
console.log(user)


    useEffect(() => {
        const email = user?.user?.email;
        const currentUser = {email}
        if (email) {
            fetch(`
            
            https://fair-gold-bull-tam.cyclic.app/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
             
                    console.log(data)
                    const accessToken = data.data.token;
                    console.log(accessToken)
                    localStorage.setItem('accessToken', accessToken)
                    setToken(accessToken)
                })
                .catch(err => {
                    console.log(err)
                })


        }
    }, [user?.user?.email])
    return [token]
}

export default useToken