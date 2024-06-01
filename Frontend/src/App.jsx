import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AddTask from './components/AddTask'
import TaskMaster from './components/TaskMaster'
import SignUp from './components/Auth/SignUp'

function App() {

  return (
   
   <div className="">
    <Router>
      <Routes>
        <Route path="/add" element={<AddTask />} />
        <Route path="/" element={<TaskMaster />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
   </div>
   
  )
}

export default App
