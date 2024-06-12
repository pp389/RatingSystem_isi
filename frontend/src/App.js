import React from 'react'
import {LoginPage} from './logging/LoginPage';
import {RegisterPage} from './logging/RegisterPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {EntryPage } from './EntryPage.js';
import {FindServices} from './ratingAppPages/FindServices';
import {UserMainMenu} from './UserPages/UserMainMenu'
import {AdminMainMenu} from './UserPages/AdminMainMenu'
import {Contact} from './UserPages/Contact'
import {Help} from './UserPages/Help'

export const App = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={<EntryPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/findServices" element={<FindServices/>}/>
                <Route path="/userMainMenu" element={<UserMainMenu/>}/>
                <Route path="/adminMainMenu" element={<AdminMainMenu/>}/>
                <Route path="/help" element={<Help/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>
        </Router>
    </div>
  )
}
