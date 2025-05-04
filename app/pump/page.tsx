import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/pump/launchpad?chain=unichain');
}
