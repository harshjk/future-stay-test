import React, { Component } from "react";
import "./App.css";
import axiosInstance from "./utils/AxiosInstance";
import moment from "moment";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: undefined,
      loading: false,
      value: undefined
    };
    this.change = this.change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getWeather() {
    try {
      this.setState({ loading: true });
      const response = await axiosInstance.post("zip=10001");
      console.log(response.data);
      const weatherData = response.data;
      this.setState({
        loading: false,
        weather: weatherData
      });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  change(event) {
    this.setState({ value: event.target.value });
  }
  async handleSubmit(event) {
    //const instance = axios.create();
    // const response = await axios.post(
    //   "http://www.futurestaybeta.com/test3.php",
    //   {
    //     value: this.state.value
    //   }
    // );
    const res = axios({
      method: "post",
      url: "http://www.futurestaybeta.com/test3.php",
      data: {
        value: this.state.value
      }
    }).then(function(response) {
      console.log(res.data);
    });

    //event.preventDefault();
  }

  async componentDidMount() {
    await this.getWeather();
  }

  render() {
    let body = null;
    if (this.state.loading) {
      body = <div className="row">Loading...</div>;
    } else if (this.state.weather) {
      let day = "";
      const selectOptions = this.state.weather.list.map(timeWeather => {
        //date = new Date(timeWeather.dt);
        let newDay = moment(timeWeather.dt_txt).format("dddd");
        if (newDay === day) {
          return "";
        } else {
          day = newDay;
          return (
            <option value={day}>
              {timeWeather.dt_txt} pressure {timeWeather.main.pressure} hPa
            </option>
          );
        }
      });
      body = (
        <div>
          <form onSubmit={this.handleSubmit}>
            <select
              name="value"
              onChange={this.change}
              value={this.state.value}
            >
              {selectOptions}
            </select>
            <input type="submit" />
          </form>
          <div>{this.state.value}</div>
        </div>
      );
    }
    return body;
  }
}

export default App;
