import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes/index.tsx';

function App() {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  )
}

export default App