import React from "react";
import { format } from "date-fns";
export default function Date(props: { date: Date | number }) {
  return <span>{format(props.date, "MMM dd, y")}</span>;
}
