import Button from "../Button/Button";
import GoogleSVG from "../icons/GoogleSVG";
import DiscordSVG from "../icons/DiscordSVG";
import { supabase } from "../../services/supabase/supabase";

export default function Register() {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/main`,
      },
    });
    if (error) console.log("Error logging in:", error.message);
  };

  const signInWithDiscord = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/main`,
      },
    });
    if (error) console.log("Error logging in:", error.message);
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box items-center m-5">
        <div className="flex items-center flex-col gap-4 justify-center">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <Button
            text="Sign In with Google"
            icon={<GoogleSVG className="w-5 h-5" />}
            onClick={signInWithGoogle}
            className="bg-blue-600 border-transparent text-white"
          />
          <Button
            text="Sign In with Discord"
            icon={<DiscordSVG className="w-5 h-5" />}
            onClick={signInWithDiscord}
            className="bg-indigo-600 border-transparent text-white"
          />
        </div>
      </div>
    </dialog>
  );
}
