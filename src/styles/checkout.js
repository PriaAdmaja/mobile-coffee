import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#EBEBEB',
        padding: 25
    },
    mainTitle: {
        color: '#000000',
        fontFamily: 'Poppins-Bold',
        fontSize: 34,
        paddingBottom: 20
    },
    subTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 17,
        color: '#000000'
    },
    container: {
        gap: 35,
        flex: 1
    },
    subCont: {
        gap: 14
    },
    contentCont: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 25,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    addressNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#6A4029',
        borderRadius: 20,
        paddingVertical: 22,
        position: 'relative',
    },
    textButton: {
        color: '#ffffff',
        fontFamily: 'Poppins-Bold',
        fontSize: 17,
        textAlign: 'center'
    },
    textAddress: {
        borderBottomColor: '#000000',
        borderBottomWidth: 0.5,
        overflow: 'scroll',
        width: '100%',
        color: '#000000'
    },
    dotInactive: {
        width: 10,
        height: 10,
        backgroundColor: '#9F9F9F',
        borderRadius: 5,
        display: 'none'
    },
    dotActive: {
        width: 10,
        height: 10,
        backgroundColor: '#6A4029',
        borderRadius: 5,
    },
    outDotInactive: {
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#9F9F9F',
        borderWidth: 1
    },
    outDotActive: {
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#6A4029',
        borderWidth: 1
    },
    choiceWrap: {
        flexDirection: 'row',
        gap: 16,
        paddingVertical: 10
    },
    deliveryText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 17,
        color: '#000000'
    },
    fakeButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#9F9F9F',
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 22,
        position: 'relative',
    },
    fakeTextButton : {
        color: '#000000',
        fontFamily: 'Poppins-Bold',
        fontSize: 17,
        textAlign: 'center'
    },
    

})

export default style 