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

type BookFilterItemProps = {
  book: Book;
  onClick: () => void;
  isSelected: boolean;
  showCount?: boolean;
};

export function BookFilterItem({
  book,
  onClick,
  isSelected,
  showCount = true,
}: BookFilterItemProps) {
  return (
    <div
      onClick={onClick}
      className={BookFilterStyle({ isSelected: isSelected })}
    >
      <h3 className="text-sm">{book.title}</h3>
      {showCount && <p>{book.images.length}</p>}
    </div>
  );
}
