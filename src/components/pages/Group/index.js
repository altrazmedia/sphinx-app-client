import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Loader, Illustration } from "components/common";

import { Trans } from "react-i18next";
import { fetchSingleGroup } from "actions/groupsActions";

import View from "./View";

class Group extends PureComponent {

  state = {
    loading: true,
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.group.loading !== this.state.loading) {
      this.setState({ loading: this.props.group.loading })
    }

    if (this.props.history.location.pathname !== prevProps.history.location.pathname) {
      this.fetchGroup();
    }
  }

  componentDidMount = () => {
    this.fetchGroup();
  }

  fetchGroup = () => {
    const { code } = this.props.match.params;

    this.props.fetchGroup({ code });
  }


  render = () => {

    const { loading } = this.state;
    const { group } = this.props;

    return (
      <div>
        {
          loading ? 
            <Loader />
          : group.error ?  
            group.error.status === 404 ? 
              <Illustration 
                image="search" 
                header={<Trans i18nKey="group.notFound" />} 
                description={<Trans i18nKey="makeSureUrl" />} />
            : group.error.status === 403 ? 
              <Illustration variant="notPermitted" />
            : <Illustration variant="fetchError" />
          : <View group={group.data} />
        }
      </div>
    )

  }

}

const READ = state => ({
  group: state.groups.single,
})

const EMIT = dispatch => ({
  fetchGroup: (payload) => dispatch(fetchSingleGroup(payload))
})

export default connect(READ, EMIT)(Group);