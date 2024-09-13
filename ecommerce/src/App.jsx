import { BrowserRouter,Route,Routes } from "react-router-dom";
import UserLayout from "./Layout/UserLayout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
export default function App(){
    const products=[
        {title: "Product 1",price :19.90},
        {title: "Product 2",price :29.90},
        {title: "Product 3",price :39.90},
        {title: "Product 4",price :49.90},
    ]
    return (
        <BrowserRouter>

        <Routes >
            <Route path="/" element={<UserLayout/>}> 
                 <Route index element={  <HomePage/>}/>
                 <Route path="products">
              <Route index element={<ProductsPage />} />
              {/* <Route path=":id" element={<ProductDetailsPage />} />
              <Route path="subcategory" element={<HijabAccessoriesSc/>} /> */}
            </Route>
            <Route path="login">
               <Route index element={<Login />}/>
            </Route>
            <Route path="register">
               <Route index element={<RegisterPage/>}/>
            </Route>
            <Route path="cart">
                <Route index element={<Cart products={products}/>}/>
                <Route path="success" element={<OrderSuccess/>}></Route>
            </Route>
            <Route path="orders">
               <Route index element={<Orders/>}/>
            </Route>
            </Route>
            
        </Routes>
        </BrowserRouter>
    )
}