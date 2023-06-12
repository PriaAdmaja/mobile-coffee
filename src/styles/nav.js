import {StyleSheet} from 'react-native'

const style = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    navText : {
        fontWeight: '700',
        fontSize: 18,
        color: '#000000'
    },
    hidden: {
        opacity: 0
    },
    arrowWrapper: {
        width: 15,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
})

export default style