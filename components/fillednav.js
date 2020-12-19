import NavBar from "@/components/nav";
export default function FilledNav() {
  return (
    <NavBar
      title="Sam Robbins"
      text={[
        { title: "About", path: "about" },
        { title: "Portfolio", path: "portfolio" },
      ]}
    />
  );
}