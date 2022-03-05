import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Text from '../components/Text'
import Carousel from '../components/Carousel'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing } from '../config/styles'
import AppButton from '../components/Button'
import { db, fireStoreFieldValue } from '../firebase'
import AuthContext from '../auth/context'

export default function ListingDetailsScreen({ route }) {
    const { user } = useContext(AuthContext);
    const [likes, setLikes] = useState({})

    useEffect(() => {
        onInit()
    }, []);

    const onInit = async () => {
        const likesDoc = await db.collection('likes').doc(route.params.listingData.id).get();
        if (likesDoc.exists) {
            const data = await likesDoc.data()
            setLikes(data)
        } else {
            setLikes({})
        }
    }

    async function handleLikePost() {
        // if post is already liked delete like else like it
        if(likes[user.uid]) {
            // doesnt update on object change
            await db.collection('likes').doc(route.params.listingData.id).update({[user.uid]: fireStoreFieldValue.delete()})
            let copyLikes = {...likes};
            delete copyLikes[user.uid]
            setLikes(copyLikes)
        } else {
            const data = { [user.uid]: true}
            await db.collection('likes').doc(route.params.listingData.id).set(data, { merge: true })
            setLikes({...likes, ...data})
        }
    }

    return (
        <View>
            <Carousel images={route.params.listingData.images}/>
            <View style={{padding: spacing.small}}>
                <View style={styles.utilityBar}>
                    <Ionicons onPress={handleLikePost}
                        name={likes[user.uid] ? "heart" : "heart-outline"}
                        size={35} 
                        color={likes[user.uid] ? colors.danger : colors.black}/>
                    <AppButton style={{minWidth: '30%', paddingVertical: spacing.none, paddingHorizontal: spacing.none }} title={'Купи'}/>
                </View>
                <Text style={{paddingBottom: spacing.xs}}><Text style={{fontWeight: 'bold'}}>{likes ? Object.keys(likes).length : 0} души</Text> са го харесали</Text>
                <Text>{route.params.listingData.name}</Text>
                <Text>{route.params.listingData.description}</Text>
                <Text>{route.params.listingData.id}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    utilityBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: spacing.small
    }
})
