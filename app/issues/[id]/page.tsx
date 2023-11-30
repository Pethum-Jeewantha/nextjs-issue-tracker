import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'

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
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap='3' my='2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card>{issue.description}</Card>
        </div>
    )
}

export default IssueDetailPage
