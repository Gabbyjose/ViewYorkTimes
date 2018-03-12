import React from 'react'
import { Link } from 'react-router-dom'

import Routes from './routes'


const App = () => {
  return (
    <div>
      <Link to="/home"><h1>View Your Times</h1></Link>
      <hr />
      <Routes />

    </div>
  )
}

export default App
