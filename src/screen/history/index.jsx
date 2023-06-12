import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Toast } from "react-native-toast-message/lib/src/Toast"
import { API_URL} from 'react-native-dotenv'

import style from '../../styles/history'
import navStyle from '../../styles/nav'
import Loader from '../../components/Loader';
import NoHistory from './NoHistory';

const History = () => {
    const [history, setHistory] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { userId } = useSelector(state => state.userInfo)
    const navigation = useNavigation()

    useEffect(() => {
        let getData = true
        if (getData) {
            setIsLoading(true)
            const url = `${API_URL}/history/${userId}`
            axios.get(url).then(res => setHistory(res.data.data)).catch(err => console.log(err)).finally(() => setIsLoading(false))
        }
        return () => {getData = false}
    }, [])

    const deleteHistory = async (transactionId) => {
        try {
            setIsLoading(true)
            const url = `${API_URL}/history/${transactionId}`
            await axios.delete(url)
            const refreshUrl = `${API_URL}/history/${userId}`
            const result = await axios.get(refreshUrl)
            setHistory(result.data.data)
            Toast.show({
                type: 'success',
                text1: result.data.msg
            });
        } catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: error.esponse.data.msg
            });
        } finally {
            setIsLoading(false)
        }
    }

    const deleteButton = (itemId) => {
        return (
            <View style={style.deleteWrap}>
                <TouchableOpacity style={style.deleteBtn} onPress={() => deleteHistory(itemId)}>
                    <Image source={require('../../assets/icons/delete.png')} style={{ tintColor: '#ffffff', width: 14, height: 16 }} />
                </TouchableOpacity>
            </View>
        )
    }

    if(isLoading) return <Loader.Loader isLoading={isLoading}/>
    if(history.length === 0) return <NoHistory />
    return (
        <View style={style.mainView}>
            <View style={navStyle.nav}>
                <TouchableOpacity onPress={() => navigation.navigate('tab')} style={navStyle.arrowWrapper}>
                    <Image source={require('../../assets/icons/left.png')} />
                </TouchableOpacity>
                <Image source={require('../../assets/icons/left.png')} style={navStyle.hidden} />
            </View>
            <Text style={style.mainTitle}>Order History</Text>
            <View style={style.swipe}>
                <Image source={require('../../assets/icons/iwwa_swipe.png')} />
                <Text style={{color: '#000000'}}>Swipe on item to delete</Text>
            </View>
            {isLoading ? <Loader.Loader isLoading={true} /> :
                <FlatList
                    data={history}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    renderItem={({ item }) => {
                        return (
                            <Swipeable renderRightActions={() => deleteButton(item.id)}>
                                <View style={style.card}>
                                    <Image source={{ uri: `${item.pict_url}` }} style={style.image} />
                                    <View>
                                        <Text style={style.menuName}>{item.name}</Text>
                                        <Text style={style.total}>IDR {Number(item.grand_total).toLocaleString()}</Text>
                                        <Text style={style.desc}>{item.method}, {item.status} on {String(item.created_at).split('').splice(0, 10).join('')}</Text>
                                    </View>
                                </View>
                            </Swipeable>
                        )
                    }}
                />
            }
            <Toast
                position='top'
                bottomOffset={20}
            />
        </View>
    )
}

export default History