import type { Book } from "@/lib/schemas";
import { cva } from "class-variance-authority";

const BookFilterStyle = cva(
  "flex cursor-pointer items-center justify-between p-2 rounded-lg transition-colors",
  {
    variants: {
      isSelected: {
        true: "bg-primary text-primary-foreground",
        false: "bg-transparent hover:bg-primary/10",
      },
    },
  },
);

export function BookFilterItem({
  book,
  onClick,
  isSelected,
}: {
  book: Book;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={BookFilterStyle({ isSelected: isSelected })}
    >
      <h3 className="text-sm">{book.title}</h3>
      <p>{book.images.length}</p>
    </div>
  );
}
