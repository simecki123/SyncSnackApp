import { auth } from "../auth";
import AreaClientPage from "./AreaClientPage";

export default async function Area52Page() {

  const session = await auth();
  const activeUser: any = session?.user;

  console.log(activeUser, '---> active user')

  return (
    <AreaClientPage activeUser={activeUser} />
  )
}
