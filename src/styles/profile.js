import {StyleSheet} from 'react-native';

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
        paddingBottom: 30
    },
    content: {
        gap: 24
    },
    subTitle: {
        fontWeight: '700',
        fontSize: 18,
        color: '#000000'
    },
    editInfoWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 9
    },
    edit: {
        color: '#6A4029',
        fontSize: 14,
        fontWeight: '400'
    },
    profileWrap: {
        borderRadius: 20,
        backgroundColor: '#ffffff',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    name: {
        fontSize: 18,
        fontWeight: '900',
        color: '#000000',
    },
    biodataWrap: {
        gap: 8
    },
    text: {
        fontWeight: '400',
        fontSize: 15,
        color: '#6A4029'
    },
    underlineText : {
        fontWeight: '400',
        fontSize: 15,
        color: '#6A4029',
        borderBottomWidth: 0.5,
        borderBottomColor: '#000000'
    },
    navigate: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 23,
        paddingVertical: 16
    }
})

export default style