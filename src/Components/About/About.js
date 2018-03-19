import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class About extends Component {
  render() {
    return (
      <div className="About">
        <h1>Techs Used</h1>
        <p>1.Redux</p>
        <p>2.Nodemailer</p>
        <p>3.Sweet Alerts</p>
        <p>4.Stripe</p>

        <h2>Credit</h2>
        <p> Home by Viktor Vorobyev from the Noun Project </p>
        <p>Store by arejoenah from the Noun Project</p>
        <p>cart by Gurkenkoenig from the Noun Project</p>
        <p>Login by Roselin Christina.S from the Noun Project</p>
        <p>History by Xinh Studio from the Noun Project</p>
        <p>all Rolex images and branding belongs to Rolex</p>
      </div>
    );
  }
}
export default About;
