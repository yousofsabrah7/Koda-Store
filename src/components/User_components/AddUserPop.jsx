import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { addUser } from '../../services/endpointapi';
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
        className="bg-white/5 backdrop-blur-2xl border-2 border-white/5 rounded-2xl w-80 p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start bg-amber-400 rounded-t-2xl p-3 -m-5 mb-4">
          <div>
            <h1 className="font-bold flex items-center gap-2">
              <FontAwesomeIcon icon={faUserPlus} /> Create New User
            </h1>
            <p className="text-sm text-black/70">Fill in the details below to add a new user</p>
          </div>
          <button
            className="bg-amber-50 text-black p-1.5 rounded-xl h-fit"
            onClick={() => Setmodal(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label>Username</label>
            <input type="text" name="user-username-field" required autoComplete='off' placeholder="e.g. Mohamed Ayman" className="w-full" value={username} onChange={(e)=> setUsername(e.target.value)} />
          </div>
          <div>
            <label>Email</label>
            <input type="email"  name="user-email-field" required autoComplete='off' placeholder="e.g. islam@email.com" className="w-full " value={email} onChange={(e)=> setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password"    name="user-password-field" autoComplete='new-password' required placeholder="Min. 6 characters" className="w-full" value={password} onChange={(e)=> setPassword(e.target.value)} />
          </div>
          <div>
            <label>Phone</label>
            <input type="text" autoComplete='off'  name="user-phone-field" placeholder="e.g. +1 234 567 890" className="w-full" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={clearAll} disabled={loading}>Clear</button>
          <button disabled={loading} onClick={handleSubmit}>
            <FontAwesomeIcon icon={faUserPlus} /> {loading? 'Adding ...':'Add User'}
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default AddUserPop;