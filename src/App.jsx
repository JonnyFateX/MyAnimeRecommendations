import React from 'react'
import Welcome from './pages/Welcome/Welcome'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import AuthRequired from './components/AuthRequired'

import { Routes, Route, BrowserRouter } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route element={<AuthRequired/>}>
          <Route path='home' element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )

}
