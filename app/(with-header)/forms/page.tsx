import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_components/ui/pagination";
import { fetchForms } from "@/app/_lib/data-service";
import FormsList from "./_components/FormsList";

export const revalidate = 30;

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const PAGE_SIZE = 5;

  const { page = "1" } = await searchParams;
  const currentPage = Number(page);
  const { data: forms, count } = await fetchForms(currentPage, PAGE_SIZE);

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="mx-20 my-15 flex flex-col gap-10">
      <h1 className="text-4xl font-semibold">Forms</h1>
      <Card className="rounded-md p-0">
        <CardContent className="p-0">
          <FormsList forms={forms} />
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={isFirstPage ? "#" : `/forms?page=${currentPage - 1}`}
                aria-disabled={isFirstPage}
                className={isFirstPage ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {currentPage > 2 && (
              <PaginationItem>
                <PaginationLink href={`/forms?page=1`}>1</PaginationLink>
              </PaginationItem>
            )}

            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink href={`/forms?page=${currentPage - 1}`}>
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href={`/forms?page=${currentPage}`} isActive>
                {page}
              </PaginationLink>
            </PaginationItem>

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink href={`/forms?page=${currentPage + 1}`}>
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href={isLastPage ? "#" : `/forms?page=${currentPage + 1}`}
                aria-disabled={isLastPage}
                className={isLastPage ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Page;
