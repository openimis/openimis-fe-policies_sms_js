import {
    parseData, pageInfo, formatServerError, formatGraphQLError,
    dispatchMutationReq, dispatchMutationResp, dispatchMutationErr,
} from '@openimis/fe-core';

function reducer(
    state = {
        fetchingFamilySms: false,
        fetchedFamilySms: false,
        familySms: null,
        errorFamily: null,
        mutation: {},
    },
    action,
) {
    switch (action.type) {
        case 'FAMILY_SMS_REQ':
            return {
                ...state,
                fetchingFamilySms: true,
                fetchedFamilySms: false,
                familySms: null,
                errorFamily: null,
            };
        case 'FAMILY_SMS_RESP':
            var familySms = parseData(action.payload.data.familySms);
            return {
                ...state,
                fetchingFamilySms: false,
                fetchedFamilySms: true,
                familySms: (!!familySms && familySms.length > 0) ? familySms[0] : null,
                errorFamily: formatGraphQLError(action.payload)
            };
        case 'FAMILY_SMS_ERR':
            return {
                ...state,
                fetchingFamilySms: false,
                errorFamilySms: formatServerError(action.payload)
            };
        default:
            return state;
    }
}

export default reducer;