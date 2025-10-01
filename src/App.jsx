import './App.css'
import { AppRouted } from './components/Routes' 
import { ConfigProvider } from './contexts/Configs'

function App() {
  
  return (
    <ConfigProvider>
      <AppRouted/>
    </ConfigProvider>
  )
}

export default App
