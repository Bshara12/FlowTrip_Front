import OwnerDetailsComponent from "../Component/OwnerDetailsComponent";

export default function Profile() {
  const token = "NYSAf4ryQT18IPkGxtbRGXRM28CIKN0rBZMmdela92fdd6fa"
  
  return <OwnerDetailsComponent token={token} isAdmin={false} />;
}