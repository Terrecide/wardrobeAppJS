import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import routes from '../navigation/routes';

const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
    },
];

function Listing() {
  const navigation = useNavigation();

  function onPress() {
      navigation.push(routes.LISTING_DETAILS);
  }

  return (
      <TouchableOpacity onPress={onPress} style={{ maxWidth: '33%', maxHeight: 150, borderColor: 'white', borderWidth: 1 }}>
          <Image source={require('../assets/clothing_photo.jpg')} resizeMode={'stretch'} style={{ maxWidth: '100%', height: '100%' }} />
      </TouchableOpacity>
  )
}

export default function Listings() {
    return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={() => (<Listing />)}
            keyExtractor={(item) => item.id}
            numColumns={3}
            horizontal={false}
          />
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({})
