import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { applyCardStyles } from "components/ReusableStyles";
import {
  YAxis,
  XAxis,
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useSelector } from "react-redux";

function Streams() {
  const { monkeyPoxDataByCountry } = useSelector(
    (state) => state.TrackerReducer
  );

  return (
    <Section>
      <div className="title-container">
        <div className="title">
          <h4>Monkey pox daily new cases</h4>
        </div>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monkeyPoxDataByCountry}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorview" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="10%"
                  stopColor="var(--primary-color)"
                  stopOpacity={0.4}
                />
                <stop offset="100%" stopColor="#000000ff" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="new_cases"
              stroke="var(--primary-color)"
              strokeWidth={2}
              fill="url(#colorview)"
              animationBegin={800}
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}

const Section = styled.section`
  ${applyCardStyles}
  height: 20rem;
  color: white;
  .title-container {
    display: flex;
    justify-content: space-between;

    .title {
      h1 {
        font-size: 2rem;
        letter-spacing: 0.2rem;
      }
      margin-bottom: 20px;
    }
    .slider {
      .services {
        display: flex;
        gap: 1rem;
        .service {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.6rem;
          min-width: 5rem;
          img {
            height: 2rem;
          }
        }
      }
    }
  }
  .chart {
    height: 15rem;
    .recharts-default-tooltip {
      background-color: var(--dark-background-color) !important;
      border: none !important;
      border-radius: 1rem;
      box-shadow: 0 0 60px 8px var(--primary-color);
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    height: 100%;
    .title-container {
      flex-direction: column;
      gap: 0.5rem;
      .title {
        text-align: center;
      }
      .slider {
        .services {
          display: grid;
          grid-template-columns: 1fr 1fr;
          .service {
            gap: 0.5rem;
            min-width: 1rem;
          }
        }
      }
    }
  }
`;

export default Streams;
