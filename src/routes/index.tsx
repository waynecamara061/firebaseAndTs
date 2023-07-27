import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Registrar from '../pages/registar/Registrar';
import Admin from '../pages/Admin/Admin';
import Private from './Private';

function index() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Registrar />} />
            <Route path='/admin' element={<Private> <Admin /> </Private>} />
        </Routes>
    )
}

export default index