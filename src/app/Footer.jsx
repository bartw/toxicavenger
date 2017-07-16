import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p className="left">
          Made by{" "}
          <a href="https://bartwijnants.be" target="_blank" rel="noopener">
            Bart Wijnants
          </a>
        </p>
        <p className="right">
          <a
            href="https://github.com/bartw/toxicavenger"
            target="_blank"
            rel="noopener"
          >
            Fork me
          </a>
        </p>
      </div>
    </footer>
  );
}
