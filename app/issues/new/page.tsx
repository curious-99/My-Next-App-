'use client';

import { Button, Callout, TextField } from '@radix-ui/themes'
import React,{useState} from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  useForm,
  Controller
} from 'react-hook-form';

interface Issueform{
  title : string;
  description: string;
}

const NewIssuePage = () => {
  const {register, control, handleSubmit} = useForm<Issueform>();
  const router = useRouter();
  const [error, setError] = useState('');
  return (
    <div className='max-w-xl'>     
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form 
      className='space-y-3' 
      onSubmit={handleSubmit( async (data) => {
        try {
          await axios.post('/api/issues', data);
          router.push('/issues');
        } catch (error) {
          setError('An unexpected error occoured');
        }
      })}> 
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')}/>
        </TextField.Root>
        <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
        <Button>Submit New Issue</Button>
      </form>
    </div>

  )
}

export default NewIssuePage