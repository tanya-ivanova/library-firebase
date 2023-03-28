export const isUserAdmin = (user) => {
    if(user.email === 'admin@abv.bg') {
        return true;
    }

    return false;
};