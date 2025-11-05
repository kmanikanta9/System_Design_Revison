import { useState } from 'react'
import './App.css'
import OTPInput from './components/OTPInput'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <OTPInput/>
    </>
  )
}

export default App
