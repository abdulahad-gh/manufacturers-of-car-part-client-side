import { useEffect, useState } from "react"

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);
    const [loadAdmin, setLoadAdmin] = useState(true);
    useEffect(() => {
        const email = user?.email;
        if (email) {
            fetch(`https://fair-gold-bull-tam.cyclic.app/user/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                     
                    if(data.status){
                        setAdmin(true);
                        setLoadAdmin(false)
                    }
                    else{
                        setAdmin(false)
                        setLoadAdmin(false)
                    }
                    // setLoadAdmin(false);
                })
        }
    }, [user])

    return [admin,loadAdmin]
}

export default useAdmin;