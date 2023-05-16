import { Box, Grid, Skeleton } from "@mui/material";

const SkeletonLoaderLarge = () => {
	return (
		<section className="my-8 w-full">
			<Grid container spacing={3}>
				{skeletons?.map((item) => (
					<Grid key={item?.id} item lg={4}>
						<div className="w-full border-2 h-[24rem] px-12 py-12 rounded-lg">
							<div className="flex flex-col items-center gap-4 justify-center">
								<Skeleton width="60%" />
								<Skeleton
									variant="circular"
									width={100}
									height={100}
									sx={{ marginBottom: "1rem" }}
								/>
							</div>
							<Box
								sx={{
									pt: 0.5,
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<Skeleton width="50%" />
								<Skeleton width="60%" />
							</Box>
							<div className="flex gap-3 mt-6 items-start">
								<Skeleton variant="rectangular" width="20%" height={50} />
								<Box
									sx={{
										width: "75%",
										display: "flex",
										flexDirection: "column",
										alignItems: "end",
									}}
								>
									<Skeleton width="80%" />
									<Skeleton width="60%" />
									<Skeleton width="80%" />
								</Box>
							</div>
						</div>
					</Grid>
				))}
			</Grid>
		</section>
	);
};

export default SkeletonLoaderLarge;
interface Props {
	id?: number;
}
const skeletons: Props[] = [
	{ id: 1 },
	{ id: 2 },
	{ id: 3 },
	{ id: 4 },
	{ id: 5 },
	{ id: 6 },
];
