import {Routes, Route} from "react-router-dom"
import {Container} from "react-bootstrap"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import {History} from "./pages/orderHistory"
import {RatePage} from "./pages/Rate"
import {About} from "./pages/About"
import { Register } from "./pages/Register"

import { Header } from "./component/Header"
import {Footer} from "./component/Footer"

import {ShoppingCartProvider} from "./context/shoppingCartContext"

function App() {
  return (
    <ShoppingCartProvider>
      <Header/>
      <Container className="mb-4">
        <Routes>
          <Route path="/" element ={<Home/>}/>
          <Route path="/login" element ={<Login/>}/>
          <Route path="/History" element ={<History/>}/>
          <Route path="/Rate" element ={<RatePage/>}/>
          <Route path="/About" element ={<About/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Container>
      <Footer/>
    </ShoppingCartProvider>
  )
}

export default App
