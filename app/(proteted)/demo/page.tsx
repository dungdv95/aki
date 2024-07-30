import { Metadata } from "next";
import MainPage from "./main";

export const metadata: Metadata = {
  title: "AKI - Demo",
};
export default function Page() {
  return <MainPage />;
}
