import React, { Component } from "react";
import branch from "./branch.png";
import checkout from "./checkout.png";
import commit from "./commit.png";
import merge from "./merge1.png";
import merge2 from "./merge2.png";
import branchg from "./branch_gif.gif.gif";
import checkoutg from "./checkout_gif.gif.gif";
import commitg from "./commit_gif.gif.gif";
import mergeg from "./merge_gif.gif.gif";
import mergeg2 from "./merge2_gif.gif.gif";
import { MDBContainer, MDBScrollbar } from "mdbreact";

class Tutorial extends Component {
  state = {};
  render() {
    const scrollContainerStyle = {
      width: "100%",
      height: "500px",
      padding: "10px",
      maxHeight: "1000px"
    };
    return (
      <>
        <MDBContainer>
          <div
            className="scrollbar my-5 mx-auto"
            id="section1"
            style={scrollContainerStyle}
          >
            <p>
              {" "}
              The user is able create a branch by using the command: git branch{" "}
              {"<"}branch_name{">"}{" "}
            </p>
            <img src={branchg}></img>
            <p>
              {" "}
              The user is then able to checkout an existing branch by using the
              command: git checkout
              {"<"}branch_name{">"} , the current branch tab will indicate to
              the user which branch is currently checked out
            </p>
            <img src={checkoutg}></img>
            <p>
              {" "}
              Commiting can be done by using the command: git commit -m
              "message"
            </p>
            <img src={commitg}></img>
            <p>
              {" "}
              Merging can be done in one of two ways, the first being: git merge
              {"<"}branch_name{">"} Which will merge the target branch to the
              current branch checked out
            </p>
            <img src={mergeg}></img>
            <p>
              {" "}
              The other way of merge is to give the a branch and a target branch
              to be merged into: git merge {"<"}branch_name{">"} {"<"}
              target_branch_name{">"}
            </p>
            <img src={mergeg2}></img>
          </div>
        </MDBContainer>
      </>
    );
  }
}

export default Tutorial;
