import { auth } from '../firebase'

const getUser = () => {
    const user = auth.currentUser;
    
    if (user) {
      return user
    } else {
      return null
    }
}

export default { getUser }