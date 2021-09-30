import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <h4 style={{ fontWeight: "400" }}>
          ADOFAI.GG is not associated with{" "}
          <a href="https://7thbe.at/" target="_blank" rel="noreferrer">
            7th Beat Games
          </a>
          {". | "}
          <a
            href="https://discord.gg/TKdpbUUfUa"
            target="_blank"
            rel="noreferrer"
          >
            Join Our Discord
          </a>
          {" | "}
          <a href="mailto:adofai.gg@gmail.com">Contact Us</a>
          {" | Powered By "}
          <a href="https://www.hanmesoft.com/" target="_blank" rel="noreferrer">
            Hanmesoft
          </a>
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
