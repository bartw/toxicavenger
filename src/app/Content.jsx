import React from "react";
import Teams from "../teams/Teams";
import Requests from "../requests/Requests";
import Members from "../members/Members";
import Sprints from "../sprints/Sprints";
import Waste from "../waste/Waste";
import WasteChart from "../visualization/WasteChart";
import GoBackWrapper from "../navigation/GoBackWrapper";

const TEAMS = "TEAMS";
const REQUESTS = "REQUESTS";
const MEMBERS = "MEMBERS";
const SPRINTS = "SPRINTS";
const WASTE = "WASTE";
const VISUALIZATION = "VISUALIZATION";

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: TEAMS
    };
  }

  onShowSprints = team => {
    this.setState({ activePage: SPRINTS, team: team });
  };

  onShowRequests = team => {
    this.setState({ activePage: REQUESTS, team: team });
  };

  onShowMembers = team => {
    this.setState({ activePage: MEMBERS, team: team });
  };

  onShowWaste = sprint => {
    this.setState({ activePage: WASTE, sprint: sprint });
  };

  onShowVisualization = sprint => {
    this.setState({ activePage: VISUALIZATION, sprint: sprint });
  };

  render() {
    return (
      <div>
        {this.state.activePage === TEAMS &&
          <Teams
            user={this.props.user}
            onShowSprints={this.onShowSprints}
            onShowRequests={this.onShowRequests}
            onShowMembers={this.onShowMembers}
          />}
        {this.state.activePage === REQUESTS &&
          <GoBackWrapper
            onGoBack={() => this.setState({ activePage: TEAMS, team: null })}
          >
            <Requests team={this.state.team} />
          </GoBackWrapper>}
        {this.state.activePage === MEMBERS &&
          <GoBackWrapper
            onGoBack={() => this.setState({ activePage: TEAMS, team: null })}
          >
            <Members team={this.state.team} />
          </GoBackWrapper>}
        {this.state.activePage === SPRINTS &&
          <GoBackWrapper
            onGoBack={() => this.setState({ activePage: TEAMS, team: null })}
          >
            <Sprints
              user={this.props.user.uid}
              team={this.state.team}
              onShowWaste={this.onShowWaste}
              onShowVisualization={this.onShowVisualization}
            />
          </GoBackWrapper>}
        {this.state.activePage === WASTE &&
          <GoBackWrapper
            onGoBack={() =>
              this.setState({ activePage: SPRINTS, sprint: null })}
          >
            <Waste team={this.state.team} sprint={this.state.sprint} user={this.props.user} />
          </GoBackWrapper>}
        {this.state.activePage === VISUALIZATION &&
          <GoBackWrapper
            onGoBack={() =>
              this.setState({ activePage: SPRINTS, sprint: null })}
          >
            <WasteChart team={this.state.team} sprint={this.state.sprint} user={this.props.user.uid} />
          </GoBackWrapper>}
      </div>
    );
  }
}
