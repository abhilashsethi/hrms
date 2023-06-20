import EmailCard from "./EmailCard";
import InboxHeader from "./InboxHeader";

const Inbox = () => {
  return (
    <div className="w-full flex flex-col">
      <InboxHeader />

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal table-fixed ">
            <tbody>
              {Array(25)
                .fill("lk")
                .map((_, i) => (
                  <EmailCard
                    key={i}
                    isRead={i % 3 === 0 || i % 7 === 0}
                    userName={`User SY${Math.floor(
                      (i + 2) * Math.random() * 1000
                    )}`}
                    subject={`Project delivery status ${Math.floor(
                      (i + 2) * Math.random() * 1000
                    )}`}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
