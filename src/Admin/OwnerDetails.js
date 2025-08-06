import React from "react";
import { useParams } from "react-router-dom";
import OwnerDetailsComponent from "../Component/OwnerDetailsComponent";
import { TOKEN } from "../Api/Api";

export default function OwnerDetails() {
  const { id } = useParams();
<<<<<<< HEAD
  const token = "yPlMu9DzUniMPPQSqt81DD2YMmSv1zhX7RMGS74i6b055edd";
=======
  const token =  TOKEN;
>>>>>>> 192ae829312c3ed5f9f2dd98cd4963df58110318
  
  return <OwnerDetailsComponent id={id} token={token} isAdmin={true} />;
}