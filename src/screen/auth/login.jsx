import { Image, Pressable, Text, TextInput, TouchableOpacity, View, } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { API_URL } from 'react-native-dotenv'
import messaging from '@react-native-firebase/messaging';

import startStyle from '../../styles/start'
import authStyle from '../../styles/auth'
import googleIcon from '../../assets/icons/google.png'
import { useState } from "react"
import Loader from "../../components/Loader"
import axios from "axios"
import { userInfoAction } from "../../redux/slices/userInfo"
import { Toast } from "react-native-toast-message/lib/src/Toast"


const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [hidePassword, setHidePassword] = useState(true)

    const dispatch = useDispatch()

    const loginAccount = async () => {
        try {
            setIsLoading(true)
            const body = {
                email,
                password
            }
            const url = `${API_URL}/auth/login`;
            const result = await axios.post(url, body)
            dispatch(userInfoAction.submitToken(result.data.token))
            dispatch(userInfoAction.submitAvatar(result.data.profilePict))
            dispatch(userInfoAction.submitUserId(result.data.id))
            dispatch(userInfoAction.submitRolesId(result.data.roles_id))
           
            await messaging().registerDeviceForRemoteMessages();
            
            const fcmToken = await messaging().getToken();
            const patchBody = {
                fcmToken
            }
            const userPatchUrl = `${API_URL}/users/${result.data.id}`
            await axios.patch(userPatchUrl, patchBody, {
                headers: {
                    'Authorization' : `Bearer ${result.data.token}`
                }
            })

            const urlProfile = `${API_URL}/users/${result.data.id}`
            const profile = await axios.get(urlProfile)
            dispatch(userInfoAction.submitAvatar(profile.data.data[0].pict_url))
            dispatch(userInfoAction.submitDisplayName(profile.data.data[0].display_name))
            dispatch(userInfoAction.submitEmail(profile.data.data[0].email))
            dispatch(userInfoAction.submitAddress(profile.data.data[0].address))
            dispatch(userInfoAction.submitPhone(profile.data.data[0].phone_number))
            Toast.show({
                type: 'success',
                text1: result.data.msg
            });

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error.response.data?.msg
            })
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <View style={startStyle.background}>
            <View style={authStyle.upLogin}>
                <Image source={require('../../assets/images/login.png')} style={startStyle.image} />
                <Text style={authStyle.upLoginText}>Log in</Text>
            </View>
            <View style={authStyle.bottomView}>
                <View style={authStyle.loginTextView}>
                    <TextInput placeholder="Enter your email address" placeholderTextColor={'#8a8a8a'} keyboardType="email-address" style={authStyle.inputText} onChangeText={text => setEmail(text)} />
                    <View style={authStyle.passwordWrap}>
                        <TextInput secureTextEntry={hidePassword}  placeholder="Enter your password" placeholderTextColor={'#8a8a8a'} style={authStyle.inputPassword} onChangeText={text => setPassword(text)} />
                        <Pressable onPress={() => hidePassword ? setHidePassword(false) : setHidePassword(true)}>
                            <Image source={require('../../assets/icons/eye.png')} style={hidePassword ? {display: 'none'} : authStyle.eye } />
                            <Image source={require('../../assets/icons/eye-crossed.png')} style={hidePassword? authStyle.eye : {display: 'none'}} />
                        </Pressable>
                    </View>
                    <Text style={authStyle.forgotPass} onPress={() => navigation.navigate('forgot')}>Forgot Password?</Text>
                </View>
                <View style={email && password ? { display: 'none' } : authStyle.fakeButton}>
                    <Text style={authStyle.fakeTextButton}>Login</Text>
                </View>
                <TouchableOpacity style={email && password ? startStyle.buttonTouch : { display: 'none' }} onPressOut={loginAccount}>
                    <Text style={startStyle.textButton}>Login</Text>
                    <Loader.ButtonLoader isLoading={isLoading} />
                </TouchableOpacity>
                <View style={authStyle.barrier}>
                    <View style={authStyle.lineBarrier}></View>
                    <Text style={authStyle.textBarrier}>or login in with</Text>
                    <View style={authStyle.lineBarrier}></View>
                </View>
                <TouchableOpacity style={authStyle.googleBtn}>
                    <Image source={googleIcon} style={authStyle.googleIcon} />
                    <Text style={authStyle.googleText}>Login with Google</Text>
                </TouchableOpacity>
            </View>
            <Toast
                position='top'
                bottomOffset={20}
            />
        </View>
    )
}

export default Login