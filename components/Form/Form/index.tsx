import React, { FormHTMLAttributes } from "react";
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from "react-hook-form";

type FormProps<T extends {}> = FormHTMLAttributes<HTMLFormElement> & {
  formDataType?: T;
  formSubmit: SubmitHandler<T>;
  formInvalid?: SubmitErrorHandler<T>;
}

const Form = <T extends {}>({ children, formSubmit, formInvalid, ...rest }: FormProps<T>) => {
  const formMethods = useForm<T>();

  return (
    <FormProvider {...formMethods}>
        <form {...rest} onSubmit={formMethods.handleSubmit(formSubmit, formInvalid)}>
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
