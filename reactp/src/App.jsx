import { useState } from 'react'
import './App.css'

function App() {
  const [inputs, setInputs] = useState([
    { firstname: '', lastname: '' }
  ])

  // Handle change for a specific input pair
  function handleChange(e, index) {
    const { name, value } = e.target
    const updatedInputs = [...inputs]
    updatedInputs[index][name] = value
    setInputs(updatedInputs)
  }

  // Add new input fields
  function handleSubmit(e) {
    e.preventDefault()
    setInputs(prev => [...prev, { firstname: '', lastname: '' }])
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {inputs.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              name="firstname"
              value={item.firstname}
              onChange={e => handleChange(e, index)}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastname"
              value={item.lastname}
              onChange={e => handleChange(e, index)}
              placeholder="Last Name"
            />
          </div>
        ))}
        <button type="submit">Add More</button>
      </form>

      <h3>Submitted Data:</h3>
      <ul>
        {inputs.map((item, index) => (
          <li key={index}>
            {item.firstname} {item.lastname}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
