import { UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <UserButton afterSignOutUrl="/" />
      <h1>Julian</h1>
    </>
  );
}
