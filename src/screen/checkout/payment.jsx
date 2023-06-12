import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Toast } from "react-native-toast-message/lib/src/Toast"
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

import style from '../../styles/payment'
import navStyle from '../../styles/nav'
import Loader from '../../components/Loader';
import { cartAction } from '../../redux/slices/cart';
import { deliveryStatusAction } from '../../redux/slices/deliveryStatus';
import { userInfoAction } from '../../redux/slices/userInfo';

const Payment = () => {
    const [paymentId, setPaymentId] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const cart = useSelector(state => state.cart.cartList)
    const navigation = useNavigation()
    const { deliveryId } = useSelector(state => state.deliveryStatus)
    const { address, token, userId } = useSelector(state => state.userInfo)
    const dispatch = useDispatch()

    let subTotal = cart.map(data => Math.floor(data.price * data.qty)).reduce((a, b) => (a + b), 0);
    let tax = Math.floor(10 / 100 * subTotal);
    let shipping = Number(deliveryId) === 2 ? 10000 : 0;
    let total = Math.floor(subTotal + tax + shipping)

    const selectedData = (show) => {
        const { productId, sizeId, qty, price } = show;
        return { productId, sizeId, quantity: qty, price }
    }
    const proceedPayment = async () => {
        try {
            setIsLoading(true)
            const body = {
                userId,
                promoId: null,
                paymentId,
                deliveryId,
                notes: 'null',
                address,
                grandTotal: total,
                products: cart.map(selectedData)
            }
            console.log(body);
            const url = `${API_URL}/transactions`
            const result = await axios.post(url, body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            Toast.show({
                type: 'success',
                text1: result.data.msg
            });
            navigation.navigate('History')
        } catch (error) {
            // console.log(error.response.data);
            Toast.show({
                type: 'error',
                text1: error.response.data.msg
            })
            if (error.response.data.msg === 'jwt expired') {
                setTimeout(() => {
                    dispatch(userInfoAction.clearData())
                }, 1000)
            }
        } finally {
            setIsLoading(false)
        }
        dispatch(deliveryStatusAction.deleteDelivery())
        dispatch(cartAction.clearCart())
    }
    return (
        <View style={style.mainView}>
            <View style={navStyle.nav}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={navStyle.arrowWrapper}>
                    <Image source={require('../../assets/icons/left.png')} />
                </TouchableOpacity>
                <Text style={navStyle.navText}>Payment</Text>
                <Image source={require('../../assets/icons/left.png')} style={navStyle.hidden} />
            </View>
            <ScrollView>
                <View style={style.subCont}>
                    <Text style={style.subTitle}>Products</Text>
                    <View style={style.contentCont}>
                        {cart.map((data, i) => {
                            return (
                                <View key={i} >
                                    <View style={style.cart}>
                                        <Image source={{ uri: `${data.pict}` }} style={style.image} />
                                        <View style={style.cartContent}>
                                            <Text style={{ color: '#000000' }}>{data.name}</Text>
                                            <View style={style.cartDetail}>
                                                <Text style={{ color: '#000000' }}>x {data.qty}</Text>
                                                <Text style={{ color: '#000000' }}>IDR {Number(data.price).toLocaleString()}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
                <View style={style.subCont}>
                    <Text style={style.subTitle}>Payment Methods</Text>
                    <View style={style.contentCont}>
                        <TouchableOpacity style={style.choosePayment} onPress={() => setPaymentId(1)}>
                            <View
                                style={paymentId === 1 ? style.outDotActive : style.outDotInactive}>
                                <View style={paymentId === 1 ? style.dotActive : style.dotInactive}>
                                </View>
                            </View>
                            <View style={style.iconCardCover}>
                                <Image source={require('../../assets/icons/card.png')} style={{ width: 16, height: 12 }} />
                            </View>
                            <Text style={style.paymentText}>Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.choosePayment} onPress={() => setPaymentId(2)}>
                            <View
                                style={paymentId === 2 ? style.outDotActive : style.outDotInactive}>
                                <View style={paymentId === 2 ? style.dotActive : style.dotInactive}>
                                </View>
                            </View>
                            <View style={style.iconBankCover}>
                                <Image source={require('../../assets/icons/bank.png')} style={{ width: 14, height: 16 }} />
                            </View>
                            <Text style={style.paymentText}>Bank account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.choosePayment} onPress={() => setPaymentId(3)}>
                            <View
                                style={paymentId === 3 ? style.outDotActive : style.outDotInactive}>
                                <View style={paymentId === 3 ? style.dotActive : style.dotInactive}>
                                </View>
                            </View>
                            <View style={style.iconCODCover}>
                                <Image source={require('../../assets/icons/deliv.png')} style={{ width: 24, height: 21 }} />
                            </View>
                            <Text style={style.paymentText}>Cash on Delivery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={style.subCont}>
                    <Text style={style.subTitle}>My Card</Text>
                    <Image source={require('../../assets/images/bricard.png')} style={style.bankCard} />
                </View>
                <View style={style.totalWraper}>
                    <Text style={style.total}>Total</Text>
                    <Text style={style.total}>IDR {total.toLocaleString()}</Text>
                </View>
                <View style={paymentId ? { display: 'none' } : style.fakeButton}>
                    <Text style={style.fakeTextButton}>Proceed to Payment</Text>
                </View>
                <TouchableOpacity style={paymentId ? style.button : { display: 'none' }} onPressOut={proceedPayment}>
                    {isLoading ? <Loader.ButtonLoader isLoading={isLoading} />
                        : <Text style={style.textButton}>Proceed to Payment</Text>}
                </TouchableOpacity>
            </ScrollView>
            <Toast
                position='top'
                bottomOffset={20}
            />
        </View>
    )
}

export default Payment