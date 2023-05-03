import { Card, CardContent, LinearProgress } from "@mui/material";

export default function MeetingProgressBar() {
	return (
		<>
			<Card className="p-3">
				<h2 className="!text-lg px-3 !font-bold pb-3">
					Meeting Progress Status
				</h2>
				<CardContent>
					<div className="flex flex-col gap-[1.9rem]">
						<div className="flex items-center gap-5">
							<span className="w-20 bg-theme rounded-full p-3">
								<img src="/leader.png" alt="initiated" />
							</span>

							<span className="w-full">
								<div className=" flex flex-row justify-between">
									<h6 className="!font-semibold text-theme pb-2">
										Upcoming Meetings
									</h6>
									<p className="!text-sm !font-semibold">
										{/* <CurrencyRupee className="h-4 w-4" /> */}
										{`${20} (${100}%)`}
									</p>
								</div>
								<LinearProgress
									color="warning"
									variant="determinate"
									value={20}
									className="!rounded-xl"
								/>
							</span>
						</div>
						<div className="flex items-center gap-4">
							<span className="w-20 bg-theme rounded-full p-3">
								<img src="/receiver.png" alt="received" />
							</span>
							<span className="w-full">
								<div className="flex flex-row justify-between">
									<h6 className="!font-semibold  text-theme pb-2">
										Completed Meetings
									</h6>
									<p className="!text-sm !font-semibold">
										{/* <CurrencyRupee className="h-4 w-4" /> */}
										{`${20} (${100}%)`}
									</p>
								</div>
								<LinearProgress
									color="info"
									variant="determinate"
									value={20}
									className="!rounded-xl"
								/>
							</span>
						</div>
						<div className="flex items-center gap-4">
							<span className="w-20 bg-theme rounded-full p-3">
								<img src="/tasks.png" alt="completed" />
							</span>
							<span className="w-full">
								<div className="flex flex-row justify-between">
									<h6 className="!font-semibold text-theme pb-2">Completed</h6>
									<p className="!text-sm !font-semibold">
										{/* <CurrencyRupee className="h-4 w-4" /> */}
										{`${20} (${100}%)`}
									</p>
								</div>
								<LinearProgress
									color="success"
									variant="determinate"
									value={20}
									className="!rounded-xl"
								/>
							</span>
						</div>
						<div className="flex items-center gap-4">
							<span className="w-20 bg-theme rounded-full p-3">
								<img src="/cancel.png" alt="cancel" />
							</span>
							<span className="w-full">
								<div className="flex flex-row justify-between">
									<h6 className="!font-semibold text-theme pb-2">Cancelled</h6>
									<p className="!text-sm !font-semibold">
										{/* <CurrencyRupee className="h-4 w-4" /> */}
										{`${20} (${100}%)`}
									</p>
								</div>
								<LinearProgress
									color="error"
									variant="determinate"
									value={20}
									className=" !rounded-xl"
								/>
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
