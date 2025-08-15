import { useId } from "react";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { NoteFormValues, Note } from "../../types/note";

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const OrderFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string().max(500, "Content is too long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required"),
});

interface NoteFormProps {
  onCancel: () => void;
  onSubmit: (values: NoteFormValues) => Promise<Note>;
}

export default function NoteForm({ onCancel, onSubmit }: NoteFormProps) {
  const handleSubmit = async (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    await onSubmit(values);
    actions.resetForm();
  };

  const fieldId = useId();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OrderFormSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field
              id={`${fieldId}-title`}
              type="text"
              name="title"
              className={css.input}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              as="textarea"
              id={`${fieldId}-content`}
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              component="span"
              name="content"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${fieldId}-tag`}
              name="tag"
              className={css.select}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              onClick={onCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating note..." : "Create note"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
