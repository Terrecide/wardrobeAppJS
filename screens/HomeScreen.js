import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Listings from '../components/Listings';

const HomeScreen = () => {

    return (
        <SafeAreaView>
            <Listings />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
