import { View, Text, Image, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { API_URL } from 'react-native-dotenv'

import style from '../../styles/editProfile'
import navStyle from '../../styles/nav'
import Loader from '../../components/Loader'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { userInfoAction } from '../../redux/slices/userInfo'

const EditProfile = () => {
    const [profile, setProfile] = useState()
    const [dateModal, setDateModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [image, setImage] = useState('')
    const { userId, token } = useSelector(state => state.userInfo)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const thisDate = new Date()

    useEffect(() => {
        const url = `${API_URL}/users/${userId}`;
        axios.get(url).then(res => setProfile(res.data.data[0])).catch(err => console.log(err))
    }, [])

    const changeData = (key, value) => {
        const newProfile = { ...profile, [key]: value }
        setProfile(newProfile)
    }

    const openCamera = async () => {
        const options = {
            mediaType: 'photo',
            quality: 1
        }
        await launchCamera(options, res => {
            if (res.didCancel) {
                return console.log('Cancel get picture');
            }
            if (res.errorCode) {
                return console.log('Error get picture');
            }
            setImage(res.assets[0])
        })
        setShowModal(false)
    }

    const imagePicker = async () => {
        const options = {
            mediaType: 'photo',
            quality: 1
        }
        await launchImageLibrary(options, res => {
            if (res.didCancel) {
                return console.log('Cancel get picture');
            }
            if (res.errorCode) {
                return console.log('Error get picture');
            }
            setImage(res.assets[0])
        })
        setShowModal(false)
    }

    const updateProfile = async () => {
        try {
            setIsLoading(true)
            const formData = new FormData()
            if (image) {
                formData.append('image', {
                    name: image.fileName,
                    type: image.type,
                    uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', '')
                })
            }
            formData.append('displayName', profile.display_name)
            formData.append('firstName', profile.first_name)
            formData.append('lastName', profile.last_name)
            formData.append('birthDate', String(profile.birth_date).split('').slice(0, 10).join(''))
            formData.append('gender', profile.gender)
            formData.append('address', profile.address)
            const url = `${API_URL}/users/${userId}`
            const result = await axios.patch(url, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(result.data.data[0].display_name);
            Toast.show({
                type: 'success',
                text1: result.data.msg
            });
            if (result) {
                dispatch(userInfoAction.submitAvatar(result.data.data[0].pict_url))
                dispatch(userInfoAction.submitDisplayName(result.data.data[0].display_name))
                dispatch(userInfoAction.submitAddress(result.data.data[0].address))
            }
            setTimeout(() => {
                navigation.navigate('profile')
            }, 2000)
        } catch (error) {
            console.log(error.response);
            Toast.show({
                type: 'error',
                text1: error.response.data.msg
            })
            setTimeout(() => {
                if (error.response.data.msg === 'jwt expired') {
                    dispatch(userInfoAction.clearData())
                }
            }, 1000)
        } finally {
            setIsLoading(false)
        }
    }


    if (profile === undefined) return <Loader.Loader isLoading={true} />
    return (
        <View style={style.mainView}>
            <View style={navStyle.nav}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={navStyle.arrowWrapper}>
                    <Image source={require('../../assets/icons/left.png')} />
                </TouchableOpacity>
                <Text style={navStyle.navText}>Edit Profile</Text>
                <Image source={require('../../assets/icons/left.png')} style={navStyle.hidden} />
            </View>
            <View style={style.mainImageWrapper}>
                <View style={style.imageWrapper}>
                    <Image style={style.avatar} source={image ? { uri: image.uri } : profile.pict_url ? { uri: `${profile.pict_url}` } : require('../../assets/images/default-avatar.jpg')} />
                    <TouchableOpacity style={style.penWrap} onPress={() => setShowModal(true)}>
                        <Image source={require('../../assets/icons/pen.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <KeyboardAvoidingView
                behavior={'height'}
                style={{flex: 1}}
            >
                <ScrollView>
                    <View style={style.inputWrap}>
                        <Text style={style.text}>Name :</Text>
                        <TextInput style={style.input} value={profile.display_name} onChangeText={(text) => changeData('display_name', text)} />
                    </View>
                    <View style={style.gender}>
                        <TouchableOpacity style={style.genderNameWrap} onPress={() => changeData('gender', 'female')}>
                            <View
                                style={profile.gender === 'female'
                                    ? style.outDotActive
                                    : style.outDotInactive}>
                                <View style={profile.gender === 'female'
                                    ? style.dotActive
                                    : style.dotInactive}>
                                </View>
                            </View>
                            <Text
                                style={profile.gender === 'female'
                                    ? style.genderTextActive
                                    : style.genderTextInactive}
                            >
                                Female
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.genderNameWrap} onPress={() => changeData('gender', 'male')}>
                            <View
                                style={profile.gender === 'male'
                                    ? style.outDotActive
                                    : style.outDotInactive}>
                                <View style={profile.gender === 'male'
                                    ? style.dotActive
                                    : style.dotInactive}>
                                </View>
                            </View>
                            <Text
                                style={profile.gender === 'male'
                                    ? style.genderTextActive
                                    : style.genderTextInactive}
                            >
                                Male
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.inputWrap}>
                        <Text style={style.text}>Email Address :</Text>
                        <TextInput style={style.input} editable={false} value={profile.email} onChangeText={(text) => changeData('email', text)} />
                    </View>
                    <View style={style.inputWrap}>
                        <Text style={style.text}>Phone Number :</Text>
                        <TextInput style={style.input} editable={false} value={profile.phone_number} onChangeText={(text) => changeData('phone_number', text)} />
                    </View>
                    <View style={style.inputWrap}>
                        <Text style={style.text}>Date of Birth :</Text>
                        <TextInput style={style.input} value={profile.birth_date ? String(profile.birth_date).split('').slice(0, 10).join('') : ''} onPressIn={() => setDateModal(true)} />
                    </View>
                    <View style={style.inputWrap}>
                        <Text style={style.text}>Delivery Address :</Text>
                        <TextInput style={style.input} value={profile.address} onChangeText={(text) => changeData('address', text)} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <DatePicker
                modal
                mode='date'
                open={dateModal}
                date={profile.birth_date ? new Date(profile.birth_date) : thisDate}
                onConfirm={(date) => {
                    setDateModal(false)
                    changeData('birth_date', date.toJSON().split('').slice(0, 10).join(''))
                    // console.log(date.toJSON().split('').slice(0, 10).join(''));
                }}
                onCancel={() => {
                    setDateModal(false)
                }}
            />
            <TouchableOpacity style={style.saveBtn} onPressOut={updateProfile}>
                {isLoading ? <Loader.ButtonLoader isLoading={isLoading} /> :
                    <Text style={style.saveText}>Save and Update</Text>}
            </TouchableOpacity>

            <Modal animationType='fade' visible={showModal} transparent={true}>
                <View style={style.centeredView}>
                    <View style={style.modal}>
                        <TouchableOpacity style={style.imageBtn} onPress={openCamera}>
                            <Text style={style.imageText}>Take a Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.imageBtn} onPress={imagePicker}>
                            <Text style={style.imageText}>Open Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.saveBtn} onPress={() => setShowModal(false)}>
                            <Text style={style.saveText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Toast
                position='top'
                bottomOffset={20}
            />
        </View>
    )
}

export default EditProfile