import React from 'react'
import { FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import routes from '../navigation/routes';

function Listing({listingData}) {
  const navigation = useNavigation();

  function onPress() {
      navigation.navigate(routes.LISTING_DETAILS, { listingData: listingData });
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

export default function Listings({data}) {
    return (
        <>
          <FlatList
            data={data}
            renderItem={(data) => (<Listing listingData={data.item}/>)}
            keyExtractor={(item) => item.id}
            numColumns={3}
            horizontal={false}
          />
        </>
      );
}

const styles = StyleSheet.create({})
