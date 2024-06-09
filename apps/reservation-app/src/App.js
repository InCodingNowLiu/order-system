import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "@apollo/client";
import { GET_RESERVATIONS } from "../queries/reservations";

const ReservationList = () => {
  const { loading, error, data } = useQuery(GET_RESERVATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {data.reservations.map((reservation) => (
        <li key={reservation.id}>
          {reservation.name} -{" "}
          {new Date(reservation.arrivalTime).toLocaleString()} -{" "}
          {reservation.status}
        </li>
      ))}
    </ul>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ReservationList />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
