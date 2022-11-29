import { GET_COUNTRIES, SELECT_COUNTRY, FETCH_INFO } from "../types";
import Papa from "papaparse";
import monkeyPoxCsv from "./owid-monkeypox-data.csv";
import axios from "axios";

export const fetchCountries = () => {
  return (dispatch) => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        dispatch({
          type: GET_COUNTRIES,
          payload: response.data
            .map((country) => {
              return {
                ...country,
                selected: false,
                main_name: country.name.common,
              };
            })
            .sort((a, b) =>
              a.main_name.toLowerCase() > b.main_name.toLowerCase() ? 1 : -1
            ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const selectCountry = (country) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_COUNTRY,
      payload: country,
    });
  };
};

export const fetchInfo = () => {
  return (dispatch) => {
    Papa.parse(monkeyPoxCsv, {
      header: true,
      download: true,
      complete: (results) => {
        dispatch({
          type: FETCH_INFO,
          payload: results.data,
        });
      },
    });
  };
};
