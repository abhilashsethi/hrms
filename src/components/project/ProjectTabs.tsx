import { SyntheticEvent, useState } from "react";
import {
	AssignmentTurnedIn,
	BugReport,
	SupportAgent,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import ProjectTasks from "./ProjectTasks";
import ProjectSupport from "./ProjectSupport";
import ProjectBugs from "./ProjectBugs";
import { Projects } from "types";
import { useAuth } from "hooks";

const ProjectTabs = () => {
	const { user } = useAuth();
	const [value, setValue] = useState("1");
	const handleChange = (event: SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<div className="w-full border-2 mt-8 rounded-md">
			<div>
				<TabContext value={value}>
					<Box sx={{ borderColor: "divider" }}>
						<TabList onChange={handleChange} aria-label="lab API tabs example">
							{user?.isClient ? null : (
								<Tab
									sx={{ width: "30%" }}
									icon={<AssignmentTurnedIn fontSize="small" />}
									iconPosition="start"
									label="TASKS"
									value="1"
								/>
							)}
							<Tab
								icon={<SupportAgent fontSize="small" />}
								iconPosition="start"
								sx={{ width: "30%" }}
								label="SUPPORT"
								value="2"
							/>
							{user?.isClient ? null : (
								<Tab
									icon={<BugReport fontSize="small" />}
									iconPosition="start"
									sx={{ width: "30%" }}
									label="BUGS"
									value="3"
								/>
							)}
						</TabList>
					</Box>

					<TabPanel value="1">
						<ProjectTasks />
					</TabPanel>
					<TabPanel value="2">
						<ProjectSupport />
					</TabPanel>
					<TabPanel value="3">
						<ProjectBugs />
					</TabPanel>
				</TabContext>
			</div>
		</div>
	);
};

export default ProjectTabs;
