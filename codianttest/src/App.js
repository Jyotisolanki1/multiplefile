import {BrowserRouter, Route,Routes} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css'
import Header from './compoents/Header';
import Product from './compoents/Product';
import AddProduct from './compoents/AddProduct';
import Edit from './compoents/EditProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <ToastContainer/ >
       <Header/>
       <Routes>
         <Route path='/' element ={<Product />} />
         <Route path='/add' element ={<AddProduct />} />
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
