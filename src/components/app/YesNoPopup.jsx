import React from "react";

const Popup = ({ text, onYes, onNo }) =>
  <div className="overlay">
    <div className="popup">
      <div className="header">
        <a onClick={onNo} className="close">
          x
        </a>
        <h4>Confirm</h4>
      </div>
      <p>
        {text}
      </p>
      <div className="actions">
        <a onClick={onYes}>Yes</a>
        <a onClick={onNo}>No</a>
      </div>
    </div>
  </div>;

export default class YesNoPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
  }

  action = () => {
    this.props.action();
    this.hidePopup();
  };

  showPopup = () => {
    this.setState({ showPopup: true });
  };

  hidePopup = () => {
    this.setState({ showPopup: false });
  };

  render() {
    return (
      <span>
        <a onClick={this.showPopup}>
          {this.props.linkText}
        </a>
        {this.state.showPopup &&
          <Popup
            text={this.props.text}
            onYes={this.action}
            onNo={this.hidePopup}
          />}
      </span>
    );
  }
}
