import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Listings from '../components/Listings';
import { db } from '../firebase';

const HomeScreen = () => {
    const [listings, setListings] = useState([]);
    
    useEffect(() => {
      const subscriber = db.collection("listings").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
        const tempListings = [];
        snapshot.forEach(doc => {
          tempListings.push({...doc.data(), id: doc.id});
        })
        setListings(tempListings);
      })

      return subscriber
    }, [])

    return (
        <SafeAreaView>
            <Listings data={listings}/>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
