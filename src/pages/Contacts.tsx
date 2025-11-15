import React from 'react';
import { useForm } from 'react-hook-form';

const Contacts: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <div className="container-custom py-8">
      <div className="contacts-container">
        <h1>Contact Us</h1>
        <p>If you have any questions or inquiries, please fill out the form below:</p>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            {...register('message', { required: 'Message is required' })}
          />
          {errors.message && <span>{errors.message.message}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default Contacts;