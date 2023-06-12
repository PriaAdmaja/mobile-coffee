import { Image, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { useSelector } from "react-redux"

import startStyle from './src/styles/start'

const GetStarted = () => {
    const navigation = useNavigation()
    const { token } = useSelector(state => state.userInfo)
    const openApp = () => {
        !token ? navigation.navigate('welcome') : navigation.navigate('tab')
    }
    return (
        <View style={startStyle.background}>
            <Text style={startStyle.startTitle}>Coffee for Everyone</Text>
            <View style={{flex: 1}}>

                <Image source={require('./src/assets/images/getstart.png')} style={startStyle.image} />
            </View>
            <TouchableOpacity style={startStyle.buttonTouch} onPressOut={openApp}>
                <Text style={startStyle.textButton}>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GetStarted