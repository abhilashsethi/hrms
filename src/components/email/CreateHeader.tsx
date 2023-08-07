import { KeyboardBackspace, East, ArrowRightAlt } from "@mui/icons-material";
import { FormControl, IconButton, MenuItem, Select } from "@mui/material";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { MailTemplate } from "types";
interface Props {
  setTemplateId: (templateId: string) => void;
}
const CreateHeader = ({ setTemplateId }: Props) => {
  const { back } = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState("normal"); // Default value is "normal"

  const { data: template } = useFetch<MailTemplate[]>(`mail-template`);
  const handleTemplateChange = (event: any) => {
    const selectedValue = event.target.value as string;
    setTemplateId(selectedValue);
    setSelectedTemplate(selectedValue);
  };

  return (
    <section className="w-full bg-theme text-white">
      <div className="flex container mx-auto p-4 justify-between gap-4 items-center flex-wrap">
        <div className="flex gap-4 items-center">
          <IconButton onClick={back}>
            <KeyboardBackspace className="!text-white" />
          </IconButton>
          <span className="text-gray-100/20 ">|</span>
          <p className="font-medium  tracking-wide">New Email</p>
        </div>
        <div className="flex gap-4 items-center">
          <p className="font-medium text-xs  tracking-wide">
            Choose Template <ArrowRightAlt />{" "}
          </p>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              className="!border-white !text-white "
              defaultValue={"normal"}
              value={selectedTemplate}
              onChange={handleTemplateChange}
            >
              <MenuItem value="normal">
                <em>Normal</em>
              </MenuItem>
              {template?.map((item, i) => (
                <MenuItem key={i} value={item?.id}>
                  {item?.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </section>
  );
};

export default CreateHeader;
