import HomeClient from "./home-client";
import LatestNewsSection from "@/components/home/LatestNewsSection";

export const revalidate = 300;

export default function Home() {
  return <HomeClient latestNews={<LatestNewsSection />} />;
}
