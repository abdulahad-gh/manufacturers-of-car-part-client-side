import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase-init';
import useAdmin from '../../Hooks/useAdmin';
import { Navigate,useLocation} from 'react-router-dom';
import { signOut } from 'firebase/auth';

const RequireAdmin = ({children}) => {
    const [user,userLoading] = useAuthState(auth)
    const [admin,adminLoading] = useAdmin(user)
    const location = useLocation()

    if(userLoading || adminLoading){
        return 
    }
    if(!user || !admin){
        signOut(auth)
return <Navigate to='/login' state={{from:location}} replace />
    }

    return children
}

export default RequireAdmin;