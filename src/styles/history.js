import {StyleSheet} from 'react-native'

const style = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#EBEBEB',
        padding: 25
    },
    mainTitle: {
        fontWeight: '900',
        fontSize: 34,
        color: '#000000',
        paddingVertical: 10
    },
    swipe: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        flexDirection: 'row',
        marginVertical: 19,
    },
    card: {
        borderRadius: 20,
        backgroundColor: '#ffffff',
        paddingVertical: 11,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 17
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    menuName : {
        fontSize: 17,
        fontFamily: 'Poppins-Bold',
        color: '#000000'
    },
    total : {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        color: '#895537'
    },
    desc : {
        fontSize: 10,
        fontFamily: 'Poppins-Regular',
        color: '#895537'
    },
    deleteBtn : {
        backgroundColor: '#895537',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 23
    }
})

export default style