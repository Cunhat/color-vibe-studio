import React from "react";
import CreateBookSection from "../sections/create-book-section";

export default function BookView() {
  return (
    <div className="container flex-1 px-4 py-8 md:py-12">
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Books</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage your coloring book collections
          </p>
        </div>

        <CreateBookSection />
      </div>

      {/* <BookList /> */}
    </div>
  );
}
