import supabase from "../lib/supabase-client";
import { useEffect } from "react";

function Users() {
  useEffect(()=>{
    async function getData(){
      const data = await supabase.from("users").select();
      console.log(data);
    }
    getData();
  },[])
  return (
    <div>
      <h1>Users</h1>
        <div className="UsersPlaceholder"></div> {/* Add this line */}
      {/* Users content goes here */}
    </div>
  );
}

export default Users;