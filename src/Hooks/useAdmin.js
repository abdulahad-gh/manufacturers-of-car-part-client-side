import { useEffect, useState } from "react"

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);
    const [loadAdmin, setLoadAdmin] = useState(true);
    useEffect(() => {
        const email = user?.email;
        if (email) {
            fetch(`https://stormy-castle-37919.herokuapp.com/admin/${email}`)
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