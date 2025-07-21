import React from "react";
import { useParams } from "react-router-dom";
import OwnerDetailsComponent from "../Component/OwnerDetailsComponent";

export default function OwnerDetails() {
  const { id } = useParams();
  const token = "G3SNaKPlCWuy2mAbgxSgpq7zz8BaVh2w7oSsRuxwec6795ec";
  
  return <OwnerDetailsComponent id={id} token={token} isAdmin={true} />;
}