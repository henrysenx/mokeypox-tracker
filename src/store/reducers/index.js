import { GET_COUNTRIES, SELECT_COUNTRY, FETCH_INFO } from "../types";

const initialState = {
  countriesList: [],
  monkeyPoxData: [],
  selectedCountry: {},
  monkeyPoxDataByCountry: [],
  totalMonkeyPoxDataByCountry: [],
};

const trackerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countriesList: action.payload,
      };
    case SELECT_COUNTRY:
      return {
        ...state,
        selectedCountry: action.payload,
        countriesList: state.countriesList.map(
          (country) => (country.selected = false)
        ),
        countriesList: state.countriesList.map((country) => {
          if (country.name.common === action.payload.name.common) {
            return {
              ...country,
              selected: true,
              main_name: country.name.common,
              main_capital: country.capital[0],
            };
          }
          return country;
        }),
        monkeyPoxDataByCountry: state.monkeyPoxData.filter(
          (mokeypox) => mokeypox.location === action.payload.name.common
        ),
        totalMonkeyPoxDataByCountry: state.monkeyPoxData
          .filter(
            (mokeypox) => mokeypox.location === action.payload.name.common
          )
          .reduce(
            (acc, curr) => {
              return {
                location: curr.location,
                total_cases: acc.total_cases + curr.total_cases,
                total_deaths: acc.total_deaths + curr.total_deaths,
              };
            },
            {
              total_cases: 0,
              total_deaths: 0,
            }
          ),
      };
    case FETCH_INFO:
      return {
        ...state,
        monkeyPoxData: action.payload.map((info) => {
          return {
            ...info,
            total_cases: Number(info.total_cases),
            total_deaths: Number(info.total_deaths),
            new_cases: Number(info.new_cases),
            date: info.date !== undefined ? info.date.slice(5) : info.date,
          };
        }),
      };
    default:
      return state;
  }
};

export default trackerReducer;
