import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    homeView: {
        flex: 1,
        paddingTop: 25,
        paddingHorizontal: 25,
        paddingBottom: 10
    },
    upView: {
        flex: 1
    },
    bottomView: {
        flex: 1
    },
    topNavbar: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 5
    },
    homeTitle: {
        fontSize: 35,
        color: '#000000',
        fontFamily: 'Poppins-Black'
    },
    titleWraper: {
        flex: 1,
       justifyContent: 'center'
    },
    upBtm: {
        flex: 1
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    buttonGroupCover: {

    },
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: '#DDDDDD',
        borderRadius: 30,
        paddingHorizontal: 30,
        marginTop: 8
    },
    buttonNavActive: {
        color: '#6A4029',
        padding: 4,
        borderBottomColor: '#6A4029',
        borderBottomWidth: 1,
        fontFamily: 'Poppins-Regular'
    },
    buttonNav: {
        color: '#9A9A9D',
        padding: 4,
        fontFamily: 'Poppins-Regular'
    },
    searchIcon: {
        width: 18,
        height: 18
    },
    coverSeeMore: {
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingBottom: 15
    },
    seeMore: {
        color: '#6A4029',
        fontFamily: 'Poppins-Regular'
    },
    cardCover: {
        display: 'flex',
        flexDirection: 'row',
        gap: 30,
    },
    scrollView: {
        height: 50
    },
    productCard: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        width: 140,
        height: 180,
        alignItems: 'center',
        marginTop: 40,
        position: 'relative'
    },
    productImage: {
        width: '70%',
        height: '70%',
        borderRadius: 30,
        position: 'absolute',
        top: -40,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    text: {
        position: 'absolute',
        bottom: 15
    },
    productName: {
        fontFamily: 'Poppins-Bold',
        fontSize: 22,
        textAlign: 'center',
        paddingHorizontal: 5,
        color: '#000000',
        lineHeight: 25
    },
    price: {
        color: '#6A4029',
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        paddingHorizontal: 5,
        paddingTop: 0
    },
    button: {
        backgroundColor: '#6A4029',
        borderRadius: 20,
        paddingVertical: 22,
        position: 'relative',
        marginTop: 5
    },
    textButton: {
        color: '#ffffff',
        fontFamily: 'Poppins-Bold',
        fontSize: 17,
        textAlign: 'center'
    },


})

export default style