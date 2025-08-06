import { TOKEN } from "../Api/Api";
import OwnerDetailsComponent from "../Component/OwnerDetailsComponent";

export default function Profile() {
<<<<<<< HEAD
  const token = "bOJYVAykGuPS02EwMu3KndnhrJ2Ff6t6yMP1uE9O68ab63f0"
=======
  const token = TOKEN
>>>>>>> 192ae829312c3ed5f9f2dd98cd4963df58110318
  
  return <OwnerDetailsComponent token={token} isAdmin={false} />;
}