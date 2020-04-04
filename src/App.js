import React, { Component } from "react";
import Pic from "./components/Pic";
import Team from "./components/Team";
import Team2 from "./components/Team2";

import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Message from "./components/Message";
import SubHeading from "./components/SubHeading";
import pics from "./pics.json";
import IndentHeading from "./components/IndentHeading";
import "./App.css";
import BattleTitle from "./components/BattleTitle";
import Button from "./components/Buttons";

class App extends Component {
  // Setting this.state.pics to the players json array
  state = {
    pics,
    // clicked,
    score: 15,
    result: "win"
  };
  playerStats = [];
  playersOnTeam1 = [];
  playersOnTeam2 = [];
  playerImages1 = [];
  playerImages2 = [];
  clickResult = "";
  clickWinMessages = [
    "Solid Pick Up!",
    "Great Pick!",
    "Amazing Choice!",
    "Your team is unbeatable! already",
    "Winning pick"
  ];

    async componentDidMount() {
        let r = await fetch('http://192.168.0.16:5000/playerStats');
        this.playerStats = await r.json();
        console.log(this.playerStats);
        // fetch('http://localhost:5000/playerStats')
        //     .then(response => response.json())
        //     .then(response => this.playerStats = response)
        //     .catch(err => console.error(err));
    };

    // async componentDidMount() {
    //     this.getStats();
    // }

  recordScore = id => {
    let maxTeamSize = 5;
    // if the clicked player was clicked before...

    if (
      this.playersOnTeam1.length === maxTeamSize &&
      this.playersOnTeam2.length === maxTeamSize
    ) {
      this.clickResult =
        "Sorry your team is full! Trade/drop before you sign a new player";
      this.setState({
        score: this.state.score,
        result: "fail"
      });
    } else if (
      this.playersOnTeam1.includes(id) &&
      this.playersOnTeam1.length !== maxTeamSize
    ) {
      this.clickResult = "Sorry, you picked that player already.";
      this.setState({
        score: this.state.score,
        result: "fail"
      });
    } else if (this.playersOnTeam2.includes(id)) {
      this.clickResult = "Sorry, you picked that player already.";
      this.setState({
        score: this.state.score,
        result: "fail"
      });
    }
    // if the clicked player wasn't picked before...
    else {
      if (
        this.playersOnTeam1.length === maxTeamSize - 1 &&
        this.playersOnTeam2.length === 0
      ) {
        this.clickResult = "Now Its Your Opponents Turn to Pick His Team";
        ///"Sorry your team is full! Trade/drop before you sign a new player";
        this.setState({
          score: 15,
          result: "win"
        });
      } else {
        let random = Math.floor(Math.random() * this.clickWinMessages.length);
        this.clickResult = `${this.clickWinMessages[random]}`;
        let score = this.state.score;
        let newScore = score - 1;
        this.setState({
          score: newScore,
          result: "win"
        });
      }
      console.log(this.playersOnTeam1.length);
      console.log(this.playersOnTeam2.length);

      let found = pics.filter(function(item) {
        return item.id === id;
      })[0];
      if (this.playersOnTeam1.length !== maxTeamSize) {
        this.playersOnTeam1.push(id);
        this.playerImages1.push(found.image);
      } else {
        this.playersOnTeam2.push(id);
        this.playerImages2.push(found.image);
      }
    }
  };



  // Map over this.state.pics and render a Pic component for each player
  render() {
    return (
      <Wrapper main="NBA All-Star Battle">
        <Title />
        <SubHeading main="Choose your Team!" />
        <SubHeading sub={`Budget: ${this.state.score}`} />
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
        <BattleTitle />
        <IndentHeading main="Team Big Ballers:" />
        {this.playerImages1.map(player => (
          <Team image={player} />
        ))}

        <Button
          onClick={() => {
            console.log("you Clicked one me");
          }}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn-small"
        >
          Trade
        </Button>
        <Button
          onClick={() => {
            console.log("you Clicked one me");
          }}
          type="button"
          buttonStyle="btn--danger--solid"
          buttonSize="btn-small"
        >
          Drop
        </Button>

        <IndentHeading main="Versus" />
        <Button
          onClick={() => {
            console.log("you Clicked one me");
          }}
          type="button"
          buttonStyle="btn--warning--solid"
          buttonSize="btn-small"
        >
          Battle
        </Button>

        <IndentHeading main="Team Ankle Breakers:" />
        {this.playerImages2.map(player => (
          <Team2 image={player} />
        ))}
        <Button
          onClick={() => {
            console.log("you Clicked one me");
          }}
          type="button"
          buttonStyle="btn--primary--solid"
          buttonSize="btn-small"
        >
          Trade
        </Button>

        <Button
          onClick={() => {
            console.log("you Clicked one me");
          }}
          type="button"
          buttonStyle="btn--danger--solid"
          buttonSize="btn-small"
        >
          Drop
        </Button>
        <IndentHeading main="Results:" />
      </Wrapper>
    );
  }
}

export default App;
