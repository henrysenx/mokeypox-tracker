import React, { useEffect } from "react";
import Sidebar from "components/Sidebar";
import RightSidebar from "components/RightSidebar";
import Dashboard from "components/Dashboard";
import styled from "styled-components";
import scrollreveal from "scrollreveal";

import { useDispatch } from "react-redux";
import { fetchCountries, fetchInfo, selectCountry } from "./store/actions";

export default function App() {
  const dispatch = useDispatch();

  const country = {
    name: {
      common: "World",
    },
    selected: false,
  };

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchInfo());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(selectCountry(country));
    }, 3000);
  });
  useEffect(() => {
    const sr = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 1000,
      reset: false,
    });
    sr.reveal(
      `
       #sidebar
    `,
      {
        opacity: 0,
      }
    );
    const sr2 = scrollreveal({
      origin: "right",
      distance: "80px",
      duration: 1000,
      reset: false,
    });
    sr2.reveal(
      `
       #rightSidebar
    `,
      {
        opacity: 0,
      }
    );
  }, []);
  return (
    <Div>
      <Sidebar />
      <Dashboard />
      <RightSidebar />
    </Div>
  );
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 12fr 4fr;
  height: 100vh;
  /* height: max-content; */
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    grid-template-columns: 1fr;
    height: max-content;
  }
`;
