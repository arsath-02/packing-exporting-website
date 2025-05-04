import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signin from './Signin';
import Orders from './Manager/Orders'
import QualityChecked from './Manager/QualityChecked';
import ManagerLayout from './Manager/ManagerLayout';
import PackingShipping from './Manager/Packing_&_Shipping';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route element={<ManagerLayout />}>
          <Route path="/Manager/orders" element={<Orders />} />
          <Route path="/Manager/quality-check" element={<QualityChecked />} />
          <Route path="/Manager/packed-orders" element={<PackingShipping />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
