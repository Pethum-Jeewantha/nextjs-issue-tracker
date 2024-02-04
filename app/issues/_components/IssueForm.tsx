'use client'

import React, {useEffect, useState} from 'react'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { ErrorMessage, Spinner } from '@/app/components';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';
import {useWebSocket} from "@/app/contexts/WebSocketContext";
import {useSession} from "next-auth/react";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });
    const router = useRouter();
    const {sendMessage} = useWebSocket();

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session } = useSession();

    const onSubmit = handleSubmit(async (data: IssueFormData) => {
        try {
            setIsSubmitting(true);

            if (issue)
                await axios.patch(`/api/issues/${issue.id}`, data);
            else
                await axios.post('/api/issues', data);

            sendMessage({ message: {isMessageSent: true, senderEmail: session?.user?.email!}});
            router.push('/issues/list');
        } catch (error) {
            setIsSubmitting(false);
            setError('An unexpected error occurred')
        }
    });

    return (
        <div className='max-w-xl'>
            {error && <Callout.Root color='red' className='mb-5'><Callout.Text>{error}</Callout.Text></Callout.Root>}
            <form className='space-y-3' onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default IssueForm
