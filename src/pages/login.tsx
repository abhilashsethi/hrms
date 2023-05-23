// import { LoginBG } from "@/assets";
// import { BGLOGIN } from "@/assets/login";
import { BGLOGIN } from "assets/dashboard_Icons";
import LoginAuth from "components/loginAuth";
import React from "react";

const Login = () => {
	return (
		<div
			className="w-full flex-wrap flex-col items-center background-remove bg-white justify-center  min-h"
			style={{
				backgroundImage: `url(${BGLOGIN.src})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<LoginAuth />
		</div>
	);
};

export default Login;
