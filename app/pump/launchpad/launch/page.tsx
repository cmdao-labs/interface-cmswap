import Create from "@/app/pump/ui/Create";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Launch | BKGA",
  description: "hello superchain.",
};

export default async function Launch(props: {
  searchParams?: Promise<{
    mode?: string;
    chain?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const mode = searchParams?.mode || '';
  const chain = searchParams?.chain || '';

  return (
      <Create mode={mode} chain={chain} />
  )
}
