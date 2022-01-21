import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function ListingDetailsScreen({ route }) {
    return (
        <View>
            <Text>{route.params.listingData.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
