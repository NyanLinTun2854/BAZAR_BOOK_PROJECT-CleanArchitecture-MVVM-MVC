import BookForm from "@/components/features/books/BookForm";
import BookDetailView from "./BookDetailView";

interface BookPageProps {
  params: { id: string };
  searchParams: {
    mode?: "edit";
  };
}

export default async function BookPage({
  params,
  searchParams,
}: BookPageProps) {
  const { id } = params;
  const isEditMode = searchParams.mode === "edit";

  return (
    <main className="book-page-container">
      {isEditMode ? <BookForm /> : <BookDetailView />}
    </main>
  );
}
