import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#EBEBEB',
        padding: 25
    },
    contentCont: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 25,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 10
    },
    addressNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subCont: {
        gap: 14,
        marginBottom: 30
    },
    subTitle: {
        fontWeight: '700',
        fontSize: 17,
        color: '#000000'
    },
    cartCont: {
        gap: 14,
        width: '100%'
    },
    cart: {
        flexDirection: 'row',
        gap: 19,
        width: '100%',
        alignItems: 'center'
    },
    cartContent: {
        flex: 3,
    },
    image: {
        width: 54,
        height: 64,
        borderRadius: 20,
        flex: 1
    },
    cartDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bankCard: {
        width: 248,
        height: 150
    },
    totalWraper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 30
    },
    total: {
        fontWeight: '700',
        fontSize: 20,
        color: '#000000'
    },
    button: {
        backgroundColor: '#6A4029',
        borderRadius: 20,
        paddingVertical: 22,
        position: 'relative',
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
        fontWeight: '700',
        fontSize: 17,
        textAlign: 'center'
    },
    textButton: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 17,
        textAlign: 'center'
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
    iconCardCover: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#F47B0A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconBankCover: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#895537',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconCODCover: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#FFBA33',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paymentText: {
        fontWeight: '400',
        fontSize: 17,
        color: '#000000'
    },
    choosePayment : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 15
    }

})

export default style