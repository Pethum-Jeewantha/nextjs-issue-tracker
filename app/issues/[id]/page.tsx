import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Box, Grid } from '@radix-ui/themes'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!issue) return notFound();

    return (
        <Grid columns={{ initial: '1', md: '2' }} gap='5'>
            <Box>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id} />
            </Box>
        </Grid>
    )
}

export default IssueDetailPage
