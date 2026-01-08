import { Fragment } from "react/jsx-runtime";
import { fetchForms } from "../_lib/data-service";
import { formatDaysAgo } from "../_utils/helper";

const Page = async () => {
  const forms = await fetchForms();

  return (
    <div>
      <h1>Forms</h1>
      <ul>
        {forms.map((form) => (
          <Fragment key={form.id}>
            <li>{form.title}</li>
            <li>{formatDaysAgo(form.created_at)}</li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Page;
