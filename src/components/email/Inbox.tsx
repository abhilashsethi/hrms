import EmailCard from "./EmailCard";
import InboxHeader from "./InboxHeader";

const Inbox = () => {
  return (
    <div className="w-full flex flex-col">
      <InboxHeader />

      <div className="flex flex-col my-4 p-4 bg-white  shadow-lg">
        {Array(25)
          .fill(0)
          .map((_, i) => (
            <EmailCard
              key={i}
              isRead={true}
              email={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut omnis at ut necessitatibus ullam, error quas nobis. Sequi sed maiores, eum quis neque id quasi!"
              }
              subject={"This ia a subject"}
              className={i === 0 ? "border-t" : ""}
            />
          ))}
      </div>
    </div>
  );
};

export default Inbox;
