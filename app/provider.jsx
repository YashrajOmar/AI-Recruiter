// "use client"
// import { UserDetailContext } from "@/context/UserDetailContext";
// import { supabase } from "@/services/supabaseClient"
// import { useContext, useEffect, useState } from "react";

// function Provider({ children }){

//     const [user,setUser]=useState();
//     useEffect(()=>{
//         CreateNewUser();
//     }, [])
//     const CreateNewUser=()=>{

//         supabase.auth.getUser().then(async({data:{user}})=>{
//         //check if user is already exist
//         let { data: users, error } = await supabase
//         .from('users')
//         .select("*")
//         .eq('email', user?.email);

//         console.log(users)
//         // if not then create new user
//         if(users?.length==0)
//         {
//             const { data: insertedUser, error: insertError } = await supabase.from("users").insert([
//                 {
//                     name:user?.user_metadata?.name,
//                     email:user?.email,
//                     picture:user?.user_metadata?.picture
//                 }
//             ])
//             setUser(insertedUser?.[0]);
//             return;
//         }
//         setUser(users[0]);
//         })
        
//     }
//     return (
//         <UserDetailContext.Provider value={{user, setUser}}>
//             <div>{children}</div>
//         </UserDetailContext.Provider>
//     )
// }

// export default Provider

// export const useUser=()=>{
//     const context=useContext(UserDetailContext);
//     return context;
// }
"use client";
import { useState, useEffect, useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";

function Provider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = () => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      const { data: users } = await supabase
        .from("users")
        .select("*")
        .eq("email", user?.email);

      if (users?.length === 0) {
        const { data: insertedUser } = await supabase.from("users").insert([
          {
            name: user?.user_metadata?.name,
            email: user?.email,
            picture: user?.user_metadata?.picture,
          },
        ]);
        setUser(insertedUser?.[0]);
      } else {
        setUser(users[0]);
      }
    });
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  return useContext(UserDetailContext);
};
