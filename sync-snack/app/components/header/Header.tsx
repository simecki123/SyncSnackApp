import { Link } from "@chakra-ui/react";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  return (
    <div className="bg-prim-cl text-black">
      <div className="flex justify-between">
        <Link href="/home" className="flex items-center ml-4">
          <img src="/logo.png" width={80} height={60} />
          <div className="font-bold text-2xl">
            SyncSnack
          </div>
        </Link>
        <div className="flex items-center max-md:hidden">
          <Link href="/leaderboard" className="mr-8 ">Leaderboard</Link>
          <Link href="/event" className="mr-8">My Event</Link>
          <Link href="/orders" className="mr-8">My Orders</Link>
        </div>
        <div className="flex items-center md:hidden">
          <HeaderMenu />
        </div >
      </div >
    </div >
  )
}
