import { gql } from "@apollo/client";

export const GET_RESERVATIONS = gql`
  query GetReservations($status: String, $date: String) {
    reservations(status: $status, date: $date) {
      id
      name
      contactInfo
      arrivalTime
      tableSize
      status
    }
  }
`;
