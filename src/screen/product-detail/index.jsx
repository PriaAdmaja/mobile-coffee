import { View, Text, Image, TouchableOpacity, TextInput, Modal, Pressable, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { API_URL } from 'react-native-dotenv'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

import style from '../../styles/productDetail'
import Loader from '../../components/Loader'
import { cartAction } from '../../redux/slices/cart'
import { Toast } from "react-native-toast-message/lib/src/Toast"
import { userInfoAction } from '../../redux/slices/userInfo'


const ProductDetail = () => {
    const { productId } = useSelector(state => state.productId)
    const { rolesId, token } = useSelector(state => state.userInfo)
    const [data, setData] = useState()
    const [edit, setEdit] = useState(false)
    const [image, setImage] = useState()
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    useEffect(() => {
        const url = `${API_URL}/products/${productId}`
        axios.get(url).then(res => setData(res.data?.data[0])).catch(err => console.log(err))
    }, [productId])

    const addCart = () => {
        const cart = {
            name: data?.name,
            pict: data?.pict_url,
            qty: 1,
            sizeId: 1,
            price: data?.price,
            productId
        }
        dispatch(cartAction.submitCart(cart))
        Toast.show({
            type: 'success',
            text1: 'Add item to cart'
        });
    }

    const editValue = (key, value) => {
        const newData = { ...data }
        const newValue = { ...newData, [key]: value }
        setData(newValue)
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

    const updateProduct = async () => {
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

            formData.append('productName', data.name)
            formData.append('price', data.price)
            formData.append('description', data.description)

            const url = `${API_URL}/products/${productId}`
            const result = await axios.patch(url, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            Toast.show({
                type: 'success',
                text1: result.data.msg
            });
            setEdit(false)
            navigation.goBack()
        } catch (error) {
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
    }

    const deleteProduct = async () => {
        try {
            setIsLoading(true)
            const url = `${API_URL}/products/${productId}`
            await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            navigation.navigate('drawer')
        } catch (error) {
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
    }
    console.log(data?.price);
    if (!data) return <Loader.Loader isLoading={true} />

    return (
        <View style={style.mainView}>
            <View style={style.topNav}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/left.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPressOut={() => navigation.navigate('cart')} style={rolesId === 2 && { display: 'none' }}>
                    <Image source={require('../../assets/icons/shopping-cart.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, position: 'relative' }}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? "padding" : null}>
                    <ScrollView>
                        <View style={{ flex: 1 }}>
                            <View style={style.topView}>
                                <Pressable onPress={() => edit ? setShowModal(true) : null}>
                                    <Image source={image ? { uri: image.uri } : data?.pict_url ? { uri: `${data?.pict_url}` } : require('../../assets/images/no-product.jpg')} style={style.image} />
                                </Pressable>
                                {/* <Text style={style.title}>{data?.name}</Text> */}
                                <TextInput value={data.name} editable={edit} style={edit ? style.titleEdit : style.title} onChangeText={text => editValue('name', text)} />
                                {/* <Text style={style.price}>IDR {Number(data?.price).toLocaleString()}</Text> */}
                                <TextInput value={edit ? `${data.price}` : `IDR ${Number(data.price).toLocaleString()}`} editable={edit} keyboardType="numeric" style={edit ? style.priceEdit : style.price} onChangeText={text => editValue('price', text)} />
                            </View>
                            <View style={style.bottomView}>
                                <View>
                                    <Text style={style.headText}>Delivery info</Text>
                                    <Text style={style.desc}>Delivered only on monday until friday from 1 pm to 7 pm</Text>
                                </View>

                                <View style={style.descCont}>
                                    <Text style={style.headText}>Description</Text>
                                    <TextInput value={data.description} editable={edit} multiline={true} style={edit ? style.descEdit : style.desc} onChangeText={text => editValue('description', text)} />
                                    {/* <Text style={style.desc}>{data?.description}</Text> */}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <TouchableOpacity style={edit ? { display: 'none' } : style.button} onPressOut={addCart}>
                    <Text style={style.textButton}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={edit ? style.button : { display: 'none' }} onPressOut={updateProduct}>
                    {isLoading ? <Loader.ButtonLoader isLoading={isLoading} /> : <Text style={style.textButton}>Save Change</Text>}
                </TouchableOpacity>

                <View style={rolesId === 2 ? { position: 'absolute', top: 0, right: 0, } : { display: 'none' }}>
                    <TouchableOpacity style={edit ? { display: 'none' } : { width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }} onPress={() => setEdit(true)}>
                        <Image source={require('../../assets/icons/pen.png')} style={{ tintColor: '#6A4029', width: 18, height: 18 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={edit ? { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6A4029', borderRadius: 22 } : { display: 'none' }} onPress={deleteProduct}>
                        <Image source={require('../../assets/icons/delete.png')} style={{ width: 14, height: 16, tintColor: '#ffffff' }} />
                    </TouchableOpacity>
                </View>
            </View>
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

export default ProductDetail