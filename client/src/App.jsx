import React from 'react'
import Login from './Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Cust_Dashboard from './Components/Customer/Cutomer-Dashboard'
import PlaceOrder from './Components/Customer/PlaceOrder'
import OrderStatus from './Components/Customer/OrderStatus'
import Manager_Dashboard from './Components/Manager/Manager-Dashboard'
import ConfirmOrders from './Components/Manager/ConfirmOrders'
import Dyeing from './Components/Manager/Dyeing'
import Production from './Components/Manager/Production'
import Packing from './Components/Manager/Packing'
import EmployeeManage from './Components/Manager/EmployeeManagement'
import Dyeing_Dashboard from './Components/Dyeing/Dyeing-Dashboard'
import Dyeing_Tasks from './Components/Dyeing/Dyeing-Task';
import TeamManage from './Components/Dyeing/Team-manage'
import Prod_Dashboard from './Components/Production/Prod-Dashboard';
import CuttingTasks from './Components/Production/CuttingTasks'
import StitchingTasks from './Components/Production/StichingTasks'
import TeamManagement from './Components/Production/TeamManagement'
import Quality_Dashboard from './Components/Quality/Quality-Dashboard';
import QualityCheck from './Components/Quality/QualityCheck'
import Q_Packing from './Components/Quality/Q-Packing'
import Hr_Dashboard from './Components/Hr/Hr-dashboard'
import Emp_dir from './Components/Hr/Employee-dir'
import Attendance from './Components/Hr/Attendance'
import RegisterPage from './Register'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/Customer/dashboard" element={<Cust_Dashboard />} />
        <Route path="/Customer/place-order" element={<PlaceOrder />}/>
        <Route path="/Customer/order-status" element={<OrderStatus />} />

        <Route path="/Manager/dashboard" element={<Manager_Dashboard />} />
        <Route path="/Manager/confirm-order" element={<ConfirmOrders/>} />
        <Route path="/Manager/dyeing" element={<Dyeing />} />
        <Route path="/Manager/production" element={<Production />} />
        <Route path="/Manager/packing" element={<Packing />} />
        <Route path="/Manager/employee-manage" element={<EmployeeManage />} />

        <Route path="/Dyeing/dashboard" element={<Dyeing_Dashboard />} />
        <Route path="/Dyeing/dyeing-task" element={<Dyeing_Tasks />} />
        <Route path="/Dyeing/team-manage" element={<TeamManage />} />

        <Route path="/Production/dashboard" element={<Prod_Dashboard />} />
        <Route path="/Production/cutting-task" element={<CuttingTasks />} />
        <Route path="/Production/stitching-task" element={<StitchingTasks />} />
        <Route path="/Production/team-manage" element={<TeamManagement />} />

        <Route path="/Quality/dashboard" element={<Quality_Dashboard />} />
        <Route path="/Quality/quality-check" element={<QualityCheck />} />
        <Route path="/Quality/packing" element={<Q_Packing />} />

        <Route path='/Hr/dashboard' element={<Hr_Dashboard />} />
        <Route path="/Hr/employee-dir" element={<Emp_dir />} />
        <Route path="/Hr/attendance" element={<Attendance />} />
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
