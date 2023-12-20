import QuestionsCard from "@/components/cards/QuestionsCard";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import Filter from "@/components/shared/search/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    key: 1,
    _id: 1,
    title: "cascading deletes in SQL",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "SQL" },
    ],
    author: {
      _id: "1",
      name: "Julian Gallo",
      picture: "url_to_picture",
    },
    upvotes: 15000,
    views: 10000,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
  {
    key: 2,
    _id: 2,
    title: "How to center a div",
    tags: [
      { _id: "1", name: "css" },
      { _id: "2", name: "SQL" },
    ],
    author: {
      _id: "2",
      name: "Julian Gallo",
      picture: "url_to_picture",
    },
    upvotes: 10000000,
    views: 107600500,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((item) => (
            <QuestionsCard
              key={item._id}
              _id={item._id}
              title={item.title}
              tags={item.tags}
              author={item.author}
              upvotes={item.upvotes}
              views={item.views}
              answers={item.answers}
              createdAt={item.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! Ask a Question and kickstart the
        discussion. Our query could be the next big thing others learn from. Get
        involved!"
            linkTitle="Ask a question"
            link="/ask-question"
          />
        )}
      </div>
    </>
  );
}
