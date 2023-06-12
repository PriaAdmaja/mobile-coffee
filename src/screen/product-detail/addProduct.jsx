import { View, Text, TouchableOpacity, Image, TextInput, Modal, ScrollView } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useNavigation } from '@react-navigation/native'
import { API_URL} from 'react-native-dotenv'

import style from '../../styles/addProduct'
import navStyle from '../../styles/nav'
import Loader from '../../components/Loader'


const AddProduct = () => {
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [categoryId, setCategoryId] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const {token} = useSelector(state => state.userInfo)
    const navigation = useNavigation()

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

    const sendProductData = async() => {
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
            formData.append('productName', name)
            formData.append('price', Number(price))
            formData.append('description', description)
            formData.append('categoryId', categoryId)
            console.log(formData);
            const url = `${API_URL}/products`
            const result = await axios.post(url, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            Toast.show({
                type: 'success',
                text1: result.data.msg
            });
            navigation.navigate('tab')
        } catch (error) {
            
            Toast.show({
                type: 'error',
                text1: error.response.data.msg
            })
        } finally {
            setIsLoading(false)
        }
    }

    const clearForm = () => {
        setImage(null)
        setName(null)
        setPrice(null)
        setDescription(null)
        setCategoryId(null)
    }

    return (
        <View style={style.mainView}>
            <View style={navStyle.nav}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={navStyle.arrowWrapper}>
                    <Image source={require('../../assets/icons/left.png')} />
                </TouchableOpacity>
                <Text style={navStyle.navText}>New Product</Text>
                <Image source={require('../../assets/icons/left.png')} style={navStyle.hidden} />
            </View>
            <ScrollView style={style.content}>
                <View style={style.imageContentWrap}>
                    <Image source={image ? { uri: image.uri } : require('../../assets/images/default-image.jpg')} style={style.image} />
                    <TouchableOpacity style={style.addPictBtn} onPress={() => setShowModal(true)}>
                        <Text style={style.addPictText}>Add pictures</Text>
                    </TouchableOpacity>
                    <TextInput placeholder='Type product name' placeholderTextColor={`#8a8a8a`} value={name} style={style.inputInside} onChangeText={text => setName(text)} />
                    <TextInput placeholder='Type product price' placeholderTextColor={`#8a8a8a`} value={price} keyboardType="numeric" style={style.inputInside} onChangeText={text => setPrice(text)} />
                </View>
                <Text style={style.subTitle}>Description</Text>
                <TextInput placeholder='Describe your product' placeholderTextColor={`#8a8a8a`} value={description} style={style.inputOutside} onChangeText={text => setDescription(text)} />
                <Text style={style.subTitle}>Category</Text>
                <View style={style.categoryWrap}>
                    <TouchableOpacity style={style.choiceWrap} onPress={() => setCategoryId(1)}>
                        <View
                            style={categoryId === 1 ? style.outDotActive : style.outDotInactive}>
                            <View style={categoryId === 1 ? style.dotActive : style.dotInactive}>
                            </View>
                        </View>
                        <Text style={style.categoryText}>
                            Coffee
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.choiceWrap} onPress={() => setCategoryId(2)}>
                        <View
                            style={categoryId === 2 ? style.outDotActive : style.outDotInactive}>
                            <View style={categoryId === 2 ? style.dotActive : style.dotInactive}>
                            </View>
                        </View>
                        <Text style={style.categoryText}>
                            Non coffee
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.choiceWrap} onPress={() => setCategoryId(3)}>
                        <View
                            style={categoryId === 3 ? style.outDotActive : style.outDotInactive}>
                            <View style={categoryId === 3 ? style.dotActive : style.dotInactive}>
                            </View>
                        </View>
                        <Text style={style.categoryText}>
                            Foods
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={name && price && description && categoryId ? {display: 'none'} : style.fakeButton}>
                    <Text style={style.fakeTextButton}>Save Product</Text>
                </View>
                <TouchableOpacity style={name && price && description && categoryId ? style.button : {display: 'none'}} onPress={sendProductData}>
                    <Text style={style.textButton}>Save Product</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.clearBtn} onPress={clearForm}>
                    <Image source={require('../../assets/icons/delete.png')} style={{width: 14, height: 16, tintColor:'#ffffff'}}/>
                </TouchableOpacity>
            </ScrollView>
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
            <Loader.Loader isLoading={isLoading} />
        </View>
    )
}

export default AddProduct