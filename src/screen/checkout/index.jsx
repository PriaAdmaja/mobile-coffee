import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

import style from '../../styles/checkout'
import navStyle from '../../styles/nav'
import { useNavigation } from '@react-navigation/native'

import { userInfoAction } from '../../redux/slices/userInfo'
import { deliveryStatusAction } from '../../redux/slices/deliveryStatus'

const Checkout = () => {
    const [editable, setEditable] = useState(false)
    const { address, phone } = useSelector((state) => state.userInfo);
    const { deliveryId } = useSelector(state => state.deliveryStatus)

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const goPayment = () => {
        navigation.navigate('payment')
    }
    return (
        <View style={style.mainView}>
            <View style={navStyle.nav}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={navStyle.arrowWrapper}>
                    <Image source={require('../../assets/icons/left.png')} />
                </TouchableOpacity>
                <Image source={require('../../assets/icons/left.png')} style={navStyle.hidden} />
            </View>
            <Text style={style.mainTitle}>Delivery</Text>
            <View style={style.container}>
                <View style={style.subCont}>
                    <View style={style.addressNav}>
                        <Text style={style.subTitle}>Address detail</Text>
                        <Text onPress={() => editable === true ? setEditable(false) : setEditable(true)} style={{color: '#000000'}}>change</Text>
                    </View>
                    <View style={style.contentCont}>
                        <TextInput editable={editable} selectTextOnFocus={editable} multiline={true} numberOfLines={3} value={address} style={style.textAddress} onChangeText={text => dispatch(userInfoAction.submitAddress(text))} />
                        <TextInput editable={editable} selectTextOnFocus={editable} style={{color: '#000000'}} value={phone} onChangeText={text => dispatch(userInfoAction.submitPhone(text))} />
                    </View>
                </View>
                <View style={style.subCont}>
                    <View>
                        <Text style={style.subTitle}>Delivery method</Text>
                    </View>
                    <View style={style.contentCont}>
                        <TouchableOpacity style={style.choiceWrap} onPress={() => dispatch(deliveryStatusAction.submitDeliveryId(1))}>
                            <View
                                style={ deliveryId === 1 ? style.outDotActive : style.outDotInactive}>
                                <View style={ deliveryId === 1 ? style.dotActive : style.dotInactive}>
                                </View>
                            </View>
                            <Text style={style.deliveryText}>
                                Door delivery
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={style.choiceWrap} onPress={() => dispatch(deliveryStatusAction.submitDeliveryId(2))}>
                            <View
                                style={deliveryId === 2 ? style.outDotActive : style.outDotInactive}>
                                <View style={ deliveryId === 2 ? style.dotActive : style.dotInactive}>
                                </View>
                            </View>
                            <Text style={style.deliveryText}>
                                Pict up at store
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={style.choiceWrap} onPress={() => dispatch(deliveryStatusAction.submitDeliveryId(3))}>
                            <View
                                style={deliveryId === 3 ? style.outDotActive : style.outDotInactive}>
                                <View style={deliveryId === 3 ? style.dotActive : style.dotInactive}>
                                </View>
                            </View>
                            <Text style={style.deliveryText}>
                                Dine in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={ deliveryId && address && phone ? {display: 'none'} : style.fakeButton}>
                    <Text style={style.fakeTextButton}>Proceed to Payment</Text>
                </View>
            <TouchableOpacity style={  deliveryId && address && phone ? style.button : {display: 'none'}} onPressOut={goPayment}>
                <Text style={style.textButton}>Proceed to Payment</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Checkout