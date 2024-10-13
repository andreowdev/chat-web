import Login from "./components/login/login"
import './style.css'
import { UserProvider } from "./components/contextAPI/UserContextLogin.jsx"

function App() {


  return (
    <>
    <UserProvider>
    < section className="container">
        <Login />
      </section>
    </UserProvider>
    </>
  )
}

export default App
