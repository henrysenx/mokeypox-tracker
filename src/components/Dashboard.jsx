import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Streams from "components/Streams";
import DailyStats from "./DailyStats";
import scrollreveal from "scrollreveal";
import DashboardCard from "./DashboardCard";
import { useSelector } from "react-redux";

function Dashboard() {
  const [totalDeath, setTotalDeath] = useState(null);
  const [totalCases, setTotalCases] = useState(null);
  const { monkeyPoxDataByCountry } = useSelector(
    (state) => state.TrackerReducer
  );

  const populateState = () => {
    if (monkeyPoxDataByCountry.length > 0) {
      setTotalCases(monkeyPoxDataByCountry[0].total_cases);
      setTotalDeath(monkeyPoxDataByCountry[0].total_deaths);
    } else {
      setTotalCases(0);
      setTotalDeath(0);
    }
  };

  useEffect(() => {
    populateState();
  }, [monkeyPoxDataByCountry]);

  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row,
        .row2
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  return (
    <Section>
      <Navbar />
      <div className="dash-cards-container">
        <DashboardCard content="Total cases" value={totalCases} />
        <DashboardCard content="Total deaths" value={totalDeath} />
      </div>
      <div className="grid">
        <div className="full-row">
          <Streams />
        </div>
        <div className="full-row">
          <DailyStats />
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  height: 100vh;
  width: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0.2rem;
    background-color: #6e6e6ec3;
    &-thumb {
      background-color: #b8b8b8;
    }
  }
  background-color: rgba(3, 3, 27, 0.7);
  .dash-cards-container {
    margin: 1rem 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    height: 10rem;
  }
  .grid {
    padding: 2rem;
    padding-top: 0;
    display: grid;
    /* grid-template-rows: 1fr 1fr; */
    /* background-color: yellow; */
    gap: 1rem;
    .full-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      /* background-color: red; */
    }
    .row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1rem;
    }
    .row2 {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 1rem;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    height: max-content;
    .grid {
      grid-template-columns: 1fr;
      padding: 1rem;
      height: max-content;
      .row,
      .row2 {
        /* height: max-content; */
        grid-template-columns: 1fr;
      }
      .dash-cards-container {
        background-color: red;
      }
    }
  }
`;

export default Dashboard;
