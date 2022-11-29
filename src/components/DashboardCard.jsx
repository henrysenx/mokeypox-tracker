import React from "react";
import styled from "styled-components";
import { applyCardStyles } from "components/ReusableStyles";
import { GiMonkey, GiDeathSkull } from "react-icons/gi";

const DashboardCard = ({ content, value }) => {
  return (
    <Section className="">
      <div className="content">
        <div className="left-content">
          <div className="img-wrap">
            {content === "Total cases" ? (
              <GiMonkey />
            ) : (
              <GiDeathSkull color="red" />
            )}
          </div>
        </div>
        <div className="right-content">
          <h5
            className={` ${
              content === "Total cases" ? "text-white" : "text-red"
            }`}
          >
            {content}
          </h5>
          {value !== null && (
            <h1
              className={` ${
                content !== null && content === "Total cases"
                  ? "text-white"
                  : "text-red"
              }`}
            >
              {value}
            </h1>
          )}
        </div>
      </div>
    </Section>
  );
};

const Section = styled.section`
  ${applyCardStyles}
  .content {
    width: 100%;
    height: 100%;
    display: flex;

    /* align-items: center; */
    padding: 0 1rem;
    h1 {
      color: white;
    }
    .left-content {
      /* background-color: yellow; */
      width: 50%;
      display: flex;
      align-items: center;

      .img-wrap {
        background-color: #494f55;
        width: 50px;
        height: 50px;
        border-radius: 40px;
        padding: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          font-size: 1.6rem;
          color: white;
        }
      }
      h1 {
        margin-top: 10px;
      }
      .text-red {
        color: red;
      }
      .text-white {
        color: white;
      }
    }
    .right-content {
      /* background-color: yellow; */
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      h1 {
        font-size: 2rem;
      }
      .text-red {
        color: red;
      }
      .text-white {
        color: white;
      }
    }
  }
`;

export default DashboardCard;
