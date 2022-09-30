import { Routes, Route } from 'react-router-dom'
import { Home, Compare } from './pages'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<Compare />} />
        </Routes>
    )
}

export default App