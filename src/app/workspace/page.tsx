import { redirect } from "next/navigation";

export default function WorkspaceRedirectPage() {
  redirect("/en/workspace?tab=overview");
}
