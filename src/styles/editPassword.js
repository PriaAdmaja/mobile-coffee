import {StyleSheet} from 'react-native'

const style = StyleSheet.create({
    mainView: {
        padding: 25,
        flex: 1,
        backgroundColor: '#EBEBEB',
    },
    formView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 20
    },
    inputWrap: {
        width: '100%',
        gap: 6,
    },
    text: {
        fontSize: 13,
        color: '#000000',
        fontFamily: 'Poppins-Bold'
    },
    inputText: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 16,
        width: '100%',
        fontFamily: 'Poppins-Regular',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#9F9F9F',
        color: '#000000'
    },
    textWarn: {
        fontSize: 13,
        color: '#e32929',
        fontFamily: 'Poppins-Bold'
    },
    inputTextWarn: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 16,
        width: '100%',
        fontFamily: 'Poppins-Regular',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e32929'
    },
    fakeBtn : {
        backgroundColor: '#FFFFFF',
        borderColor: '#9F9F9F',
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 20,
        position: 'relative',
    },
    fakeBtnText: {
        color: '#000000',
        fontFamily: 'Poppins-Bold',
        fontSize: 17,
        textAlign: 'center'
    },
    saveBtn: {
        backgroundColor: '#6A4029',
        borderRadius: 20,
        padding: 20
    },
    saveText: {
        color: '#ffffff',
        fontSize: 17,
        textAlign: "center",
        fontFamily: 'Poppins-Bold'
    },
    warn: {
        fontFamily: 'Poppins-Medium',
        color: '#e32929',
        fontSize: 12,
        textAlign: 'center'
    },
    eye: {
        width: 25,
        height: 25,
        tintColor: '#000000'
    },
    passwordWrap : {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#9F9F9F',
        paddingVertical: 3
    },
    inputPassword: {
        fontSize: 17,
        color: '#000000',
        width: '80%',
    },
})

export default style