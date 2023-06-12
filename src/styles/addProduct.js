import {StyleSheet} from 'react-native'

const style = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#EBEBEB',
        padding: 25
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100
    },
    content: {
        flex: 1,
        position: 'relative'
    },
    imageContentWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginBottom: 24
    },
    addPictBtn : {
        paddingHorizontal: 27,
        paddingVertical: 11,
        backgroundColor: '#000000',
        borderRadius: 10
    },
    addPictText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 12
    },
    inputInside: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#C4C4C4',
        textAlign: 'center',
        width: '90%',
        color: '#000000',
    },
    subTitle: {
        fontWeight: '900',
        fontSize: 17,
        color: '#000000'
    },
    inputOutside: {
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        marginBottom: 20,
        color: '#000000'
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
    saveBtn: {
        backgroundColor: '#6A4029',
        borderRadius: 20,
        padding: 22
    },
    saveText: {
        color: '#ffffff',
        fontWeight: '900',
        fontSize: 17,
        textAlign: "center"
    },
    choiceWrap: {
        flexDirection: 'row',
        gap: 16,
        paddingVertical: 10
    },
    categoryText: {
        fontWeight: '400',
        fontSize: 14,
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
    categoryWrap : {
        flexDirection : 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 17,
        marginBottom: 20
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
        paddingVertical: 22
    },
    clearBtn : {
        width: 44, 
        height: 44, 
        backgroundColor: '#895537', 
        borderRadius: 22, 
        position: 'absolute', 
        top: 0, 
        right: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default style