import { Routes, Route } from "react-router-dom";
import Home from "./component/routes/home/home.component";
import Navigation from "./component/routes/navigation/navigation.component";


const Shop = () => {
  return (
    <h1>Hello To the Shop Page</h1>
  );
};
const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />}/>
        <Route path='/shop' element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;