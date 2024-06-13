import { FC, ReactNode, AwaitedReactNode } from "react";

interface props {
  uid: number;
}
const GroupPopUp: FC<props> = async ({ uid }): Promise<AwaitedReactNode> => {
  return (
   <>
      <p>hi</p>
      
    </>
  );
};
export default GroupPopUp;
