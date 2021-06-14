import {
    graphql, formatQuery, formatPageQuery, formatPageQueryWithCount,
    formatJsonField, decodeId, formatMutation, formatGQLString
  } from "@openimis/fe-core";

const FAMILY_SMS_FULL_PROJECTION = mm => [
    "approvalOfSms", "languageOfSms"
  ];

export function fetchFamilySms(mm, familyUuid) {
    let filters = []
    if (!!familyUuid) {
      filters.push(`family_Uuid: "${familyUuid}"`)
    } else {
    }
    const payload = formatPageQuery("familySms",
      filters,
      FAMILY_SMS_FULL_PROJECTION(mm)
    );
    return graphql(payload, 'FAMILY_SMS');
  }