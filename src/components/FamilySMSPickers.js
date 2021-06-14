import React, { Component, Fragment } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from 'react-intl';
import { Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    historyPush, withHistory, withModulesManager, journalize,
    TextInput, formatMessage, PublishedComponent, FormattedMessage, FormPanel, LanguagePicker
} from "@openimis/fe-core";
import { fetchFamilySms } from "../actions";

const styles = theme => ({
    tableTitle: theme.table.title,
    item: theme.paper.item,
    fullHeight: {
        height: "100%"
    },
});

class FamilySMSPickers extends Component {
    state = {
        approvalOfSMS: false,
        languageOfSMS: null
    }

    componentDidMount() {
        const { edited, fetchingFamilySms, familySms } = this.props
        if (!!edited && edited.uuid && !familySms) {
            this.props.fetchFamilySms(this.props.modulesManager, edited.uuid)
        } else {
            this.setState(this.state)
        }
    }

    onCheckedChange = () => {
        this.setState({ 
            approvalOfSMS: !this.state.approvalOfSMS,
            languageOfSMS: this.state.languageOfSMS
        });
    } 

    onLanguageChange = (v) => {

        this.setState({ 
            approvalOfSMS: this.state.approvalOfSMS,
            languageOfSMS: v
        });
    } 

    isChecked = () => {
        return this.state.approvalOfSMS;
    }

    getLanguageCode = () => {
        
        return this.state.languageOfSMS;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { updateAttribute, fetchedFamilySms, familySms } = this.props
        if (prevProps.fetchedFamilySms != fetchedFamilySms && familySms) {
            this.setState({
                approvalOfSMS: familySms.approvalOfSms,
                languageOfSMS: familySms.languageOfSms
            })
        } else {
            if (prevState.approvalOfSMS != this.state.approvalOfSMS 
                || prevState.languageOfSMS != this.state.languageOfSMS) {
                updateAttribute('policiesSMS', this.state)
            }
        }
    }

    selectedLanguage = () => {
        if (!!formContribution && !!formContribution['policiesSms']) {
            return formContribution['policiesSms']['languageOfSMS'];
        } else {
            return null;
        }
    }
    
    render () {
        const { intl,  classes, readOnly, updateAttribute, formData, edited, familySms } = this.props;
        return (<Grid container className={classes.item}>
                <Grid item xs={2} className={classes.item}>
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            checked={this.isChecked()}
                            disabled={readOnly}
                            onChange={e => this.onCheckedChange()}
                        />}
                    label={formatMessage(intl, "policies_sms", "smsApproval")}
                />
                </Grid>
                <Grid item xs={2} className={classes.item}>
                <PublishedComponent 
                    pubRef="core.LanguagePicker"
                    module="policy_sms"
                    value={this.getLanguageCode()}
                    readOnly={readOnly}
                    withNull={true}
                    nullLabel={"SMS Language"}
                    onChange={v => this.onLanguageChange(v)}
                    withPlaceholder={false}
                    label={formatMessage(intl, "policies_sms", "SMSLanguage.none")}
                />
                </Grid>
                </Grid>
        );
    }
}

const mapStateToProps = (state, props) => ({
    rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
    fetchingFamilySms: state.policiesSMS.fetchingFamilySms,
    fetchedFamilySms: state.policiesSMS.fetchedFamilySms,
    familySms: state.policiesSMS.familySms,
    errorFamily: state.policiesSMS.errorFamily,
    mutation: state.policiesSMS.mutation,
})

export default withModulesManager(withHistory(injectIntl(withTheme(
        connect(mapStateToProps, { fetchFamilySms, journalize })(
        withStyles(styles)(FamilySMSPickers)
)))));