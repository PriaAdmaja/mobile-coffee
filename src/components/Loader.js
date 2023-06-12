
import { StyleSheet, ActivityIndicator, View } from 'react-native'

const Loader = ({isLoading}) => {
    return (
       <View style={isLoading ? style.largeShow : style.hidden}>
        <ActivityIndicator size='large' color='#FFBA33'/>
       </View>
    )
}

const ButtonLoader = ({isLoading}) => {
    return (
       <View style={isLoading ? style.show : style.hidden}>
        <ActivityIndicator size='small' color='#FFBA33'/>
       </View>
    )
}

const style = StyleSheet.create({
    hidden: {
        display: 'none'
    },
    largeShow: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    smalShow: {
        
    }
})

export default {Loader, ButtonLoader}