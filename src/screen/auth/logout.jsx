import { View, Text, Modal, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { API_URL } from 'react-native-dotenv'

import style from '../../styles/logout'
import Loader from '../../components/Loader'
import { userInfoAction } from '../../redux/slices/userInfo'
import doLogout from '../../utils/doLogout'

const Logout = ({ show, hideModal }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { userId, token } = useSelector(state => state.userInfo)
    const dispatch = useDispatch()

    const logout = async () => {
        try {
            setIsLoading(true)
            const urlVerify = `${API_URL}/auth/verify`
            await axios.get(urlVerify, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const url = `${API_URL}/auth/logout`
            await axios.post(url, { userId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(userInfoAction.clearData())
            setIsLoading(false)
            hideModal(false)
        }
    }

    return (
        <Modal
            visible={show}
            animationType='fade'
            transparent={true}
        >
            <View style={style.centeredView}>
                {isLoading ? <Loader.Loader isLoading={isLoading} /> :
                    <View style={style.modal}>
                        <Text style={style.text}>Are you sure to logout?</Text>
                        <View style={style.buttonWrapper}>
                            <TouchableOpacity style={style.cancel} onPress={() => hideModal(false)}>
                                <Text style={style.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.logout} onPress={logout}>
                                <Text style={style.logoutText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        </Modal>

    )
}

export default Logout