import { api } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { User } from "@repo/core/types/user";

const FORM_SELECT =
  "mb-2 [&_input]:h-10 [&_input]:w-full [&_input]:rounded-xl [&_input]:border-2 [&_input]:border-solid [&_input]:border-green-base [&_input]:px-3 [&_input]:leading-10 [&_select]:h-10 [&_select]:w-full [&_select]:rounded-xl [&_select]:border-2 [&_select]:border-solid [&_select]:border-green-base [&_select]:px-3 [&_select]:leading-10";

export const FieldGradeSelection = () => {
  const { values } = useFormikContext<User>();

  const { data: fields, isLoading: loadingFields } = useQuery({
    queryFn: () => api.getFields(1),
    queryKey: ["fields"],
    staleTime: Infinity,
  });

  const {
    data: grades,
    isLoading: loadingGrades,
    fetchStatus,
  } = useQuery({
    queryFn: () => api.getGrades(Number(values.field_id), 1),
    queryKey: ["grades", values.field_id],
    enabled: !!values.field_id,
    staleTime: Infinity,
  });

  const waitingToSelectField =
    fetchStatus === "idle" && !grades?.data.data.length;

  return (
    <>
      <div className="col-6">
        <div className={FORM_SELECT}>
          <Field
            defaultValue={values.field_id}
            as="select"
            name="field_id"
            placeholder="رشته"
            disabled={loadingFields}
            required={true}
          >
            {loadingFields ? (
              <option value="">در حال دریافت رشته ها</option>
            ) : (
              <>
                <option value="">رشته خود را انتخاب کنید</option>
                {fields?.data.data.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </>
            )}
          </Field>
          <ErrorMessage name="field_id" component="p" />
        </div>
      </div>

      <div className="col-6">
        <div className={FORM_SELECT}>
          <Field
            as="select"
            name="grade_id"
            placeholder="مقطع"
            defaultValue={values.grade_id}
            disabled={loadingGrades || waitingToSelectField}
            required={true}
          >
            {waitingToSelectField ? (
              <option value="">ابتدا رشته خود را انتخاب کنید</option>
            ) : loadingGrades ? (
              <option value="">در حال دریافت مقاطع</option>
            ) : (
              <>
                <option value="">مقطع را انتخاب کنید</option>
                {grades?.data.data.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </>
            )}
          </Field>
          <ErrorMessage name="grade_id" component="p" />
        </div>
      </div>
    </>
  );
};
