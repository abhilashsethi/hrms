import React from "react";

const CardHead = () => {
  return (
    <>
      <div className="px-4 py-6 shadow-md shadow-theme rounded">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:flex border-r-2">
            <div className="photo-wrapper p-2">
              <img
                className="w-32 h-32 rounded-full"
                src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
                alt="John Doe"
              />
            </div>
            <div className="px-6">
              <h1 className="md:text-4xl text-2xl font-bold capitalize">
                Jeffery Lalor
              </h1>
              <h5 className="text-gray-400 text-sm capitalize">
                UI/UX Design Team
              </h5>
              <h5 className="text-gray-400 text-md py-1 capitalize">
                Web Developer
              </h5>
              <h5 className="text-md py-1 capitalize">
                Employee Id: <span>SY-00025</span>
              </h5>
              <h5 className="text-gray-400 text-md py-1 capitalize">
                Date of Join: <span>1st Jan 2013</span>
              </h5>
              <div className="py-4">
                <button className="bg-theme rounded text-white capitalize font-medium py-4 px-8 hover:bg-theme-600">
                  Send Message
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <h5>Phone :</h5>
            <span className="col-span-2">9934567892</span>
            <h5>Email :</h5>
            <span className="col-span-2 ">xyzcom@yard.com</span>
            <h5>Birthday :</h5>
            <span className="col-span-2 ">24th July</span>
            <h5>Address :</h5>
            <span className="col-span-2 ">
              1861 Bayonne Ave, Mancheswar, Bhubaneswar,7510024
            </span>
            <h5>Gender :</h5>
            <span className="col-span-2 ">Male</span>
            <h5>Reports to :</h5>
            <span className="col-span-2">
              <div className="flex">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
                  alt="John Doe"
                />
                <span className="px-4">jcnsanclka</span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHead;
