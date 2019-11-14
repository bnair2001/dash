import React, { Component } from "react";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLabel } from "victory";

export default class PieChart extends Component {
  render() {
    return (
      <VictoryChart domainPadding={50} theme={VictoryTheme.material}>
        <VictoryBar
          alignment="start"
          labelComponent={
            <VictoryLabel
              dy={10}
              textAnchor="start"
              capHeight="string"
              angle="-45"
            />
          }
          data={this.props.data}
          x="index"
          y="names"
        />
      </VictoryChart>
    );
  }
}
