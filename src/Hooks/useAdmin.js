import { useEffect, useState } from "react"

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);
    const [loadAdmin, setLoadAdmin] = useState(true);
    useEffect(() => {
        const email = user?.email;
        if (email) {
            fetch(`https://manufacturers-of-car-part-server.up.railway.app/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    setAdmin(data.admin);
                    setLoadAdmin(false);
                })
        }
    }, [user])

    return [admin, loadAdmin]
}

export default useAdmin;