import React from "react";
import useBlogFinder from "../../hooks/useBlogFinder";
import Card from "./Card";
import PendingCard from "./PendingCard";

type Props = {
  likeData: ILike;
};

const LikeCard = (props: Props) => {
  const {
    data: resData,
    error,
    isPending,
  } = useBlogFinder({ data: props.likeData });

  if (!isPending && resData !== undefined) {
    return <Card data={resData} />;
  } else {
    return <PendingCard />;
  }
};

export default LikeCard;
