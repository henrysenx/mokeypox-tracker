import React from "react";
import styled from "styled-components";
import { applyCardStyles } from "components/ReusableStyles";
import { useSelector } from "react-redux";

function DailyStats() {
  const { monkeyPoxDataByCountry } = useSelector(
    (state) => state.TrackerReducer
  );

  return (
    <Section>
      <div className="title-container">
        <div className="title">
          <h4>Daily Statistics</h4>
        </div>
        <div className="filters">
          <span>
            {monkeyPoxDataByCountry.length > 0 &&
              `${
                monkeyPoxDataByCountry[monkeyPoxDataByCountry.length - 1].date
              } - ${monkeyPoxDataByCountry[0].date}`}
          </span>
        </div>
      </div>
      <div className="flex gap-2 column">
        <div className="container">
          <div className="header subdue">
            <span>#</span>
            <span>Location</span>
            <span>Date</span>
            <span>New Cases</span>
            <span>New deaths</span>
          </div>
          <div className="body">
            {monkeyPoxDataByCountry
              .reverse()
              .map(({ location, date, new_cases, new_deaths }, index) => {
                return (
                  <div className="data-body" key={index}>
                    <span>{index + 1}</span>
                    <div className="name flex gap-1 a-center">
                      <span>{location}</span>
                    </div>
                    <span>{date}</span>
                    <span>{new_cases}</span>
                    <span>{new_deaths}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* <div className="musics">
        {music.map(({ title, plays, image }) => {
          return (
            <div className="music" key={title}>
              <div className="details">
                <div className="image">
                  <img src={image} alt="title" />
                </div>
                <div className="info">
                  <h5>{title}</h5>
                  <h6>{plays}K Plays</h6>
                </div>
              </div>
              <BsChevronRight />
            </div>
          );
        })}
      </div> */}
    </Section>
  );
}

const Section = styled.section`
  ${applyCardStyles}
  color:white;

  .body {
    height: 20rem;
    overflow: auto;
    ::-webkit-scrollbar {
      width: 0.2rem;
      background-color: #6e6e6ec3;
      &-thumb {
        background-color: #b8b8b8;
      }
    }
  }
  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .title {
    }
    .filters {
      display: flex;
      align-items: center;
      gap: 3rem;
      color: var(--primary-color);
      padding: 0 20px;
      button {
        background-color: var(--primary-color);
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem 0.8rem;
        cursor: pointer;
        font-weight: bolder;
      }
    }
  }
  .header {
    border-bottom: 1px solid #ffffff42;
    padding-bottom: 1rem;
    padding: 2rem;
    span {
    }
  }
  .header,
  .data {
    display: grid;
    grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
  }
  .data-body {
    display: grid;
    grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .title-container {
      flex-direction: column;
      gap: 0.5rem;
      .filters {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  }
`;

export default DailyStats;
