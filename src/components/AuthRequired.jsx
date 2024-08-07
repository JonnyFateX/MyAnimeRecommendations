import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import { currentUser } from "../auth/auth"

export default function AuthRequired() {
    const user = currentUser()
    
    if (!user) {
        return (
            <Navigate 
                to="/login" 
                replace
            />)
    }
    return <Outlet />
}