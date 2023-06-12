import {API_URL} from 'react-native-dotenv'
import { useSelector } from 'react-redux'

const doLogout = async() => {
    const { userId, token } = useSelector(state => state.userInfo)
    try {
        const urlVerify = `${API_URL}/auth/verify`
        await axios.get(urlVerify, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const url = `${API_URL}/auth/logout`
        await axios.post(url, { userId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log('berhasil logout');
    } catch (error) {
        console.log(error.response.data.msg);
    }
}

export default doLogout