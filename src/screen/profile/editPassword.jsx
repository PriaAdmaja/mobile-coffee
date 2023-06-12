import { View, Text, Image, TouchableOpacity, TextInput, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react'
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'
import { useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast'

import style from '../../styles/editPassword'
import navStyle from '../../styles/nav'
import Loader from '../../components/Loader';

const EditPassword = () => {
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [reNewPassword, setReNewPassword] = useState()
    const [hideOldPassword, setHideOldPassword] = useState(true)
    const [hideNewPassword, setHideNewPassword] = useState(true)
    const [hideReNewPassword, setHideReNewPassword] = useState(true)
    const [same, setSame] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()
    const { token } = useSelector(state => state.userInfo)

    const sendNewPassword = async () => {
        if (newPassword !== reNewPassword) {
            return setSame(false)
        }
        setSame(true)
        try {
            setIsLoading(true)
            const body = {
                oldPassword,
                newPassword
            }
            const url = `${API_URL}/auth`
            const result = await axios.patch(url, body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            Toast.show({
                type: 'success',
                text1: result.data.msg
            });
            setTimeout(() => {
                navigation.navigate('profile')
            }, 2000)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error.response.data.msg
            })
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <View style={style.mainView}>
            <View style={navStyle.nav}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={navStyle.arrowWrapper}>
                    <Image source={require('../../assets/icons/left.png')} />
                </TouchableOpacity>
                <Text style={navStyle.navText}>Edit Password</Text>
                <Image source={require('../../assets/icons/left.png')} style={navStyle.hidden} />
            </View>
            <View style={style.formView}>
                <View style={style.inputWrap}>
                    <Text style={style.text}>Old Password :</Text>
                    <View style={style.passwordWrap}>
                        <TextInput secureTextEntry={hideOldPassword}  placeholder="Enter your password" placeholderTextColor={'#8a8a8a'} style={style.inputPassword} onChangeText={text => setOldPassword(text)} />
                        <Pressable onPress={() => hideOldPassword ? setHideOldPassword(false) : setHideOldPassword(true)}>
                            <Image source={require('../../assets/icons/eye.png')} style={hideOldPassword ? {display: 'none'} : style.eye } />
                            <Image source={require('../../assets/icons/eye-crossed.png')} style={hideOldPassword? style.eye : {display: 'none'}} />
                        </Pressable>
                    </View>
                </View>
                <View style={style.inputWrap}>
                    <Text style={same ? style.text : style.textWarn}>New Password :</Text>
                    <View style={style.passwordWrap}>
                        <TextInput secureTextEntry={hideNewPassword}  placeholder="Enter your password" placeholderTextColor={'#8a8a8a'} style={style.inputPassword} onChangeText={text => setNewPassword(text)} />
                        <Pressable onPress={() => hideNewPassword ? setHideNewPassword(false) : setHideNewPassword(true)}>
                            <Image source={require('../../assets/icons/eye.png')} style={hideNewPassword ? {display: 'none'} : style.eye } />
                            <Image source={require('../../assets/icons/eye-crossed.png')} style={hideNewPassword? style.eye : {display: 'none'}} />
                        </Pressable>
                    </View>
                </View>
                <View style={style.inputWrap}>
                    <Text style={same ? style.text : style.textWarn}>Confirm New Password :</Text>
                    <View style={style.passwordWrap}>
                        <TextInput secureTextEntry={hideReNewPassword}  placeholder="Enter your password" placeholderTextColor={'#8a8a8a'} style={style.inputPassword} onChangeText={text => setReNewPassword(text)} />
                        <Pressable onPress={() => hideReNewPassword ? setHideReNewPassword(false) : setHideReNewPassword(true)}>
                            <Image source={require('../../assets/icons/eye.png')} style={hideReNewPassword ? {display: 'none'} : style.eye } />
                            <Image source={require('../../assets/icons/eye-crossed.png')} style={hideReNewPassword? style.eye : {display: 'none'}} />
                        </Pressable>
                    </View>
                </View>
                <Text style={same ? { opacity: 0 } : style.warn}>Check your new password</Text>
            </View>
            <View style={oldPassword && newPassword && reNewPassword ? { display: 'none' } : style.fakeBtn}>
                <Text style={style.fakeBtnText}>Change Password</Text>
            </View>
            <TouchableOpacity style={oldPassword && newPassword && reNewPassword ? style.saveBtn : { display: 'none' }} onPress={sendNewPassword}>
                {isLoading ? <Loader.ButtonLoader isLoading={isLoading} /> :
                    <Text style={style.saveText}>Change Password</Text>}
            </TouchableOpacity>
            <Toast
                position='top'
                bottomOffset={20}
            />
        </View>
    )
}

export default EditPassword