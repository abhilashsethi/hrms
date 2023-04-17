import React from "react";

const PersonalInfo = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 py-6">
        <div className="rounded shadow-md px-6 py-4">
          <h1 className="text-xl font-medium py-2">Personal Informations</h1>
          <div className="grid grid-cols-3 gap-1 py-2">
            <h5>Passport No. :</h5>
            <span className="col-span-2">9934567892</span>
            <h5>Passport Exp Date :</h5>
            <span className="col-span-2 ">9876543210</span>
            <h5>Tel :</h5>
            <span className="col-span-2 ">9876543210</span>
            <h5>Nationality :</h5>
            <span className="col-span-2 ">Indian</span>
            <h5>Religion :</h5>
            <span className="col-span-2 ">Hindu</span>
            <h5>Marital status :</h5>
            <span className="col-span-2 ">Married</span>
            <h5>Employment of spouse :</h5>
            <span className="col-span-2 ">No</span>
            <h5>No. of children :</h5>
            <span className="col-span-2 ">2</span>
          </div>
        </div>
        <div className="rounded shadow-md px-6 py-4">
          <h1 className="text-xl font-medium py-2">Emergency Contact</h1>
          <h5>Primary</h5>
          <div className="grid grid-cols-3">
            <h5>Primary Name :</h5>
            <span className="col-span-2">John Doe</span>
            <h5>Relationship :</h5>
            <span className="col-span-2 ">Father</span>
            <h5>Phone :</h5>
            <span className="col-span-2 ">9954882222</span>
          </div>
          <h5>Secondary</h5>
          <div className="grid grid-cols-3">
            <h5>Name :</h5>
            <span className="col-span-2 ">Karen Wills</span>
            <h5>Relationship :</h5>
            <span className="col-span-2 ">Brother</span>
            <h5>Name :</h5>
            <span className="col-span-2 ">Karen Wills</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
