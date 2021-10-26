import { loadAsync } from 'expo-font';

export default useFonts = async () => {
    await loadAsync({
        'DMSerif-Italic': require('../assets/fonts/DMSerif-Italic.ttf'),
        'DMSerif-Regular': require('../assets/fonts/DMSerif-Regular.ttf'),
    });
}