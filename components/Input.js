import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AppInput = () => {
    return (
        <View>
            <TextInput 
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
        </View>
    )
}

export default AppInput

const styles = StyleSheet.create({})
