import {
    graphql, formatQuery, formatPageQuery, formatPageQueryWithCount,
    formatJsonField, decodeId, formatMutation, formatGQLString
  } from "@openimis/fe-core";

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