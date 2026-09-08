import React, { useState } from 'react'
import Header1 from '../../components/User_components/Header1'
import AddUserPop from '../../components/User_components/AddUserPop'
import Toastuser from '../../components/User_components/Toastuser'
import Statecard from '../../components/User_components/Statecard'
import UserBoardFormation from '../../components/User_components/UserBoardFormation'
const Users = ({modal,Setmodal}) => {

  const [toast,setToast]=useState(null);
  return (
    <>
   <Header1 modal={modal} Setmodal={Setmodal}/>
   <AddUserPop  modal={modal} Setmodal={Setmodal} setToast={setToast}/>
{toast&&<Toastuser message={toast.message} type={toast.type}/>}
<Statecard/>
<UserBoardFormation/>

   </>
  )
}

export default Users