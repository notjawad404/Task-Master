import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AddTask from './components/AddTask'
import TaskMaster from './components/TaskMaster'

function App() {

  return (
   
   <div className="">
    <Router>
      <Routes>
        <Route path="/add" element={<AddTask />} />
        <Route path="/" element={<TaskMaster />} />
      </Routes>
    </Router>
   </div>
   
  )
}

export default App
