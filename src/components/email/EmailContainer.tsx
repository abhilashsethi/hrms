import {
  ArrowDropDown,
  ExpandMore,
  FileDownload,
  Info,
  InsertDriveFile,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { EmailType } from "types";
import { downloadFile } from "utils";
import ReplyToEmail from "./ReplyToEmail";
import { useAuth } from "hooks";
import { useEffect } from "react";

const EmailContainer = ({
  data,
  printRef,
}: {
  data?: EmailType;
  printRef: any;
}) => {
  const { user } = useAuth();
  useEffect(() => {
    const handleLinkClick = (event: any) => {
      const target = event.target;

      // Check if the clicked element is a link (anchor)
      if (target.tagName.toLowerCase() === "a") {
        const href = target.getAttribute("href");
        if (href) {
          window.location.href = href; // Redirect to the link's href
        }
      }
    };

    const spanElement = document.getElementById("contentSpan");

    if (spanElement) {
      const links = spanElement.querySelectorAll("a");

      links.forEach((link) => {
        link.classList.add("text-theme"); // Apply your custom link styles

        // Attach a click event listener to handle link clicks
        link.addEventListener("click", handleLinkClick);
      });

      return () => {
        // Cleanup event listeners when the component is unmounted
        links.forEach((link) => {
          link.removeEventListener("click", handleLinkClick);
        });
      };
    }
  }, [data]);

  return (
    <>
      <div className="w-full flex flex-col  gap-4" ref={printRef}>
        {data?.replyTo?.id && <ReplyToEmail data={data} />}

        <div className="md:p-4 p-3 flex flex-wrap w-full bg-secondary-600 rounded-t-lg items-center gap-4 border-b border-white justify-between">
          <div className="flex items-start w-11/12 gap-4 justify-start">
            <Avatar src={data?.sender?.photo} alt={data?.sender?.name}>
              {data?.sender?.name[0]}
            </Avatar>
            <div className="flex flex-col">
              <h3 className="font-bold text-white tracking-wide">
                {data?.sender?.name}
              </h3>
              <h3 className="font-medium text-xs md:block hidden text-gray-200">
                {data?.sender?.username}
              </h3>
              <div className="flex items-start gap-4">
                <h3 className="font-medium text-xs py-4 md:block hidden text-gray-200">
                  To
                </h3>
                <Accordion
                  className="!bg-transparent !shadow-none"
                  sx={{
                    maxWidth: 300,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore className="!text-white" />}
                    className="!bg-transparent !text-sm !text-white "
                  >
                    {data?.receiver
                      ?.map((item) => item?.id)
                      ?.includes(String(user?.id))
                      ? "You"
                      : data?.receiver && data?.receiver?.length > 1
                      ? data?.receiver[0]?.name + ` and others`
                      : data?.receiver[0]?.name}
                  </AccordionSummary>
                  <AccordionDetails className="flex flex-wrap gap-4 ">
                    {data?.receiver?.map((item) => (
                      <Chip
                        key={item?.id}
                        avatar={
                          <Avatar alt={item?.name} src={item?.photo}>
                            {item?.name[0]}
                          </Avatar>
                        }
                        className="!bg-white"
                        label={
                          <div className="flex flex-col">
                            <h3 className="text-xs font-bold tracking-wide">
                              {item?.name}
                            </h3>
                            <h3 className="text-xs font-medium tracking-wide">
                              {item?.username}
                            </h3>
                          </div>
                        }
                        variant="outlined"
                      />
                    ))}
                  </AccordionDetails>
                </Accordion>
              </div>
              {/* Mobile View Start */}
              <h3 className="font-medium text-xs md:hidden block text-gray-200">
                {data?.sender?.username && data?.sender?.username?.length > 28
                  ? data?.sender?.username?.slice(0, 28) + "..."
                  : data?.sender?.username}
              </h3>
              {/* Mobile View End */}
            </div>
          </div>
          <Tooltip
            title={
              <div className="flex flex-col p-4 bg-white rounded-lg shadow-lg ">
                <div className="flex flex-col gap-2 text-black min-w-[200px]">
                  <h3 className="text-xs font-bold tracking-wide text-black ">
                    CC-
                  </h3>
                  {data?.cc?.length ? (
                    <div className="flex flex-col gap-1">
                      {data?.cc?.map((item) => (
                        <Chip
                          avatar={
                            <Avatar alt={item?.name} src={item?.photo}>
                              {item?.name[0]}
                            </Avatar>
                          }
                          label={
                            <div className="flex flex-col">
                              <h3 className="text-xs font-bold tracking-wide">
                                {item?.name}
                              </h3>
                              <h3 className="text-xs font-medium tracking-wide">
                                {item?.username}
                              </h3>
                            </div>
                          }
                          variant="outlined"
                        />
                      ))}
                    </div>
                  ) : (
                    "No CC"
                  )}
                </div>
              </div>
            }
          >
            <IconButton>
              <Info className="!text-white" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="flex flex-col px-4 gap-4">
          <h3 className="font-bold tracking-wide text-gray-900 text-2xl">
            {data?.subject}
          </h3>
          <span
            id="contentSpan"
            className="font-medium text-gray-600 tracking-wide text-sm overflow-scroll"
            dangerouslySetInnerHTML={{
              __html: String(data?.content),
            }}
          ></span>
        </div>
        {data?.attachments?.length ? (
          <h3 className="font-medium tracking-wide px-4">Attachments -</h3>
        ) : null}

        <div className="flex flex-wrap gap-4 md:px-4 px-2 pb-4 ">
          {data?.attachments?.map((item, i) => (
            <div
              className="flex flex-col items-center md:p-4 p-3 rounded-md bg-themeBlue shadow-lg"
              key={i}
            >
              <a href={item} target="_blank" rel="noopener noreferrer">
                <InsertDriveFile className="!text-7xl !text-theme" />
              </a>
              <p className="text-center py-2 text-xs font-medium  break-words">
                {item?.split("/")?.at(-1)}
              </p>
              <IconButton
                className=" !bg-secondary  shadow-lg p-2 "
                onClick={() =>
                  downloadFile(
                    item,
                    item?.split("/")?.at(-1) || Date.now()?.toString()
                  )
                }
              >
                <FileDownload className="!text-white" />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EmailContainer;
