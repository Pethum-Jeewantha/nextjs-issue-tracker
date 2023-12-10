import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";

export default async function Home() {
  const open = await prisma.issue.count({where: {status: "OPEN"}})
  const inProgress = await prisma.issue.count({where: {status: "IN_PROGRESS"}})
  const closed = await prisma.issue.count({where: {status: "DONE"}})

  return (
    <IssueChart open={open} inProgress={inProgress} closed={closed} />
  )
}
