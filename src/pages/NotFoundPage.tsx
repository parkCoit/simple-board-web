import NotFound from "@/components/common/NotFound";
import { useEffect } from "react";

export interface NotFoundPageProps {}

const NotFoundPage = (props: NotFoundPageProps) => {
  return (
    <div className="p-4">
      <NotFound />
    </div>
  );
};

export default NotFoundPage;
