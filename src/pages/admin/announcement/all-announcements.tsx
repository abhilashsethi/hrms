import { Add, Campaign, DeleteRounded, InfoRounded } from "@mui/icons-material";
import { Button, Container, IconButton, Tooltip } from "@mui/material";
import { LoaderAnime } from "components/core";
import { NotificationInfo } from "components/dialogues";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";

const AllAnnouncement = () => {
	const [notification, setNotification] = useState<boolean>(false);
	return (
		<>
			<PanelLayout title="Announcements - Admin Panel">
				<NotificationInfo
					open={notification}
					handleClose={() => setNotification(false)}
				/>
				<section className="md:px-8 px-4 md:py-8 py-4">
					<div className="flex justify-end">
						<Link href="">
							<Button
								fullWidth
								className="!bg-theme"
								variant="contained"
								startIcon={<Add />}
							>
								ADD ANNOUNCEMENT
							</Button>
						</Link>
					</div>
					<Container>
						{announcements?.length ? (
							announcements?.map((item, index) => (
								<div
									key={item?.id}
									className="flex  transition duration-500 ease-in-out my-4 shadow-md gap-6 rounded-lg bg-gradient-to-r from-rose-100 to-teal-100 overflow-hidden "
								>
									<div
										className={`flex flex-1 flex-col p-4 border-l-8
                       ${borderColors[index % borderColors.length]}
											 `}
									>
										<div className="flex justify-between items-center">
											<span className="text-lg">
												<Campaign className="text-theme mr-2" />
												Announcement
											</span>
											<span className="text-xs text-gray-500">08/08/2023</span>
											<span className="text-xs text-gray-500">Published</span>
										</div>
										{/* <span className="text-xs">{item?.desc}</span> */}
									</div>

									<div className="grid gap-5 grid-cols-2 px-4 items-center text-xs uppercase tracking-wide font-semibold">
										<Tooltip title="Details">
											<IconButton onClick={() => setNotification(true)}>
												<InfoRounded className="text-theme" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete">
											<IconButton
											//   onClick={handleClick}
											>
												<DeleteRounded className="text-red-500" />
											</IconButton>
										</Tooltip>
									</div>
								</div>
							))
						) : (
							<LoaderAnime text="No notification at this time" />
						)}
					</Container>
				</section>
			</PanelLayout>
		</>
	);
};

export default AllAnnouncement;
const borderColors = [
	"border-violet-400",
	"border-green-400",
	"border-blue-400",
	"border-yellow-400",
	// Add more border color classes as needed
];
const announcements = [
	{
		id: "01",
		desc: " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ....",
	},
	{
		id: "02",
		desc: " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ....",
	},
	{
		id: "03",
		desc: " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ....",
	},
	{
		id: "04",
		desc: " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ....",
	},
	{
		id: "02",
		desc: " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ....",
	},
	{
		id: "03",
		desc: " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ....",
	},
	{
		id: "04",
		desc: " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ....",
	},
];
