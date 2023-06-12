import { View, Text, Image, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useSelector } from 'react-redux'
import {useState} from 'react'

import style from '../styles/drawer'
import Logout from '../screen/auth/logout'

const CustomDrawer = (props) => {
    const [showModal, setShowModal] = useState(false)
    const { avatar, email, displayName } = useSelector(state => state.userInfo)
    
    const hideModal = (data) => {
        setShowModal(data)
    }

    return (
        <View style={style.mainView}>
            <DrawerContentScrollView {...props} >
                <View style={style.headerView}>
                    <Image source={avatar ? { uri: `${avatar}` } : require('../assets/images/default-avatar.jpg')} style={style.image} />
                    <Text style={style.name}>{displayName}</Text>
                    <Text style={style.email}>{email}</Text>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <Logout show={showModal} hideModal={hideModal}/>
            <View style={style.logout}>
                <TouchableOpacity onPress={() => setShowModal(true)}>
                    <Text style={style.logoutText}>Sign-out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer