import firebase from 'firebase/app';

const getUser = () => {
    const user = firebase.auth().currentUser;
    
    if (user) {
      return user
    } else {
      return null
    }
}

export default { getUser }