import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const RenderForm = ({ errors, handleSubmit, isSubmitting }) => (
  <Form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <Field
        id="name"
        name="name"
        type="text"
        className={`form-control ${errors.name && 'is-invalid'}`}
      />
      <ErrorMessage component="div" name="name" className="invalid-feedback" />
    </div>

    <div className="form-check">
      <Field
        id="checked"
        name="checked"
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label" htmlFor="checked">Default checkbox</label>
    </div>

    <div className="text-end">
      <button
        disabled={isSubmitting}
        className="btn btn-success"
        type="submit"
      >Submit</button>
    </div>
  </Form>
)

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required')
})

export default function CompsFormsTodoItemsChange({ handleSubmit, initialValues }) {
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      component={RenderForm}
    />
  )
}
