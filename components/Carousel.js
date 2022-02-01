import React from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import Constants from 'expo-constants';
import { colors } from '../config/styles';

const { width } = Dimensions.get('window');
const height = width * 0.8;

const Carousel = ({images}) => {
    if (!images) {
        return null;
    }

    let scrollX = new Animated.Value(0);
    // position will be a value between 0 and photos.length - 1 assuming you don't scroll pass the ends of the ScrollView
    let position = Animated.divide(scrollX, width);

    return (
        <View
          style={styles.scrollContainer}
        >
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                // the onScroll prop will pass a nativeEvent object to a function
                onScroll={Animated.event( // Animated.event returns a function that takes an array where the first element...
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }], {useNativeDriver: false} // ... is an object that maps any nativeEvent prop to a variable
                )} // in this case we are mapping the value of nativeEvent.contentOffset.x to scrollX
                scrollEventThrottle={16} // this will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call
            >
                {images.map((image, i) => (
                    <Image key={i} style={styles.image} resizeMode={'stretch'} source={{ uri: image.url }} />
                ))}
            </ScrollView>
            <View style={styles.dotContainer}>
                {images.map((_, i) => {
                    if (images.length <= 1) {
                        return null;
                    }
                    let opacity = position.interpolate({
                        inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                        outputRange: [0.4, 1, 0.4], // when position is not i, the opacity of the dot will animate to 0.3
                        extrapolate: 'clamp' // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
                    });
                    return (
                        <Animated.View key={i} style={{...styles.dot, opacity}}/>
                    )}
                )} 
            </View>
        </View>
    );
};

export default Carousel;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Constants.statusBarHeight,
    },
    scrollContainer: {
        height,
        position: 'relative'
    },
    image: {
      width,
      height,
    },
    dotContainer: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    dot: {
        marginRight: 5,
        borderColor: colors.secondary,
        borderWidth: 4,
        borderRadius: 10,
    }
});
