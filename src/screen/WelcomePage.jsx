import { Image, Text, TouchableOpacity, View } from "react-native"

import startStyle from '../styles/start'
import { useNavigation } from "@react-navigation/native"

const WelcomePage = () => {
    const navigation = useNavigation()
    return (
        <View style={startStyle.background}>
            <Text style={startStyle.startTitle}>Welcome!</Text>
            <Text style={startStyle.startDescription}>Get a cup of coffee for free only for new user</Text>
            <Image source={require('../assets/images/welcome.png')} style={startStyle.image} />
            <TouchableOpacity style={startStyle.buttonTouch} onPressOut={() => navigation.navigate('signup')}>
                <Text style={startStyle.textButton}>Create New Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={startStyle.secondButtonTouch} onPressOut={() => navigation.navigate('login')}>
                <Text style={startStyle.textSecondButton} >Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default WelcomePage