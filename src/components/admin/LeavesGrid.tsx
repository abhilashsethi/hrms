import { Step, StepLabel, Stepper } from "@mui/material";
import { useState, MouseEvent } from "react";
import { SAMPLEDP } from "assets/home";
const LeavesGrid = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const renderStatus = (status: any) => {
		switch (status) {
			case "Approved":
				return (
					<>
						{/* <span className="bg-green-300 text-green-600 rounded-full px-6 py-1 font-semibold">
            {status}
						</span> */}
						<div className="flex justify-center items-center">
							<div className="text-xs w-1/3 bg-[#44bd44] text-white p-1 rounded-md font-semibold px-2">
								{status}
							</div>
						</div>
						<div className="pt-4">
							<Stepper activeStep={2} alternativeLabel>
								{steps.map((label) => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>
						</div>
					</>
				);
			case "Pending":
				return (
					<>
						{/* <span className="bg-yellow-300 text-yellow-600 rounded-full px-6 py-1 font-semibold">
              {status}
            </span> */}
						<div>
							<Stepper activeStep={1} alternativeLabel>
								{steps.map((label) => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>
						</div>
						<div className="md:flex items-center justify-center mt-2 pt-2 space-x-3">
							<div className="text-xs w-1/3 bg-[#44bd44] text-white p-1 rounded-md font-semibold px-2">
								Accept
							</div>
							<div className="text-xs w-1/3 bg-red-600 text-white p-1 rounded-md font-semibold px-2">
								Decline
							</div>
						</div>
					</>
				);
			case "Decline":
				return (
					<>
						{/* <span className="bg-red-300 text-red-600 rounded-full px-2 py-1 font-semibold text-xs">
							{status}
						</span> */}
						<div className="flex justify-center items-center">
							<div className="text-xs w-1/3 bg-red-600 text-white p-1 rounded-md font-semibold px-2">
								{status}
							</div>
						</div>
						<div className="pt-2">
							<Stepper activeStep={0} alternativeLabel>
								{steps.map((label) => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>
						</div>
					</>
				);
			default:
				return (
					<>
						<span>{status}</span>
						<div className="pt-4">
							<Stepper activeStep={2} alternativeLabel>
								{steps.map((label) => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>
						</div>
					</>
				);
		}
	};
	return (
		<>
			<section className="py-6 ">
				<div className="grid grid-cols-4 gap-6 py-6 items-center justify-center mt-4">
					{leavData?.map((item: any, index: any) => (
						<>
							<div
								key={index}
								className="relative flex flex-col px-2 justify-center justify-items-center w-full pt-4 text-center rounded-md shadow-xl drop-shadow-lg bg-gradient-to-r from-rose-100 to-teal-100 h-64 hover:scale-105 ease-in-out transition-all duration-200"
							>
								{/* <div className="absolute right-[10px] top-[10px]">
                  <IconButton onClick={handleClick}>
                    <MoreVertRounded />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Link
                      href={`/admin/employees/employee-profile?id=${item?.id}`}
                    >
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <RemoveRedEyeOutlined fontSize="small" />
                        </ListItemIcon>
                        Visit Profile
                      </MenuItem>
                    </Link>
                  </Menu>
                </div> */}
								<img
									alt=""
									className="absolute -top-10 self-center flex-shrink-0 w-16 h-16 bg-center bg-cover rounded-full bg-gray-500"
									src={SAMPLEDP.src}
								/>
								<div className="flex-1 my-6">
									<p className="text-base font-semibold leading-snug">
										{item?.name}
									</p>
									<p className="mb-2 text-sm">{item.role}</p>
									<div className="mb-2 text-sm group flex items-center justify-center gap-2 pb-2">
										{/* <ShoppingBasket />{" "} */}
										{/* <div className="font-semibold">Credit</div>
										<div className="flex justify-between items-center">
											<p>Monthly Credit</p>
											<p>Annual Credit</p>
										</div> */}
										<div className="flex w-full justify-center gap-2">
											<div className="text-xs cursor-pointer bg-[#bbcbff] rounded-lg shadow-lg py-1 px-2">
												<p className="font-semibold">Monthly Left</p>
												<p>2</p>
											</div>
											<div className="text-xs cursor-pointer bg-[#bbcbff] rounded-lg shadow-lg py-1 px-2">
												<p className="font-semibold">Annual Left</p>
												<p>12</p>
											</div>
										</div>
										{/* {item?.credit} */}
									</div>
									<div className="">{renderStatus(item.status)}</div>
								</div>
							</div>
						</>
					))}
				</div>
			</section>
		</>
	);
};

export default LeavesGrid;
const leavData = [
	{
		photo: "https://source.unsplash.com/100x100/?portrait?0",
		name: "Srinu Redy",
		role: "Visual Designer",
		status: "Decline",
		credit: 0,
	},
	{
		photo: "https://source.unsplash.com/100x100/?portrait?1",
		name: "Kumara Gourav",
		role: "Web Developer",
		status: "Pending",
		credit: 6,
	},
	{
		photo: "https://source.unsplash.com/100x100/?portrait?2",
		name: "Sunil Mishra",
		role: "Back-End Developer",
		status: "Approved",
		credit: 10,
	},
	{
		photo: "https://source.unsplash.com/100x100/?portrait?3",
		name: "Abhilash Sethi",
		role: "Web Developer",
		status: "Approved",
		credit: 3,
	},
];
const steps = ["Team Manager", "Hr"];
