import { UpdateButton } from "@/components/account/UpdateButton";
import { SignOutButton } from "@/components/account/SignOutButton";

const ProfilePage = async () => {
  return (
    <div className="h-screen pt-12 flex flex-col justify-center items-center">
      <div className="w-full max-w-screen-md	p-3.5	flex justify-between flex-col border border-solid border-border-primary rounded gap-5	bg-background-secondary">
        <UpdateButton
          text="name"
        />
        <UpdateButton
          text="email"
        />
        <UpdateButton
          text="api"
        />
      </div>

      <SignOutButton />
    </div>
  );
}

export default ProfilePage;