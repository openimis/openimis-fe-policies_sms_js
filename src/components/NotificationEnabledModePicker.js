import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from 'react-intl';
import { formatMessage, SelectInput, withModulesManager } from "@openimis/fe-core";
import _debounce from "lodash/debounce";
import _ from "lodash";

class NotificationEnabledModePicker extends Component {

    state = {
        value: 0
    }

    nullDisplay = formatMessage(this.props.intl, "policy_notification", `Mode.null`)

    formatSuggestion = i => `${formatMessage(this.props.intl, "policy_notification", `Mode.${i}`)}`
    onSuggestionSelected = v => {
        // this.props.onChangeFilters(v, this.formatSuggestion(v));
        this.props.onChangeFilters('policyNotification', [
            {
                id: 'mode',
                value: !!v ? v : 0,
            }
        ]);
        this.setState({value: v})
        
    }

    render() {
        const { intl, modes, module = "policy_notification", withLabel = true, label = "ModePicker.label", 
            withPlaceholder = true, placeholder, reset,
            readOnly = false, required = false
        } = this.props;
        
        let options = !!modes ? modes.map(v => ({ value: v, label: this.formatSuggestion(v) })) : []
        
        return <SelectInput
            module={module}
            options={options}
            label={!!withLabel ? label : null}
            placeholder={!!withPlaceholder ? (placeholder || formatMessage(intl, "policy_notification", "ModePicker.placehoder")) : null}
            onChange={this.onSuggestionSelected}
            value={this.state.value}
            reset={reset}
            readOnly={readOnly}
            required={required}
        />
    }
}

const mapStateToProps = state => ({
    modes: state.PolicyNotification.modes,
});

export default injectIntl(connect(mapStateToProps)(withModulesManager(NotificationEnabledModePicker)));
