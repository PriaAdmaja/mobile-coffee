import { View, Text, Image, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import style from '../styles/drawer'
import Logout from '../screen/auth/logout'

const DrawerOnModal = () => {
    const [showModal, setShowModal] = useState(false)
    const { avatar, email, displayName, rolesId } = useSelector(state => state.userInfo)
    const navigation = useNavigation()

    const hideModal = (data) => {
        setShowModal(data)
    }

    const toOrder = () => {
        rolesId === 2 ? navigation.navigate('Order') : navigation.navigate('History')
    }

    return (
        <View style={style.mainView}>
            <View style={style.headerView}>
                <Image source={avatar ? { uri: `${avatar}` } : require('../assets/images/default-avatar.jpg')} style={style.image} />
                <Text style={style.name}>{displayName}</Text>
                <Text style={style.email}>{email}</Text>
            </View>
            <View style={{flex: 1, paddingVertical: 10}}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10}} onPress={() => navigation.navigate('Edit Profile')}>
                    <Image source={require('../assets/icons/edit-profile.png')} style={{ width: 22, height: 22, }} />
                    <Text style={{paddingVertical: 20, paddingLeft: 25, color: '#6A4029', borderBottomWidth: 1, borderBottomColor: '#6A4029', width: '80%', fontFamily: 'Poppins-SemiBold', fontSize: 17 }}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10}} onPress={toOrder}>
                    <Image source={require('../assets/icons/order.png')} style={{ width: 22, height: 22, tintColor: '#6A4029' }} />
                    <Text style={{paddingVertical: 20, paddingLeft: 25, color: '#6A4029', borderBottomWidth: 1, borderBottomColor: '#6A4029', width: '80%', fontFamily: 'Poppins-SemiBold', fontSize: 17 }}>Order</Text>
                </TouchableOpacity>
            </View>
            <Logout show={showModal} hideModal={hideModal} />
            <View style={style.logout}>
                <TouchableOpacity onPress={() => setShowModal(true)}>
                    <Text style={style.logoutText}>Sign-out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DrawerOnModal