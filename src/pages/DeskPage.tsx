import { Navigate } from 'react-router-dom'
import IDesk from '../features/desk/desk'
import { useAuthRedirect } from '../app/hooks'

const DeskPage = () => {

  const { loggedIn } = useAuthRedirect()
  return (
    <>
    { loggedIn &&
      <Navigate to="/profile" replace={true} />
    }
    <IDesk />
    </>
  )
}


export default DeskPage
