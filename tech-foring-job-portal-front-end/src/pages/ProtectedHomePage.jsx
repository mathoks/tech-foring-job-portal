import { useLoaderData, Navigate } from 'react-router-dom'
import axios from 'axios'

const baseUrl = 'https://tech-foring-job-portal-1.onrender.com'
export const checkAuth = async() => {
  const user = axios.get(`${baseUrl}/api/v1/auth/check-islogIn`, {withCredentials: true}).then((res) => {
    return res.data}).catch((err) => {
      return null
    })
    return user
  }

const ProtectedHomePage = ({children}) => {
 const user = useLoaderData()
  if (!user) {
    
    Navigate({to:'auth/signin'})
  }
 
 return (
    children
  )
}

export default ProtectedHomePage
