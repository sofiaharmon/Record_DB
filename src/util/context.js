import  jwtDecode  from 'jwt-decode';

function getCurrUser() {
    const localToken = localStorage.getItem("token")
    if (localToken) {
        const decoded = jwtDecode(localToken)
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            return false;
        }
        else {
            return true;
        }
    } else {
        return false;
    }
}

export default getCurrUser