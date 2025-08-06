import OwnerDetailsComponent from "../Component/OwnerDetailsComponent";

export default function Profile() {
  const token = "bOJYVAykGuPS02EwMu3KndnhrJ2Ff6t6yMP1uE9O68ab63f0"
  
  return <OwnerDetailsComponent token={token} isAdmin={false} />;
}