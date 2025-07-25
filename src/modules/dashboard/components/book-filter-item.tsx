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

type BookFilterItemProps =
  | {
      book: Book;
      onClick: () => void;
      isSelected: boolean;
      isAllOption?: false;
    }
  | {
      onClick: () => void;
      isSelected: boolean;
      isAllOption: true;
    };

export function BookFilterItem(props: BookFilterItemProps) {
  if (!props.isAllOption) {
    return (
      <div
        onClick={props.onClick}
        className={BookFilterStyle({ isSelected: props.isSelected })}
      >
        <h3 className="text-sm">{props.book.title}</h3>
        <p>{props.book.images.length}</p>
      </div>
    );
  }

  return (
    <div
      onClick={props.onClick}
      className={BookFilterStyle({ isSelected: props.isSelected })}
    >
      <h3 className="text-sm">All Books</h3>
    </div>
  );
}
