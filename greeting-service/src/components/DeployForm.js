import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  ButtonToolbar,
  Alert
} from "reactstrap";
import { db } from "../fire";
import io from "socket.io-client";
import Loading from "./Loading";
import QRModal from "./QRModal";
const styles = {
  marginTop: "80px"
};
const stylestwo = {
  textAlign: "center",

  mariginTop: "10px",
  padding: "20px"
};
const socket = io.connect("http://127.0.0.1:8000");
class DeployForm extends Component {
  state = {
    model_name: "",
    description: "",
    diseases: [],
    labels: [],
    deployed_model: {},
    deployed_model_bool: false,
    loading: false,
    error_data: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  fetchFromDB = () => {
    this.setState({ loading: true });
    db.collection("Images")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        //console.log(data);
        var temp = [];
        for (var i = 0; i < data.length; i++) {
          temp.push(data[i].label);
        }
        //console.log(temp);
        this.setState({ labels: temp }); // array of cities objects
      });
    this.setState({ loading: false });
  };
  componentDidMount() {
    this.fetchFromDB();
  }
  onCheckboxBtnClick = selected => {
    var array = [...this.state.diseases]; // make a separate copy of the array
    var index = array.indexOf(selected);
    if (index < 0) {
      array.push(selected);
    } else {
      array.splice(index, 1);
    }

    this.setState({ diseases: array });
  };

  onSubmit = event => {
    this.setState({ loading: true });
    event.preventDefault();
    const { description, model_name, diseases } = this.state;

    this.setState({
      model_name: "",
      description: "",
      diseases: []
    });

    socket.on("connect", function() {
      console.log("connected");
    });
    socket.emit("train", {
      labels: diseases,
      description: description,
      model: model_name
    });

    console.log("emitted");
    socket.on(
      "train response",
      function(deployed_model_stats) {
        this.setState({
          deployed_model: deployed_model_stats,
          deployed_model_bool: true,
          loading: false
        });
        this.fetchFromDB();
      }.bind(this)
    );
    socket.on(
      "error",
      function(error) {
        this.setState({ error_data: error.message, loading: false });
      }.bind(this)
    );

    // this.setState({ loading: false });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit} style={styles}>
          <h5>
            <strong>Make a new model:</strong>
          </h5>
          <FormGroup>
            <Label for="Model-Name">Model Name:</Label>
            <Input
              type="text"
              name="model_name"
              id="model_name"
              value={this.state.model_name}
              onChange={this.onChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description:</Label>
            <Input
              type="text"
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.onChange}
              required
            />
          </FormGroup>
          <p>Select Diseases:</p>
          <ButtonToolbar>
            <ButtonGroup>
              {this.state.labels.map((label, index) => (
                <Button
                  color="success"
                  onClick={() => this.onCheckboxBtnClick(label)}
                  active={this.state.diseases.includes(label)}
                  key={index}
                >
                  {label}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup>
              <Button onClick={this.fetchFromDB}>
                <i className="fa fa-refresh"></i>
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
          <br />
          {!this.state.loading && <Button color="primary">Deploy</Button>}
          {this.state.loading && <Loading />}
          <br />
          {this.state.deployed_model_bool && (
            <div style={stylestwo}>
              <p>
                QR-Code:
                <QRModal name={this.state.deployed_model.name} />
              </p>
            </div>
          )}
          {this.state.error_data && (
            <div style={stylestwo}>
              <p>
                <Alert color="danger">{this.state.error_data}</Alert>
              </p>
            </div>
          )}
        </Form>
      </div>
    );
  }
}

export default DeployForm;
