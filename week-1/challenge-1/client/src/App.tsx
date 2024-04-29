import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AddDetails } from "./pages/AddDetails"
import { GetDetails } from "./pages/GetDetails"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddDetails/>}/>
        <Route path="/getData" element={<GetDetails/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
