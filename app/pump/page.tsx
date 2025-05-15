import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/pump/launchpad?chain=kub&mode=pro');
}
