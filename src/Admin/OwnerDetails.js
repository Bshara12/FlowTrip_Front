import React from "react";
import { useParams } from "react-router-dom";
import OwnerDetailsComponent from "../Component/OwnerDetailsComponent";

export default function OwnerDetails() {
  const { id } = useParams();
  const token = "8izVrtthWL2vU0kXrWV1w4wWqT9JT2z3M1gKY0hlfe25f76e";
  
  return <OwnerDetailsComponent id={id} token={token} isAdmin={true} />;
}