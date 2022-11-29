import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { selectCountry } from "../store/actions";
import { BsSearch } from "react-icons/bs";

export default function CountryList() {
  const [input, setInput] = useState("");
  const [barOpened, setBarOpened] = useState(false);

  // search
  const [q, setQ] = useState("");
  const [searchParam] = useState(["main_name"]);

  const formRef = useRef();
  const inputFocus = useRef();

  const { countriesList } = useSelector((state) => state.TrackerReducer);
  const dispatch = useDispatch();

  const countrySelected = (country) => {
    dispatch(selectCountry(country));
  };

  const searchCountry = (items) => {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  };

  // const test = countriesList.sort((a, b) =>
  //   a.main_name.toLowerCase() > b.main_name.toLowerCase() ? 1 : -1
  // );

  // console.log(test);

  return (
    <Section>
      <div className="active">
        <Form
          barOpened={barOpened}
          onMouseMove={() => {
            // When form clicked, set state of baropened to true and focus the input
            setBarOpened(true);
            inputFocus.current.focus();
          }}
          // on focus open search bar
          onFocus={() => {
            setBarOpened(true);
            inputFocus.current.focus();
          }}
          // on blur close search bar
          onBlur={() => {
            setBarOpened(false);
          }}
          // On submit, call the onFormSubmit function

          ref={formRef}
        >
          <Button type="submit" barOpened={barOpened}>
            <BsSearch size={20} />
          </Button>
          <Input
            onChange={(e) => setQ(e.target.value)}
            ref={inputFocus}
            barOpened={barOpened}
            placeholder="Search for country..."
          />
        </Form>
        {countriesList.length > 0 &&
          searchCountry(countriesList).map((data, index) => {
            return (
              <CountryItem
                onClick={() => countrySelected(data)}
                className="country"
                key={index}
                country={data}
              >
                <div className="name">
                  <img src={`${data.flags.svg}`} alt={data.name.common} />
                  <h5>{data.name.common}</h5>
                </div>
                <h5 className="population">{data.population}</h5>
              </CountryItem>
            );
          })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  border-bottom: 0.1rem solid #242424;
  color: white;
  .title-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    padding-top: 1rem;
    .title {
      h4 {
        font-size: 0.8rem;
        margin-bottom: 0.2rem;
      }
      h1 {
        font-size: 1.5rem;
        letter-spacing: 0.2rem;
      }
    }
    .chart {
      position: relative;
      .percent {
        position: absolute;
        top: 0;
        left: 0;
        color: var(--primary-color);
        font-size: 0.8rem;
      }
      height: 4rem;
      width: 100%;
    }
  }
  .active {
    height: 80vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-right: 1.5rem;
    margin: 1rem 0;
    ::-webkit-scrollbar {
      width: 0.2rem;
      background-color: #6e6e6ec3;
      &-thumb {
        background-color: #b8b8b8;
      }
    }
    h5 {
      font-weight: 100;
    }
    .country {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      padding: 3px 5px;

      .name {
        display: flex;
        gap: 1rem;
        align-items: center;
        img {
          height: 2rem;
          width: 2rem;
          border-radius: 2rem;
        }
      }
      /* .population {
        color: var(--primary-color);
      } */
    }
  }
`;
const CountryItem = styled.div`
  background-color: ${(props) =>
    props.country.selected === true ? "var(--primary-color) " : ""};
  border-radius: ${(props) => (props.country.selected === true ? "8px " : "")};
  .population {
    color: ${(props) =>
      props.country.selected === true ? "white " : "var(--primary-color)"};
  }
  &:hover {
    background-color: var(--primary-color);
    font-size: 15px;
    border-radius: 8px;
    .population {
      color: white;
    }
  }
`;

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #37474f;
  /* Change width of the form depending if the bar is opened or not */
  width: ${(props) => (props.barOpened ? "100%" : "2rem")};
  /* If bar opened, normal cursor on the whole form. If closed, show pointer on the whole form so user knows he can click to open it */
  cursor: ${(props) => (props.barOpened ? "auto" : "pointer")};
  padding: 1.6rem 2rem;
  height: 10px;
  border-radius: 5rem;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Input = styled.input`
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  width: 100%;
  margin-left: ${(props) => (props.barOpened ? "1rem" : "0rem")};
  border: none;
  color: white;
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: white;
  }
`;

const Button = styled.button`
  line-height: 1;
  pointer-events: ${(props) => (props.barOpened ? "auto" : "none")};
  cursor: ${(props) => (props.barOpened ? "pointer" : "none")};
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
`;
