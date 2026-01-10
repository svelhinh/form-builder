import { Card, CardContent } from "@/app/_components/ui/card";
import { fetchForms } from "@/app/_lib/data-service";
import FormTile from "@/app/(with-header)/forms/_components/FormTile";

const Page = async () => {
  const forms = await fetchForms();

  return (
    <div className="mx-20 my-15 flex flex-col gap-10">
      <h1 className="text-4xl font-semibold">Forms</h1>
      <Card className="rounded-md p-0">
        <CardContent className="p-0">
          {forms.length > 0 ? (
            forms.map((form) => <FormTile key={form.id} form={form} />)
          ) : (
            <div className="text-muted-foreground p-6 text-center">
              No forms found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
