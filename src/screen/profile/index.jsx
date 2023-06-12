import { View, Text, Image, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import Logout from "../auth/logout"
import { useState } from "react"


import navStyle from '../../styles/nav'
import style from '../../styles/profile'


const Profile = () => {
    const { userId, token, avatar, address, displayName, email, phone } = useSelector(state => state.userInfo)
    const [showModal, setShowModal] = useState(false)
    const navigation = useNavigation()

    const hideModal = (data) => {
        setShowModal(data)
    }
    
    return (
        <View style={style.mainView}>
            <View style={navStyle.nav}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={navStyle.arrowWrapper}>
                    <Image source={require('../../assets/icons/left.png')} />
                </TouchableOpacity>
                <Image source={require('../../assets/icons/left.png')} style={navStyle.hidden} />
            </View>
            <Text style={style.mainTitle}>My Profile</Text>
            <View >
                <View style={style.editInfoWrap}>
                    <Text style={style.subTitle}>Your Information</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Edit Profile')}>
                        <Text style={style.edit}>edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.content}>
                    <View style={style.profileWrap}>
                        <Image source={avatar ? { uri: `${avatar}` } : require('../../assets/images/default-avatar.jpg')} style={style.avatar} />
                        <View style={style.biodataWrap}>
                            <Text style={style.name}>{displayName}</Text>
                            <Text style={style.underlineText}>{email}</Text>
                            <Text style={style.underlineText}>{phone}</Text>
                            <Text style={style.text}>{address}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={style.navigate} onPress={() => navigation.navigate('History')}>
                        <Text style={style.subTitle}>Order History</Text>
                        <Image source={require('../../assets/icons/right.png')} />
                    </TouchableOpacity >
                    <TouchableOpacity style={style.navigate} onPress={() => navigation.navigate('Edit Password')}>
                        <Text style={style.subTitle}>Edit Password</Text>
                        <Image source={require('../../assets/icons/right.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.navigate}>
                        <Text style={style.subTitle}>FAQ</Text>
                        <Image source={require('../../assets/icons/right.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.navigate}>
                        <Text style={style.subTitle}>Help</Text>
                        <Image source={require('../../assets/icons/right.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.navigate} onPress={() => setShowModal(true)}>
                        <Text style={style.subTitle}>Logout</Text>
                        <Image source={require('../../assets/icons/right.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <Logout show={showModal} hideModal={hideModal}/>
        </View>
    )
}

export default Profile