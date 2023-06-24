import {
  EmailContainer,
  EmailDetailsHeader,
  EmailReplyContainer,
} from "components/email";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { useRef } from "react";
import { EmailType } from "types";
import { useReactToPrint } from "react-to-print";

const ViewEmail = () => {
  const { query } = useRouter();
  const { data } = useFetch<EmailType>(`emails/${query?.emailId}`);
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <PanelLayout title="Email | View">
      <EmailDetailsHeader sentTime={data?.sentAt} print={handlePrint} />
      <section className="w-full my-4 container mx-auto  rounded-md ">
        <EmailContainer data={data} printRef={printRef} />
      </section>
      <EmailReplyContainer />
    </PanelLayout>
  );
};

export default ViewEmail;
