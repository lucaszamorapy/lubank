import { useEffect } from "react";

interface HeadProps {
  title: string;
  description?: string;
}

const Head = ({ title, description }: HeadProps) => {
  useEffect(() => {
    document.title = `${title} | Lubank`;
    document
      .querySelector("meta[name='description']")
      ?.setAttribute("content", description || "");
  }, [title, description]);

  return null;
};

export default Head;
