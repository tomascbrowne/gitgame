import React, { Component } from "react";
import CircleButtons from "./circleButtons";
import "../App.css";

class MenuButtons extends Component {
  state = {};
  render() {
    return (
      <div
        id="menu-container"
        className="grid-container"
        src={"//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"}
        src={"//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"}
        src={
          "//cdnjs.cloudflare.com/ajax/libs/jsPlumb/1.4.1/jquery.jsPlumb-1.4.1-all-min.js"
        }
      >
        <div>1</div>
        <div id="firstItem">
          <CircleButtons />
        </div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div id="secondItem">
          <CircleButtons />
        </div>
        <div>
          <CircleButtons />
        </div>
        <div>8</div>
        <div>9</div>
        <div>
          <CircleButtons />
        </div>
        <div>
          <CircleButtons />
        </div>
        <div>12</div>
        <div>13</div>
        <div>
          <CircleButtons />
        </div>
      </div>
    );
  }
}

export default MenuButtons;
