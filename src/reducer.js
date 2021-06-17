import {
    parseData, pageInfo, formatServerError, formatGraphQLError,
    dispatchMutationReq, dispatchMutationResp, dispatchMutationErr,
} from '@openimis/fe-core';

function reducer(
    state = {
        fetchingfamilyNotification: false,
        fetchedfamilyNotification: false,
        familyNotification: null,
        errorFamily: null,
        mutation: {},
    },
    action,
) {
    switch (action.type) {
        case 'FAMILY_NOTIFICATION_REQ':
            return {
                ...state,
                fetchingfamilyNotification: true,
                fetchedfamilyNotification: false,
                familyNotification: null,
                errorFamily: null,
            };
        case 'FAMILY_NOTIFICATION_RESP':
            var familyNotification = parseData(action.payload.data.familyNotification);
            return {
                ...state,
                fetchingfamilyNotification: false,
                fetchedfamilyNotification: true,
                familyNotification: (!!familyNotification && familyNotification.length > 0) ? familyNotification[0] : null,
                errorFamily: formatGraphQLError(action.payload)
            };
        case 'FAMILY_NOTIFICATION_ERR':
            return {
                ...state,
                fetchingfamilyNotification: false,
                errorfamilyNotification: formatServerError(action.payload)
            };
        default:
            return state;
    }
}

export default reducer;