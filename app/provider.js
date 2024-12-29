"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import React, { useEffect } from 'react'

function Provider({children}) {
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            CheckIsNewUser();
        }
    }, [user]);

    const CheckIsNewUser = async () => {
        try {
            const resp = await axios.post('/api/create-user', { user: user });
            console.log('User check/creation response:', resp.data);
        } catch (error) {
            console.error('Error checking/creating user:', error);
        }
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default Provider