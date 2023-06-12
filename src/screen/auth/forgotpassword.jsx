import { Image, Text, TouchableOpacity, View, TextInput, Pressable } from "react-native"
import { useState } from 'react'
import axios from "axios";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Loader from "../../components/Loader";
import { API_URL } from 'react-native-dotenv';
import { useNavigation } from "@react-navigation/native";

import startStyle from '../../styles/start';
import authStyle from '../../styles/auth'
import editStyle from "../../styles/editPassword"

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState()
    const [send, setSend] = useState(false)
    const [same, setSame] = useState(true)
    const [otp, setOtp] = useState()
    const [newPassword, setNewPassword] = useState()
    const [hideNewPassword, setHideNewPassword] = useState(true)
    const [reNewPassword, setReNewPassword] = useState()
    const [hideReNewPassword, setHideReNewPassword] = useState(true)
    const navigation = useNavigation()

    const sendEmail = async () => {
        try {
            setIsLoading(true)
            const url = `${API_URL}/auth/forgotpassword/${email}`;
            const result = await axios.patch(url)
            Toast.show({
                type: 'success',
                text1: result.data.msg
            });
            setSend(true)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error.response.data.msg
            });
        } finally {
            setIsLoading(false)
        }
    }

    const sendNewPassword = async () => {
        if (newPassword !== reNewPassword) {
            return setSame(false)
        }
        setSame(true)
        try {
            setIsLoading(true)
            const body = {
                email,
                otp,
                newPassword
            }
            console.log(body);
            const url = `${API_URL}/auth/verifyOtp`
            const result = await axios.patch(url, body)
            Toast.show({
                type: 'success',
                text1: result.data.msg
            });
            setTimeout(() => {
                navigation.navigate('login')
            }, 2000)
        } catch (error) {
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
            <View style={send ? { display: 'none' } : { flex: 1 }}>
                <Text style={authStyle.startTitle}>Don't Worry!</Text>
                <Text style={startStyle.startDescription}>Enter your email adress to get reset password link</Text>
                <Image source={require('../../assets/images/forgot-password.png')} style={startStyle.image} />
                <TextInput placeholder="Enter your email address" placeholderTextColor={'#8a8a8a'} keyboardType="email-address" style={send ? { display: 'none' } : authStyle.inputText} onChangeText={text => setEmail(text)} />
                <Text style={send ? authStyle.textForgot : { opacity: 0 }}>Haven’t received any link?</Text>
                <View style={email ? { display: 'none' } : editStyle.fakeBtn}>
                    <Text style={editStyle.fakeBtnText}>Change Password</Text>
                </View>
                <TouchableOpacity style={email ? startStyle.buttonTouch : { display: 'none' }} onPress={sendEmail}>
                    <Text style={startStyle.textButton}>{send ? 'Resend Link' : 'Send Link'}</Text>
                    <Loader.ButtonLoader isLoading={isLoading} />
                </TouchableOpacity>
            </View>
            <View style={send ? { flex: 1 } : { display: 'none' }}>
                <View style={editStyle.formView}>
                    <View style={editStyle.inputWrap}>
                        <Text style={editStyle.text}>OTP :</Text>
                        <TextInput placeholder='Input your OTP code' placeholderTextColor={'#8a8a8a'} style={authStyle.inputText} onChangeText={text => setOtp(text)} />
                    </View>
                    <View style={editStyle.inputWrap}>
                        <Text style={same ? editStyle.text : editStyle.textWarn}>New Password :</Text>
                        <View style={authStyle.passwordWrap}>
                            <TextInput secureTextEntry={hideNewPassword} placeholder="Enter your password" placeholderTextColor={'#8a8a8a'} style={authStyle.inputPassword} onChangeText={text => setNewPassword(text)} />
                            <Pressable onPress={() => hideNewPassword ? setHideNewPassword(false) : setHideNewPassword(true)}>
                                <Image source={require('../../assets/icons/eye.png')} style={hideNewPassword ? { display: 'none' } : authStyle.eye} />
                                <Image source={require('../../assets/icons/eye-crossed.png')} style={hideNewPassword ? authStyle.eye : { display: 'none' }} />
                            </Pressable>
                        </View>
                    </View>
                    <View style={editStyle.inputWrap}>
                        <Text style={same ? editStyle.text : editStyle.textWarn}>Confirm New Password :</Text>
                        <View style={authStyle.passwordWrap}>
                            <TextInput secureTextEntry={hideReNewPassword} placeholder="Enter your password" placeholderTextColor={'#8a8a8a'} style={authStyle.inputPassword} onChangeText={text => setReNewPassword(text)} />
                            <Pressable onPress={() => hideReNewPassword ? setHideReNewPassword(false) : setHideNewPassword(true)}>
                                <Image source={require('../../assets/icons/eye.png')} style={hideReNewPassword ? { display: 'none' } : authStyle.eye} />
                                <Image source={require('../../assets/icons/eye-crossed.png')} style={hideReNewPassword ? authStyle.eye : { display: 'none' }} />
                            </Pressable>
                        </View>
                    </View>
                    <Text style={same ? { opacity: 0 } : editStyle.warn}>Check your new password</Text>
                </View>
                <View style={newPassword && reNewPassword ? { display: 'none' } : editStyle.fakeBtn}>
                    <Text style={editStyle.fakeBtnText}>Change Password</Text>
                </View>
                <TouchableOpacity style={newPassword && reNewPassword ? editStyle.saveBtn : { display: 'none' }} onPress={sendNewPassword}>
                    {isLoading ? <Loader.ButtonLoader isLoading={isLoading} /> :
                        <Text style={editStyle.saveText}>Change Password</Text>}
                </TouchableOpacity>
            </View>
            <Toast
                position='top'
                bottomOffset={20}
            />
        </View>
    )
}

export default ForgotPassword