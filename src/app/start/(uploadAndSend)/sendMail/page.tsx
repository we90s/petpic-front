import SendMailContainer from "@container/SendMailContainer";
import { getEmail } from "@lib/session";

export default function SendMail() {
  const email = getEmail();
  return <SendMailContainer email={email} />;
}
