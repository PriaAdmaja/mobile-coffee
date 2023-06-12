import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#EBEBEB',
        padding: 25
    },
    topView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomView: {
        flex: 1
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100
    },
    title: {
        fontWeight: '900',
        fontSize: 35,
        paddingTop: 10,
        color: '#000000'
    },
    titleEdit: {
        fontWeight: '900',
        fontSize: 35,
        paddingTop: 10,
        color: '#000000',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1
    },
    price: {
        fontWeight: '700',
        fontSize: 20,
        color: '#6A4029',
        paddingTop: 6
    },
    priceEdit: {
        fontWeight: '700',
        fontSize: 20,
        color: '#6A4029',
        paddingTop: 6,
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1
    },
    headText: {
        fontWeight: '700',
        fontSize: 17,
        color: '#000000',
        paddingBottom: 5
    },
    descCont: {
        paddingTop: 15,
        flex: 1
    },
    desc: {
        fontSize: 15,
        textAlign: 'left',
        color: '#000000',
    },
    descEdit: {
        fontSize: 15,
        textAlign: 'left',
        color: '#000000',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1
    },
    button: {
        backgroundColor: '#6A4029',
        borderRadius: 20,
        paddingVertical: 22,
        position: 'relative',
    },
    textButton: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 17,
        textAlign: 'center'
    },
    leftArrow: {
        fontWeight: '900'
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
    },
    modal: {
        width: '80%',
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        gap: 10
    },
    saveBtn: {
        backgroundColor: '#6A4029',
        borderRadius: 20,
        padding: 22
    },
    imageBtn :{
        backgroundColor: '#FFBA33',
        borderRadius: 20,
        padding: 22
    },
    imageText: {
        color: '#000000',
        fontWeight: '900',
        fontSize: 17,
        textAlign: "center"
    },
    saveText: {
        color: '#ffffff',
        fontWeight: '900',
        fontSize: 17,
        textAlign: "center"
    },
})

export default style