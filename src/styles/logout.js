import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
    },
    modal: {
        width: '80%',
        padding: 30,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        gap: 10
    },
    logoutModal: {
        borderRadius: 30,
        backgroundColor: '#ffffff',
        padding: 40
    },
    text: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        color: '#000000'
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 33
    },
    cancel: {
        borderWidth: 1,
        borderColor: '#9f9f9f',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f8'
    },
    logout: {
        backgroundColor: '#6A4029',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    cancelText: {
        color: '#000000',
        fontFamily: 'Poppins-Bold',
        fontSize: 18
    },
    logoutText: {
        color: '#ffffff',
        fontFamily: 'Poppins-Bold',
        fontSize: 18
    }

})

export default style