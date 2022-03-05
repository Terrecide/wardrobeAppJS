import React, { useCallback, useState } from 'react'
import { debounce } from "lodash";
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextInput from '../components/TextInput'
import Listings from '../components/Listings';
import { db } from '../firebase';
import AppText from '../components/Text';
import { colors, spacing } from '../config/styles';

const SearchScreen = () => {
    const [listings, setListings] = useState([]);
    const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

    async function handleDebounceFn(inputValue) {
        try {
            const dataName = await db.collection('listings').where("name", ">=", inputValue).where("name", "<=", inputValue + "\uf8ff").get();
            const dataDescription = await db.collection('listings').where("description", ">=", inputValue).where("description", "<=", inputValue + "\uf8ff").get();
            const isDataNameNotEmpty = !dataName.empty;
            const isDataDescriptionNotEmpty = !dataDescription.empty;
            
            if (isDataNameNotEmpty || isDataDescriptionNotEmpty) {
                const tempListings = [];

                if(isDataNameNotEmpty) {
                    dataName.forEach(doc => {
                        tempListings.push({...doc.data(), id: doc.id});
                    })

                    if(isDataDescriptionNotEmpty) {
                        dataDescription.forEach(doc => {
                            if(!tempListings.find(listing => listing.id === doc.id)) {
                                tempListings.push({...doc.data(), id: doc.id});
                            }
                        })
                    }
                } else if (isDataDescriptionNotEmpty) {
                    dataDescription.forEach(doc => {
                        tempListings.push({...doc.data(), id: doc.id});
                    })
                }

                setListings(tempListings);
            } else {
                setListings([])
            }
        } catch (error) {
            console.log(error)
            setListings([])
        }
    }

    function handleSearch(value) {
        debounceFn(value)
    };

    return (
        <SafeAreaView>
            <View style={{padding: spacing.small}}>
                <TextInput
                    icon="magnify"
                    placeholder="Търси"
                    width='70%'
                    onChangeText={value => handleSearch(value)}
                />
            </View>
            <View style={{
                    height: 0.5,
                    backgroundColor: colors.darkgrey,
                    alignSelf: 'stretch',
                    opacity: 0.3
                    }} 
            />
            {listings.length > 0 ? 
                (   
                    <Listings data={listings}/>
                ) : (
                    <AppText style={{fontSize: spacing.large, fontWeight: 'bold', textAlign: 'center'}}>Потърси директно или филтрирай за резултати!</AppText>
                )
            }
            
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({})
