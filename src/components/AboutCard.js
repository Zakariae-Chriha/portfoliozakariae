import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Zakariae Chriha </span>
            from <span className="purple"> Meknes, Marocco.</span>
            <br />
            <br />
            Passionate about programming and Web development. I am currently
            looking for a position of Web front-end Developer in an exciting
            work environment.
            <br />
            <br />
            I am a curious and detail-oriented programmer who enjoys working in
            a team and learning about new technologies and best practices.
            <br />
            <br />
            If you are a recruiter and you wish to get to know me and my skills
            better, you are most welcome to get in touch.
            <br />
            <br />
            If you are a developer and wish to get in touch, please do send me a
            connection request: I would be happy to exchange ideas and best
            practices. Apart from coding, some other activities that I love to
            do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Playing Football
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Zakariae</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
