import React from "react";
import logo from "../assets/images/logo.svg";

import './footer.css'

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-top">
                <img src={logo} alt="" className="logo"/>
                <div className="vertical-line"></div>
                <div className="footer-top_right">
                    Learning online <br/> effectively
                </div>
            </div>

            <div className="footer-body">
                <div className="subscribe">Subscribe us to get our Newsletter</div>
                <div className="email">
                    <input type="text" placeholder="Your email"/>
                    <button className="subscribe-button">Subscribe</button>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-texts">
                    <div className="ft-text">Careers Privacy Policy</div>
                    <div className="ft-text">|</div>
                    <div className="ft-text">Term & Condition</div>
                </div>
                <div className="company">© 2021 Class Technologies Inc.</div>
            </div>
        </div>
    );
}

export default Footer;