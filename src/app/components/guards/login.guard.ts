export const loginGuard = () => {

    if ( localStorage.getItem('token')){
        return true;
    } else {
        return false;
    }
}
