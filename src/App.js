import React, { Component } from "react";
import Pic from "./components/Pic";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Message from "./components/Message";
import pics from "./pics.json";
import "./App.css";

class App extends Component {
  // Setting this.state.pics to the players json array
  state = {
    pics,
    // clicked,
    score: 15,
    topScore: 0,
    result: "win"
  };
  playersOnTeam = [];
  clickResult = "";
  clickWinMessages = [
    "Solid Pick Up!",
    "Great Pick!",
    "MVP",
    "Easy Pick",
    "MONEYY"
  ];

  recordScore = id => {
    // if the clicked player was clicked before...
    if (this.playersOnTeam.includes(id)) {
      this.clickResult = "Sorry, you picked that player already.";
      this.setState({
        score: this.state.score,
        result: "fail"
      });
    }

    if (this.playersOnTeam > 5) {
      this.clickResult =
        "Sorry your team is full! Trade/drop before you sign a new player";
      this.setState({
        score: this.state.score,
        result: "fail"
      });
    }
    // if the clicked player wasn't picked before...
    else {
      let random = Math.floor(Math.random() * this.clickWinMessages.length);
      this.clickResult = `${this.clickWinMessages[random]}`;
      let score = this.state.score;
      console.log("score", score);
      let newScore = score - 1;
      this.playersOnTeam.push(id);
      this.setState({
        score: newScore,
        result: "win"
      });
    }
  };

  // Map over this.state.pics and render a Pic component for each player
  render() {
    return (
      <Wrapper main="NBA All-Star Battle">
        <Title />
        {`Budget: ${this.state.score}`}
        <Message message={this.clickResult} result={this.state.result} />
        {this.state.pics.map(pic => (
          <Pic
            pics={this.state.pics}
            score={this.recordScore}
            id={pic.id}
            key={pic.id}
            image={pic.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
