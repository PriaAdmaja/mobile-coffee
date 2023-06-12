import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Swipeable } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'

import style from '../../styles/cart'
import navStyle from '../../styles/nav'
import { useSelector } from 'react-redux'
import { cartAction } from '../../redux/slices/cart'

const Cart = () => {
    const cart = useSelector((state) => state.cart.cartList);
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const swipeRight = (idx) => {
        return (
            <View style={style.swipeCOntent}>
                <TouchableOpacity style={style.delete} onPress={() => dispatch(cartAction.deleteCart(idx))}>
                    <Image source={require('../../assets/icons/delete.png')} style={{ width: 14, height: 16 }} />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={style.mainView}>
            <View style={navStyle.nav}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={navStyle.arrowWrapper}>
                    <Image source={require('../../assets/icons/left.png')} />
                </TouchableOpacity>
                <Text style={navStyle.navText}>Cart</Text>
                <Image source={require('../../assets/icons/left.png')} style={navStyle.hidden} />
            </View>
            <View style={style.content}>
                <View style={style.swipe}>
                    <Image source={require('../../assets/icons/iwwa_swipe.png')} />
                    <Text style={{color: '#000000'}}>Swipe on item to delete</Text>
                </View>

                <FlatList
                    data={cart}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    renderItem={({ item, index }) => {
                        return (
                            <Swipeable
                                renderRightActions={() => swipeRight(index)}
                            >
                                <View style={style.cartCard}>
                                    <Image source={{ uri: `${item.pict}` }} style={style.imageCard} />
                                    <View style={style.descCard}>
                                        <Text style={style.titleCard}>{item.name}</Text>
                                        <View style={style.detailCard}>
                                            <Text style={{color: '#000000'}}>IDR {Number(item.price).toLocaleString()}</Text>
                                            <View style={style.qtyBtn}>
                                                <TouchableOpacity onPress={() => dispatch(cartAction.subQuantity(index))}>
                                                    <Text style={style.qtyText}>-</Text>
                                                </TouchableOpacity>
                                                <Text style={style.qtyText}>{item.qty}</Text>
                                                <TouchableOpacity onPress={() => dispatch(cartAction.addQuantity(index))}>
                                                    <Text style={style.qtyText}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Swipeable>
                        )
                    }}
                />
                <TouchableOpacity style={style.button} onPressOut={() => navigation.navigate('checkout')}>
                    <Text style={style.textButton}>
                        Confirm and Checkout
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Cart