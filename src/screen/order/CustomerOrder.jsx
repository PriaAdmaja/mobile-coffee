import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { API_URL } from 'react-native-dotenv'
import { Toast } from "react-native-toast-message/lib/src/Toast"

import navStyle from '../../styles/nav'
import style from '../../styles/customerOrder'
import Loader from '../../components/Loader'

const CustomerOrder = () => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()
    const { token } = useSelector(state => state.userInfo)


    useEffect(() => {
        const url = `${API_URL}/transactions?statusId=3`
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => setData(res.data.data)).catch(err => console.log(err))
    }, [])

    const orderHandler = async (id, statusId) => {
        try {
            setIsLoading(true)
            const url = `${API_URL}/transactions/${id}`
            const body = {
                statusId
            }
            const result = await axios.patch(url, body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const urlGet = `${API_URL}/transactions?statusId=3`
            const newData = await axios.get(urlGet, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setData(newData.data.data)
            Toast.show({
                type: 'success',
                text1: result.data.msg
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error.response.data.msg
            })
        } finally {
            setIsLoading(false)
        }
    }

    const swipeRight = (idx) => {
        return (
            <View style={style.swipeCOntent}>
                <TouchableOpacity style={style.cross} onPress={() => orderHandler(idx, 4)}>
                    <Image source={require('../../assets/icons/crossmark.png')} style={{ width: 15, height: 15, tintColor: '#ffffff' }} />
                </TouchableOpacity>
                <TouchableOpacity style={style.check} onPress={() => orderHandler(idx, 5)}>
                    <Image source={require('../../assets/icons/cek.png')} style={{ width: 16, height: 15 }} />
                </TouchableOpacity>
            </View>
        )
    }

    if (!data) { return <Loader.Loader isLoading={true} /> }
    return (
        <View style={style.mainView}>
            <View style={navStyle.nav}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={navStyle.arrowWrapper}>
                    <Image source={require('../../assets/icons/left.png')} />
                </TouchableOpacity>
                <Text style={navStyle.navText}>Customer Order</Text>
                <Image source={require('../../assets/icons/left.png')} style={navStyle.hidden} />
            </View>
            <View style={style.content}>
                <View style={style.swipe}>
                    <Image source={require('../../assets/icons/iwwa_swipe.png')} />
                    <Text style={{ color: '#000000' }}>Swipe on item accept or reject</Text>
                </View>
                {isLoading ? <Loader.Loader isLoading={isLoading} /> :
                    <FlatList
                        data={data}
                        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                        renderItem={({ item }) => {
                            
                            return (
                                <Swipeable
                                    renderRightActions={() => swipeRight(item.id)}
                                >
                                    <View style={style.cartCard}>
                                        <Image source={{ uri: `${item.pict_url}` }} style={style.imageCard} />
                                        <View style={style.descCard}>
                                            <Text style={style.titleCard}>{item.name}</Text>
                                            <Text style={style.price}>IDR {Number(item.grand_total).toLocaleString()}</Text>
                                            <Text style={style.detail}>{item.method}</Text>
                                        </View>
                                    </View>
                                </Swipeable>
                            )
                        }}
                    />}
            </View>
            <Toast
                position='top'
                bottomOffset={20}
            />
        </View>
    )
}

export default CustomerOrder