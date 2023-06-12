import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    upView: {
        flex: 1
    },
    bottomView: {
        flex: 1
    },
    textView: {
        marginBottom: 47
    },
    inputText: {
        borderBottomWidth: 1,
        borderBottomColor: '#9F9F9F',
        paddingVertical: 10,
        color: '#000000',
        width: '100%',
        marginBottom: 4,
        fontSize: 17
    },
    upLogin: {
        flexDirection: 'row',
        flex: 1,
        display: 'flex',
        alignItems: 'center'
    },
    upLoginText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 50,
        flex: 1,
        color: '#000000'
    },
    loginBtn: {
        backgroundColor: '#6A4029',
        borderRadius: 20,
    },
    signupBtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
        backgroundColor: '#6A4029',
        borderRadius: 20,
        paddingVertical: 18
    },
    loginTextView: {
        marginBottom: 15,
    },
    forgotPass: {
        paddingTop: 15,
        color: '#895537',
        textDecorationLine: 'underline',
        fontFamily: 'Poppins-Regular'
    },
    googleBtn: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderColor: '#000000',
        borderWidth: 1,
        padding: 18,
        gap: 15,
        justifyContent: 'center'
    },
    googleIcon: {
        width: 28,
        height: 26,
    },
    googleText: {
        fontFamily: 'Poppins-Regular',
        color: '#000000',
        fontSize: 17
    },
    barrier: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16
    },
    lineBarrier: {
        width: '100%',
        height: 1,
        color: '#9F9F9F',
    },
    textBarrier: {
        color: '#9F9F9F',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    textForgot : {
        color: '#000000',
        textAlign: 'center',
        paddingVertical: 25,
        fontFamily: 'Poppins-Regular',
    },
    startTitle: {
        fontSize: 50,
        color: 'black',
        fontFamily: 'Poppins-Bold',
        textAlign: 'center'
    },
    fakeButton : {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#9F9F9F',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    fakeTextButton : {
        color: '#000000',
        fontFamily: 'Poppins-Bold',
        fontSize: 17,
        textAlign: 'center',
        paddingVertical: 18
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
        paddingVertical: 1
    },
    inputPassword: {
        fontSize: 17,
        color: '#000000',
        width: '80%',
    },
    passwordWarn : {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#e32929',
        paddingVertical: 3
    }
})

export default styles