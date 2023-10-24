import { Routes, Route } from 'react-router-dom'
import Navigation from './components/routes/navigation-bar/navigation-bar.component'
import Home from "./components/routes/home/home.component"
import Shop from './components/routes/shop/shop.component'
import Authentication from './components/routes/authenticate/authentication.component'




const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        {/*<Outlet />*/}
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='authentication' element={<Authentication />} />
      </Route>
    </Routes>
  )
}
export default App;
