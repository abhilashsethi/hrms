import {
	MoreVertRounded,
	RemoveRedEyeOutlined,
	ShoppingBasket,
} from "@mui/icons-material";
import {
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Step,
	StepLabel,
	Stepper,
} from "@mui/material";
import { SAMPLEDP } from "assets/home";
import Link from "next/link";
import { useState, MouseEvent } from "react";
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
						<span className="bg-green-300 text-green-600 rounded-full px-6 py-1 font-semibold">
							{status}
						</span>
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
							<button className="bg-green-600 text-sm text-white font-semibold rounded-md px-6 py-2 hover:bg-green-700">
								Accept
							</button>
							<button className="bg-red-600 text-sm text-white font-semibold rounded-md px-6 py-2 hover:bg-red-700">
								Decline
							</button>
						</div>
					</>
				);
			case "Decline":
				return (
					<>
						<span className="bg-red-300 text-red-600 rounded-full px-6 py-1 font-semibold">
							{status}
						</span>
						<div className="pt-4">
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
				<div className="grid grid-cols-4 gap-6 py-6 items-center justify-center">
					{leavData?.map((item: any, index: any) => (
						<>
							<div
								key={index}
								className="flex flex-col h-full px-2 justify-center justify-items-center w-full pt-4 text-center rounded-md shadow-xl drop-shadow-lg bg-white  hover:scale-105 ease-in-out transition-all duration-200"
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
									className="self-center flex-shrink-0 w-16 h-16 bg-center bg-cover rounded-full bg-gray-500"
									src={SAMPLEDP.src}
								/>
								<div className="flex-1 my-6">
									<p className="text-base font-semibold leading-snug">
										{item?.name}
									</p>
									<p className="mb-2 text-sm">{item.role}</p>
									<p className="mb-2 text-sm group flex items-center justify-center gap-2 pb-2 ">
										{/* <ShoppingBasket />{" "} */}
										{/* <div className="font-semibold">Credit</div>
										<div className="flex justify-between items-center">
											<p>Monthly Credit</p>
											<p>Annual Credit</p>
										</div> */}
										<div className="flex flex-col">
											<div className="font-semibold">Credit</div>
											<div className="flex w-full justify-between gap-4">
												<p>Monthly Credit</p>
												<p>Annual Credit</p>
											</div>
										</div>
										{/* {item?.credit} */}
									</p>
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
		name: "Prasad Murmu",
		role: "Web Designer",
		status: "Approved",
		credit: 3,
	},
];
const steps = ["Team Manager", "Hr"];
