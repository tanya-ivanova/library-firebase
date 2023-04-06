export const isUserAdmin = (user) => {
    if(user.email === 'admin@abv.bg') {
        return true;
    }

    return false;
};

export const parseQueryAll = (queryAll, query, searchBy, page) => {
    query = queryAll.split('?')[0];

    searchBy = queryAll.split('?')[1].split('=')[1];

    if (queryAll.split('?')[2]) {
        page = Number(queryAll.split('?')[2].split('=')[1]);
    }

    return {
        query,
        searchBy,
        page
    };
};

export const modifySearchForRequest = (search) => {
    let modifiedSearchForRequest;
    if (search.split(' ').length > 1) {
        modifiedSearchForRequest = search.split(' ').join('-');
    } else {
        modifiedSearchForRequest = search;
    }

    return modifiedSearchForRequest;
};

export const modifyQueryForForm = (query) => {
    let modifiedQueryForForm;
    if (query && query.split('-').length > 1) {
        modifiedQueryForForm = query.split('-').join(' ');
    } else if (query && query.split('-').length === 1) {
        modifiedQueryForForm = query;
    }

    return modifiedQueryForForm;
};
