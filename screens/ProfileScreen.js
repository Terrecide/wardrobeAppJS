import React, { useContext, useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import AuthContext from '../auth/context';
import Listings from '../components/Listings';
import { auth, db } from '../firebase'

const ProfileScreen = () => {
    const { user } = useContext(AuthContext);
    const [personalListings, setPersonalListings] = useState([]);
    
    useEffect(() => {
      const subscriber = db.collection("listings").where("uid", "==", user.uid).orderBy("createdAt", "desc").onSnapshot((snapshot) => {
        const tempListings = [];
        snapshot.forEach(doc => {
          tempListings.push({...doc.data(), id: doc.id});
        })
        setPersonalListings(tempListings);
      })

      return subscriber
    }, [])

    return (
        <View>
            <Text>Profile Screen</Text>
            <Text>Усер: {user.email}</Text>
            <Button title="Изход" onPress={async () => {
                await auth.signOut()
            }}>Изход от профил</Button>
            <Listings data={personalListings}/>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})
