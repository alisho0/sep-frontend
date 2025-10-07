import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'
import SepApp from './SepApp'
import { Provider } from 'react-redux'
import { store } from './app/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <SepApp />
    </Provider>
  </StrictMode>,
)
