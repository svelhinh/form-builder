import { Card, CardContent } from "@/app/_components/ui/card";
import { fetchForms } from "@/app/_lib/data-service";
import FormsList from "./_components/FormsList";

const Page = async () => {
  const forms = await fetchForms();

  return (
    <div className="mx-20 my-15 flex flex-col gap-10">
      <h1 className="text-4xl font-semibold">Forms</h1>
      <Card className="rounded-md p-0">
        <CardContent className="p-0">
          <FormsList forms={forms} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
