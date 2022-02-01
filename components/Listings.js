import React, { useContext, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import routes from '../navigation/routes';
import { db } from '../firebase';
import AuthContext from '../auth/context';

function Listing({listingData}) {
  const navigation = useNavigation();

  function onPress() {
      navigation.push(routes.LISTING_DETAILS, { listingData: listingData });
  }

  return (
      <TouchableOpacity onPress={onPress} style={{flex: 1, maxWidth: '33%', maxHeight: 150, borderColor: 'white', borderWidth: 1 }}>
          <Image 
          source={{
            uri: listingData.images[0].url
          }}
          resizeMode={'cover'} 
          style={{ maxWidth: '100%', height: '100%' }} />
      </TouchableOpacity>
  )
}

export default function Listings() {
    const [listings, setListings] = useState([]);
    const { user } = useContext(AuthContext);
    
    useEffect(() => {
      const subscriber = db.collection("listings").where("uid", "==", user.uid).orderBy("createdAt", "desc").onSnapshot((snapshot) => {
        const tempListings = [];
        snapshot.forEach(doc => {
          tempListings.push({...doc.data(), id: doc.id});
        })
        setListings(tempListings);
      })

      return subscriber
    }, [])

    return (
        <>
          <FlatList
            data={listings}
            renderItem={(data) => (<Listing listingData={data.item}/>)}
            keyExtractor={(item) => item.id}
            numColumns={3}
            horizontal={false}
          />
        </>
      );
}

const styles = StyleSheet.create({})
