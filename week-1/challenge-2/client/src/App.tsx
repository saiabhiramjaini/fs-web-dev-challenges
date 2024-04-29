import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AddActivity } from "./pages/AddActivity"
import { GetActivities } from "./pages/GetActivities"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddActivity/>}/>
        <Route path="/getActivities" element={<GetActivities/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
