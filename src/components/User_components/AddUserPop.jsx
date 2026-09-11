import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { addUser } from "../../services/api/usersApi";
const AddUserPop = ({ modal, Setmodal,setToast }) => {
  if (!modal) return null; // علشان لو حصل مشكلة يرجع null 
const [username,setUsername]=useState('');
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [phone,setPhone]=useState('');
const [loading,setLoading]=useState(false);

const clearAll=()=>{
  setUsername('');
  setEmail('');
  setPassword('');
  setPhone('');
}

const handleSubmit= async ()=>{
  setLoading(true);


try{
  await addUser({username,email,password,phone}) // wait for the data to be send to the api
  clearAll();
  Setmodal(false);
  setToast({message:'User added successfully!',type:'success'})
  setTimeout(()=>setToast(null),3000);
}
catch(err){
setToast({
  message:err.response?.data?.message||'Something went wrong. Please try again.',
  type:'error'
})
setTimeout(()=>setToast(null),3000);
}
finally{
  setLoading(false)
}
}
  return (
  <div
  className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
  onClick={() => Setmodal(false)}
>
  <div
    className="bg-surface-card backdrop-blur-2xl border-2 border-border-subtle rounded-2xl w-80 p-5"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="flex justify-between items-start bg-accent rounded-t-2xl p-3 -m-5 mb-4">
      <div>
        <h1 className="font-bold flex items-center gap-2 text-white">
          <FontAwesomeIcon icon={faUserPlus} /> Create New User
        </h1>
        <p className="text-sm text-white/70">Fill in the details below to add a new user</p>
      </div>
      <button
        className="bg-surface-elevated text-text-primary p-1.5 rounded-xl h-fit"
        onClick={() => Setmodal(false)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>

    <div className="flex flex-col gap-3 text-text-primary">
      <div>
        <label className="text-text-secondary text-sm">Username</label>
        <input type="text" name="user-username-field" required autoComplete='off' placeholder="e.g. Mohamed Ayman"
          className="w-full bg-surface-elevated border border-border-subtle rounded-md px-3 py-1.5 outline-none focus:border-accent"
          value={username} onChange={(e)=> setUsername(e.target.value)} />
      </div>
      {/* same pattern for email, password, phone inputs */}
    </div>

    <div className="flex justify-between mt-4">
      <button className="text-text-secondary" onClick={clearAll} disabled={loading}>Clear</button>
      <button className="bg-accent hover:bg-accent-hover text-white rounded-md px-4 py-2" disabled={loading} onClick={handleSubmit}>
        <FontAwesomeIcon icon={faUserPlus} /> {loading? 'Adding ...':'Add User'}
      </button>
    </div>
  </div>
</div>
  );
};

export default AddUserPop;