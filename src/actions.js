import {
    graphql, formatQuery, formatPageQuery, formatPageQueryWithCount, formatMessageWithValues, toISODate,
    formatJsonField, decodeId, formatMutation, formatGQLString, baseApiUrl, openBlob, apiHeaders
} from "@openimis/fe-core";
import _ from "lodash-uuid";

const FAMILY_NOTIFICATION_FULL_PROJECTION = mm => [
    "approvalOfNotification", "languageOfNotification"
  ];

export function fetchFamilyNotification(mm, familyUuid) {
    let filters = []
    if (!!familyUuid) {
      filters.push(`family_Uuid: "${familyUuid}"`)
    } else {
    }
    const payload = formatPageQuery("familyNotification",
      filters,
      FAMILY_NOTIFICATION_FULL_PROJECTION(mm)
    );
    return graphql(payload, 'FAMILY_NOTIFICATION');
  }

  function _entityAndFilters(entity, filters) {
    return `${entity}${!!filters && filters.length ? `(${filters.join(',')})` : ""}`
  }

export function generateFamilyNotificationReport(filters) {

  let url = new URL(`${window.location.origin}${baseApiUrl}/policy_notification/communication_by_notification_report/`);
  url.search = new URLSearchParams({'familyFilterJson': JSON.stringify(filters)});
  let headers = new Headers(apiHeaders());

  return (dispatch) => {
    return fetch(url, {headers,})
      .then(response => response.blob())
      .then(blob => openBlob(blob, `${_.uuid()}.pdf`, "pdf"))
      .then(e => dispatch({ type: 'FAMILY_NOTIFICATION_REPORT_DONE', payload: filters }))
  }
}

export function preview() {
  return dispatch => {
    dispatch({ type: 'FAMILY_NOTIFICATION_REPORT_PREVIEW' })
  }
}