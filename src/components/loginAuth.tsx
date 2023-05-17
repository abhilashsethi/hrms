// import { Hide, Logo, View } from "@/assets/login";
import React, { useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Hide, Logo, View } from "assets/dashboard_Icons";

const LoginSchema = [
	{
		key: "1",
		label: "Email",
		placeHolder: "Type Your Email",
		icon: "",
		name: "email",
		type: "text",
		validationSchema: Yup.string()
			.required("Email is required")
			.email("Invalid Email Address"),
		initialValue: "",
	},
	{
		key: "2",
		label: "Password",
		placeHolder: "Type Your Password",
		icon: "",
		name: "password",
		type: "password",
		validationSchema: Yup.string()
			.min(6, "Password must be at least 6 characters")
			.required("Password is required"),
		initialValue: "",
	},
];

const initialValues = LoginSchema.reduce(
	(accumulator: any, currentValue: any) => {
		accumulator[currentValue?.name] = currentValue.initialValue;
		return accumulator;
	},
	{} as { [key: string]: string }
);

const validationSchema = LoginSchema.reduce((accumulator, currentValue) => {
	accumulator[currentValue.name] = currentValue.validationSchema;
	return accumulator;
}, {} as { [key: string]: any });

const LoginAuth = () => {
	const [showPassword, setShowPassword] = useState(false);
	const handleLogin = (values: any) => {
		console.log(values);
	};
	return (
		<article className="w-full md:flex-row flex flex-col justify-center items-center gap-5 text-themeDarkGray min-h-screen">
			<section className="lg:w-9/12 w-full md:flex-row flex flex-col">
				<div className="md:w-3/5 w-full md:h-[30rem] h-[22rem] relative overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-blue-300 rounded-l bg-gradient-to-t from-blue-400 to-white py-3">
					<div className="flex md:w-[12rem] w-[10rem] md:h-[12rem] h-[10rem] bg-blue-200 rotate-animation-one absolute top-[110px] left-[-50px] items-center justify-center rotate-[38deg]">
						<div className="md:w-[7rem] w-[5rem] md:h-[7rem] h-[5rem]  bg-[#FFB774]"></div>
					</div>
					<div className="flex absolute z-[30]  top-4 left-4 items-center justify-center px-8">
						<img src={Logo.src} alt="logo" className="w-full h-10" />
					</div>
					<div className="flex  absolute md:top-60 z-[30] top-20 left-4 flex-col h-full gap-4 px-8">
						<h1 className="md:text-4xl text-3xl text-purple-600 font-bold text-start">
							Welcome to <span className="text-purple-600">H</span>Rms{" "}
						</h1>
						<p className="text-themeDarkGray md:font-semibold text-base md:tracking-wide tracking-normal  leading-6 md:text-start text-justify">
							It is a long established fact that a reader will be distracted by
							the readable content of a page when looking at its layout. The
							point of using Lorem Ipsum is that it has a more-or-less normal
							distribution of letters,
						</p>
					</div>
					<div className="flex md:w-[12rem] w-[10rem] md:h-[12rem] h-[10rem] rotate-animation-two bg-blue-200 absolute top-[-50px] right-[-50px] items-center justify-center rotate-[38deg]">
						<div className="md:w-[7rem] w-[5rem] md:h-[7rem] h-[5rem]  bg-[#525fa7] "></div>
					</div>
				</div>
				<div className="md:w-2/5 w-full h-[30rem] bg-white rounded-r">
					<div className="flex flex-col items-start justify-center h-full gap-4 px-8">
						<h1 className="text-2xl text-themeDarkGray font-bold text-start">
							Login
						</h1>
						<p className="text-blue-950 text-base leading-7 text-start">
							Sign in by entering information below
						</p>
						<Formik
							initialValues={initialValues}
							validationSchema={Yup.object(validationSchema)}
							onSubmit={handleLogin}
						>
							{(formik) => (
								<Form className="flex flex-col gap-4 w-full">
									{LoginSchema.map((item) => (
										<Field name={item.name} key={item.key}>
											{(props: {
												meta: { touched: any; error: any };
												field: JSX.IntrinsicAttributes & {
													name: string;
													type: string;
													placeholder: string;
													id: string;
													value: string;
													onChange: (event: any) => void;
													onBlur: (event: any) => void;
													checked: boolean;
													multiple: boolean;
												};
											}) => (
												<div
													className="flex flex-col gap-1 w-full"
													key={item.key}
												>
													<label
														htmlFor={item.name}
														className="text-themeDarkGray text-sm font-semibold"
													>
														{item.label}
													</label>
													<div className="flex items-center border-b border-black justify-between w-full">
														<input
															id={item.name}
															name={item.name}
															placeholder={item.placeHolder}
															type={showPassword ? "text" : item.type}
															className="w-full h-10  px-4"
															onChange={(e) => {
																props.field.onChange(e);
																formik.handleChange(e);
															}}
															onBlur={(e) => {
																props.field.onBlur(e);
																formik.handleBlur(e);
															}}
															//   value={
															//     item.type === "password"
															//       ? formik.values[item.name].replace(/./g, "*")
															//       : formik.values[item.name]
															//   }
														/>
														{item.type === "password" && (
															<div
																className="focus:outline-none"
																onClick={() => setShowPassword(!showPassword)}
															>
																{showPassword ? (
																	<img
																		src={View.src}
																		className="w-5 h-5 text-themeDarkGray"
																	/>
																) : (
																	<img
																		src={Hide.src}
																		className="w-5 h-5 text-themeDarkGray"
																	/>
																)}
															</div>
														)}
													</div>
													{props.meta.touched && props.meta.error && (
														<div className="text-red-600 text-sm">
															{props.meta.error}
														</div>
													)}
												</div>
											)}
										</Field>
									))}
									<div className="flex flex-col items-start justify-between w-full gap-4">
										<div className="flex items-center gap-2">
											<input type="checkbox" name="remember" id="remember" />
											<label
												htmlFor="remember"
												className="text-themeDarkGray text-sm font-semibold"
											>
												Remember my preference
											</label>
										</div>
										<button
											type="submit"
											className="bg-blue-600 w-full text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition-all duration-300 hover:shadow-md"
										>
											Sign in
										</button>
									</div>

									<div className="flex items-center justify-center w-full">
										<a
											href="#"
											className="text-themeDarkGray text-sm font-semibold"
										>
											Forgot Password?
										</a>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</section>
		</article>
	);
};

export default LoginAuth;