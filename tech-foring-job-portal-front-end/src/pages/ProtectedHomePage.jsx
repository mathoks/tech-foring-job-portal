import { Navigate, redirect, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


const ProtectedHomePage = ({children}) => {
 const {getUser} = useAuth()

  const user = getUser()
  

 if (!user || user === null) {
  console.log('user not logged in')
   return Navigate({to: 'auth/signin'})
 }  
 return (
    children
  )
}

export default ProtectedHomePage