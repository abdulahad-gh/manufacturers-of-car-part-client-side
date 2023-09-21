import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase-init';
import useAdmin from '../../Hooks/useAdmin';

const RequireUser = ({ children }) => {
    const [user, loading] = useAuthState(auth)
    const location = useLocation()
    if (loading) {
        return

    }
    if (!user) {
        signOut(auth)
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default RequireUser;