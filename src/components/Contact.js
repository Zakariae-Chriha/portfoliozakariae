import "../styles/Contact.css";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_wf9xhsw",
        "template_7ivhia6",
        form.current,
        "3Dafb64jHMManKUW3"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("msg send");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="container">
      <div className="contact-parent">
        <div className="contact-child child1">
          <p>
            <i className="fas fa-map-marker-alt"></i> Address <br />
            <span>
              {" "}
              Bredow str.20A
              <br />
              Berlin, Deutschland
            </span>
          </p>
          <p>
            <i className="fas fa-phone-alt"></i> Let's Talk <br />
            <span> 017677401834</span>
          </p>
          <p>
            <i className=" far fa-envelope"></i> General Support <br />
            <span>chrihazakaria@gmail.com</span>
          </p>
        </div>
        <div className="contact-child child2">
          <form ref={form} onSubmit={sendEmail}>
            <div className="inside-contact">
              <h2>Contact me</h2>

              <p>Name *</p>
              <input
                id="txt_name"
                type="text"
                Required="required"
                name="user_name"
              />
              <br />
              <br />
              <br />

              <p>Email *</p>
              <input
                id="txt_email"
                type="text"
                Required="required"
                name="user_email"
              />
              <br />
              <br />
              <br />

              <p>Message *</p>
              <textarea
                name="message"
                id="txt_message"
                rows="4"
                cols="20"
                Required="required"
              ></textarea>
              <br />
              <br />
              <br />

              <input type="submit" id="btn_send" value="SEND" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
