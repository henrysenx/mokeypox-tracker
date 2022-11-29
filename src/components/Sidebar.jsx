import React, { useState } from "react";
import styled from "styled-components";
import { BiGroup, BiBell } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import { GiMonkey, GiNewspaper } from "react-icons/gi";

function Sidebar() {
  const [active, setActive] = useState("dashboard");
  return (
    <Aside id="sidebar">
      <div className="brand">
        <span>P</span>
        <GiMonkey />
        <span>X</span>
      </div>
      <ul className="links">
        <li
          onClick={() => setActive("dashboard")}
          className={`${active === "dashboard" ? "selected" : ""}`}
        >
          <GiMonkey />
        </li>
        <li
          onClick={() => setActive("blog")}
          className={`${active === "blog" ? "selected" : ""}`}
        >
          <GiNewspaper />
        </li>
        <li
          onClick={() => setActive("notification")}
          className={`${active === "notification" ? "selected" : ""}`}
        >
          <BiBell />
        </li>
        <li
          onClick={() => setActive("donate")}
          className={`${active === "donate" ? "selected" : ""}`}
        >
          <AiOutlineDollarCircle />
        </li>
        <li
          onClick={() => setActive("users")}
          className={`${active === "users" ? "selected" : ""}`}
        >
          <BiGroup />
        </li>
      </ul>
      <div className="help">
        <FiHelpCircle />
      </div>
    </Aside>
  );
}

const Aside = styled.aside`
  background-color: var(--dark-background-color);
  height: 100%;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .help {
    svg {
      transition: 0.5s ease-in-out;
      cursor: pointer;
      color: white;
    }
    &:hover {
      svg {
        color: var(--primary-color);
      }
    }
  }
  svg {
    color: var(--primary-color);
    font-size: 1.5rem;
  }
  .brand {
    display: flex;
    svg {
      font-size: 2.5rem;
    }
    span {
      color: var(--primary-color);
      font-size: 2rem;
      margin: 0 5px;
      font-weight: bold;
    }
  }
  .links {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    list-style-type: none;
    li {
      border-radius: 1rem;
      padding: 0.5rem;
      transition: 0.5s ease-in-out;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        color: white;
      }
      &:hover {
        box-shadow: 0 0 60px 8px var(--primary-color);
        svg {
          color: var(--primary-color);
        }
      }
    }
    .selected {
      box-shadow: 0 0 60px 8px var(--primary-color);
      svg {
        color: var(--primary-color);
        background-color: transparent;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    width: 100%;
    padding: 1rem;
    .links,
    .help {
      display: none;
    }
  }
`;

export default Sidebar;
