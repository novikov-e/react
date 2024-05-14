import {useForm} from 'react-hook-form';

export default function ReactHookFormExample() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      {/*<input defaultValue="test" {...register("example")} />*/}

      {/* include validation with required or other standard HTML validation rules */}
      {/*<input {...register("exampleRequired", { required: true })} />*/}
      {/* errors will return when field validation fails  */}
      {/*{errors.exampleRequired && <span>This field is required</span>}*/}
      {/*<input {...register("firstName", { required: true, maxLength: 20 })} />*/}
      {/*<input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />*/}
      {/*<input type="number" {...register("age", { min: 18, max: 99 })} />*/}
      <input {...register('firstName', {required: true})} aria-invalid={errors.firstName ? 'true' : 'false'} />
      {errors.firstName?.type === 'required' && <p role="alert">First name is required</p>}
      <input type="submit" />
    </form>
  );
}
