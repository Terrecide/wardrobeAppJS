import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Carousel from '../components/Carousel'

export default function ListingDetailsScreen({ route }) {
    return (
        <View>
            <Carousel images={route.params.listingData.images}/>
            <Text>{route.params.listingData.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
