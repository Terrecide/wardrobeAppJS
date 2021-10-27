import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, fontSizes, paddings } from '../config/styles'
import routes from '../navigation/routes'

const WelcomeScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{justifyContent: 'space-around', flexDirection: 'column', flex: 1}}>
            <View style={styles.container}>
                <Text style={[{fontSize: fontSizes.xl, color: colors.black}, {fontFamily: 'DMSerif-Italic'}]}>Wardrobe</Text>
                <Text>КУПИ. ПРОДАЙ.</Text>
                <Text>НАМЕРИ НОВ УНИКАЛЕН СТИЛ.</Text>
            </View>
            <View style={styles.container}>
                <Text style={[{fontSize: fontSizes.regular}, styles.textMedium]}>Вече имате профил?</Text>
                <TouchableOpacity style={styles.buttonPrimary} title="Login" onPress={() => navigation.push(routes.LOGIN)}>
                    <Text style={styles.buttonPrimaryText}>Вход</Text>
                </TouchableOpacity>
                <Text style={[{fontSize: fontSizes.regular, marginTop: paddings.regular}, styles.textMedium]}>Все още нямате профил?</Text>
                <TouchableOpacity style={styles.buttonSecondary} title="Register" onPress={() => navigation.push(routes.PHONE_VERIFICATION)}>
                    <Text style={styles.buttonSecondaryText}>Регистрация</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    textMedium: {
        color: colors.medium
    },
    buttonPrimary: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black,
        paddingVertical: paddings.small,
        borderRadius: 2
    },
    buttonPrimaryText: {
        color: colors.white,
        fontSize: fontSizes.large,
        fontWeight: 'bold'
    },
    buttonSecondary: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        paddingVertical: paddings.small,
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 2
    },
    buttonSecondaryText: {
        color: colors.black,
        fontSize: fontSizes.large,
        fontWeight: 'bold'
    },
})
