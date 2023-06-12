import { TouchableOpacity, Text, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const EmptyCart = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, padding: 22 }}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/left.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/icons/empty-cart.png')} style={{ width: 120, height: 120 }} />
                <Text style={{ fontWeight: '900', fontSize: 28, paddingTop: 35, color: '#000000' }}>No order yet</Text>
                <Text style={{ fontWeight: '400', fontSize: 17, textAlign: 'center', paddingTop: 8, color: '#000000' }}>Hit the orange button down
                    below to Create an order</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('tab')} style={{ backgroundColor: '#FFBA33', borderRadius: 20, justifyContent: 'center', alignItems: 'center', paddingVertical: 22 }}>
                <Text style={{ color: '#000000', fontWeight: '900', fontSize: 17, }}>Start ordering</Text>
            </TouchableOpacity>

        </View>
    )
}

export default EmptyCart