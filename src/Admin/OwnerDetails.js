import React from "react";
import { useParams } from "react-router-dom";
import OwnerDetailsComponent from "../Component/OwnerDetailsComponent";

export default function OwnerDetails() {
  const { id } = useParams();
  const token = "yPlMu9DzUniMPPQSqt81DD2YMmSv1zhX7RMGS74i6b055edd";
  
  return <OwnerDetailsComponent id={id} token={token} isAdmin={true} />;
}