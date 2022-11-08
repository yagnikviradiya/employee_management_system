import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import Employees from './container/Employees';
import UpdateEmployee from './container/UpdateEmployee';
import AddEmployee from './container/AddEmployee';

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='employee/update/:id' element={<UpdateEmployee/>}/>
        <Route path='/add' element={<AddEmployee/>}/>
        <Route path="/" element={<Navigate replace to="/employees"/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes