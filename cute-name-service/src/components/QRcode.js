import React, { Component } from "react";
import QRCode from "qrcode-react";

export default class QRcode extends Component {
  render() {
    return (
      <div>
        <QRCode value={"https://www.google.com/search?q=" + this.props.name} />,
      </div>
    );
  }
}
