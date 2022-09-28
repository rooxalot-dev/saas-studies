import React, {forwardRef, FormHTMLAttributes, FormEvent } from "react";
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler } from "react-hook-form";

export type FormProps<T extends {}> = FormHTMLAttributes<HTMLFormElement> & {
  formDataType?: T;
  formSubmit: SubmitHandler<T>;
  formInvalid?: SubmitErrorHandler<T>;
  clearOnSubmit?: boolean;
}

const Form = forwardRef(<T extends {}>({ children, formSubmit, formInvalid, clearOnSubmit, ...rest }: FormProps<T>, ref: any) => {
  const formMethods = useForm<T>();

  return (
    <FormProvider {...formMethods}>
        <form
          {...rest}
          ref={ref}
          onSubmit={async (e: FormEvent<any>) => {
            const execute = formMethods.handleSubmit(formSubmit, formInvalid);
            await execute(e);

            if (clearOnSubmit) {
              formMethods.reset();
            }
          }}
        >
        {children}
      </form>
    </FormProvider>
  );
})

export default Form;
