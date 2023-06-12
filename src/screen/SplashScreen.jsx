import { View, Text, Image } from "react-native"
import { useSelector } from "react-redux"
import {useEffect} from 'react'
import { StackActions, useNavigation } from "@react-navigation/native"
 
const SplashScreen = () => {
    const navigation = useNavigation()
    const { token } = useSelector(state => state.userInfo)
    useEffect(() => {
        setTimeout(() => {
            token? 
            navigation.dispatch(StackActions.replace('tab'))
            : navigation.dispatch(StackActions.replace('getStart'))
            
        }, 3000)
    },[])
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20}}>
            <Image source={require('../assets/images/cup.png')} style={{width: 200, height: 200}}/>
            <Text style={{textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 30, color: '#000000'}}>My Coffee</Text>
        </View>
    )
}

export default SplashScreen