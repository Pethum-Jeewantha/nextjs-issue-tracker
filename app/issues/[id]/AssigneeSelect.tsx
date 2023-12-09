'use client'

import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Skeleton } from '@/app/components';

const AssigneeSelect = () => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get<User[]>('/api/users').then(({ data }) => data),
        staleTime: 60 * 1000, //60s,
        retry: 3,
    });

    if (isLoading) return <Skeleton />

    if (error) return null;

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggetions</Select.Label>
                    {users?.map((user) => <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect
