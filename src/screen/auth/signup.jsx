import { Image, Text, TouchableOpacity, View, TextInput, Pressable } from "react-native"
import { API_URL} from 'react-native-dotenv'
import { useNavigation } from "@react-navigation/native"

import startStyle from '../../styles/start'
import authStyle from '../../styles/auth'
import { useState } from "react"
import axios from "axios"
import Loader from "../../components/Loader"
import { Toast } from "react-native-toast-message/lib/src/Toast"

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordWarn, setPasswordWarn] = useState(false)
    const [hidePassword, setHidePassword] = useState(true)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()

    const register = async () => {
        try {
            if (password.length < 8) {
                return setPasswordWarn(true)
            }
            setPasswordWarn(false)
            setIsLoading(true)
            const body = {
                email,
                password,
                phoneNumber
            }
            const url = `${API_URL}/auth/register`;
            const result = await axios.post(url, body)
            Toast.show({
                type: 'success',
                text1: result.data.msg
            });
            setTimeout(() => {
                navigation.navigate('login')
            }, 2000)
            setEmail('')
            setPassword('')
            setPhoneNumber('')
        } catch (error) {
            // console.log(error);
            Toast.show({
                type: 'error',
                text1: error.response.data.msg
            });
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <View style={startStyle.background}>
            <View style={authStyle.upView}>
                <Image source={require('../../assets/images/sign-up.png')} style={startStyle.image} />
            </View>
            <View style={authStyle.bottomView}>
                <View style={authStyle.textView}>
                    <TextInput placeholder="Enter your email address" value={email} keyboardType="email-address" placeholderTextColor={'#8a8a8a'} style={authStyle.inputText} onChangeText={(text) => setEmail(text)} />
                    <View style={passwordWarn ? authStyle.passwordWarn : authStyle.passwordWrap}>
                        <TextInput secureTextEntry={hidePassword} value={password} placeholder="Enter your password" placeholderTextColor={'#8a8a8a'} style={authStyle.inputPassword} onChangeText={text => setPassword(text)} />
                        <Pressable onPress={() => hidePassword ? setHidePassword(false) : setHidePassword(true)}>
                            <Image source={require('../../assets/icons/eye.png')} style={hidePassword ? {display: 'none'} : authStyle.eye } />
                            <Image source={require('../../assets/icons/eye-crossed.png')} style={hidePassword? authStyle.eye : {display: 'none'}} />
                        </Pressable>
                    </View>
                    <Text style={passwordWarn ? {color: '#e32929', fontSize: 14} : {display: 'none'}}>Password must have 8 character</Text>
                    <TextInput placeholder="Enter your phone number" value={phoneNumber} placeholderTextColor={'#8a8a8a'} keyboardType="numeric" style={authStyle.inputText} onChangeText={(text) => setPhoneNumber(text)} />
                </View>
                <View style={email && password && phoneNumber ? {display: 'none'} : authStyle.fakeButton}>
                    <Text style={authStyle.fakeTextButton}>Create Account</Text>
                </View>
                <TouchableOpacity style={email && password && phoneNumber ? authStyle.signupBtn : {display: 'none'}} onPressOut={register}>
                    {isLoading ? <Loader.ButtonLoader isLoading={isLoading}/> : 
                    <Text style={startStyle.textButton}>Create Account</Text>}
                    
                </TouchableOpacity>
            </View>
            <Toast
                position='top'
                bottomOffset={20}
            />
        </View>
    )
}

export default SignUp