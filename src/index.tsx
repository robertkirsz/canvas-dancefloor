import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'

const render = () => {
  const App = require('components/App').default
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()

// Reuse components tree if any component is recompiled during hot-reloading
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('components/App', render)
}
