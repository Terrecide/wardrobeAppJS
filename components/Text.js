import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { defaultText } from '../config/styles'

const AppText = ({ children, style}) => {
    return (
        <Text style={[defaultText, style]}>
            {children}
        </Text>
    )
}

export default AppText

const styles = StyleSheet.create({})
