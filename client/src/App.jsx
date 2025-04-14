import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signin from './Signin';
import Orders from './Manager/Orders'
import Navbar from './Manager/Navbar'
import PackedOrders from './Manager/PackedOrders';
import StockChecked from './Manager/StockChecked';
import ManagerLayout from './Manager/ManagerLayout';
import PackingLayout from './Packing/PackingLayout';
import ApprovedOrders from './Packing/ApprovedOrders';
import PackingHistory from './Packing/PackingHistory';
import DeliveryLog from './Transport/DeliveryLog';
import DispatchList from './Transport/DispatchList';
import TransportLayout from './Transport/TransportLayout';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route element={<ManagerLayout />}>
          <Route path="/Manager/orders" element={<Orders />} />
          <Route path="/Manager/stock-check" element={<StockChecked />} />
          <Route path="/Manager/packed-orders" element={<PackedOrders />} />
      </Route>
      <Route element={<PackingLayout />}>
          <Route path="/Packing/approved" element={<ApprovedOrders />} />
          <Route path="/Packing/history" element={<PackingHistory />} />
      </Route>
      <Route element={<TransportLayout />}>
          <Route path="/Transport/dispatch" element={<DispatchList />} />
          <Route path="/Transport/delivery" element={<DeliveryLog />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
