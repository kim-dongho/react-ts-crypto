import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Coin from './Coin';
import Coins from './Coins';

interface IRouterProps {}

const Router = ({}: IRouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:coinID/*' element={<Coin />}></Route>
        <Route path='/' element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
