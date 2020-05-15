import logoUrl from "../assets/logo.png";
import css from "../lib/css";

const bar = css`
  grid-area: a;
  padding: 2px 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--light-gray);
`;

const button = css`
  --size: 48px;
  border: none;
  width: var(--size);
  height: var(--size);
  border-radius: calc(0.5 * var(--size));
  margin: 5px;
  background: none;
  outline: none;
  cursor: pointer;
`.and`:hover {
    background: var(--light-gray);
  }
`;

const group = css`
  flex: 0 0 auto;
  min-width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const logo = css`
  height: 40px;
`;

const icon = css`
  font-size: 1rem;
  color: var(--dark-gray);
`;

const input = css`
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 1rem;
`;

const searchBar = css`
  width: 50vw;
  height: calc(100% - 20px);
  padding: 5px;
  background: var(--light-gray);
  border-radius: 10px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
`.and`:focus-within {
    box-shadow: 0 1px 4px 0px var(--gray);
    background: white;
  }
`;

const searchIcon = css`
  font-size: 1rem;
  color: var(--dark-gray);
  margin: 20px;
`;

const AppBar = () => ({ toggle }) =>
  // use transform
  div((className = bar()), [
    section((className = group()), [
      button((className = button()), (onclick = toggle), [
        i((className = `fas fa-bars ${icon()}`)),
      ]),
      img((className = logo()), (src = logoUrl), (alt = "logo")),
    ]),
    section((className = searchBar()), [
      div((className = `fas fa-search ${searchIcon()}`)),
      input((className = input()), (placeholder = "Search mail")),
    ]),
    div((className = group())),
  ]);

export default AppBar;