import QuestionsCard from "@/components/cards/QuestionsCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { IQuestion } from "@/database/question.model";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";
import React from "react";

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>
      <div className="mt-11 w-full">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((item: IQuestion) => (
            <QuestionsCard
              key={item._id}
              _id={item._id}
              title={item.title}
              //@ts-ignore
              tags={item.tags}
              //@ts-ignore
              author={item.author}
              //@ts-ignore
              upvotes={item.upvotes}
              views={item.views}
              answers={item.answers}
              createdAt={item.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no tagged questions to show"
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
};

export default Page;
