import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppButton from '../components/Button'
import AppText from '../components/Text'
import { colors, fontSizes, spacing } from '../config/styles'
import routes from '../navigation/routes'

const WelcomeScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{justifyContent: 'space-around', flexDirection: 'column', flex: 1}}>
            <View style={styles.container}>
                <AppText style={[{fontSize: fontSizes.xl, color: colors.black}, {fontFamily: 'DMSerif-Italic'}]}>Wardrobe</AppText>
                <AppText>КУПИ. ПРОДАЙ.</AppText>
                <AppText>НАМЕРИ НОВ УНИКАЛЕН СТИЛ.</AppText>
            </View>
            <View style={styles.container}>
                <AppText>Вече имате профил?</AppText>
                <AppButton onPress={() => navigation.push(routes.LOGIN)} title="Вход"/>
                <AppText style={[{marginTop: spacing.regular}]}>Все още нямате профил?</AppText>
                <AppButton onPress={() => navigation.push(routes.PHONE_VERIFICATION)} type="secondary" title="Регистрация"/>
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
})
