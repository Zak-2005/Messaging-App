import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import UsersSidebar from './components/UsersSidebar'
import CurrentChat from './components/CurrentChat'
import MessageBar from './components/MessageBar'
import ChatsSidebar from './components/ChatsSidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container'>
      <ChatsSidebar />
      <div className='mainPage'>
      <Header />
      <CurrentChat />
      <MessageBar />
      </div>
      <UsersSidebar />
 
    </div>
  )
}

export default App
