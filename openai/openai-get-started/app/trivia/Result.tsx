"use client";

import { ReactNode, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

type Option = {
  correct: boolean;
  text: string;
};

export function Result({
  content,
  error,
}: {
  content: { options: Option[] } | null;
  error: boolean;
}) {
  const [status, setStatus] = useState("idle");
  const { pending } = useFormStatus();
  const options = content?.options;

  const handleClick = (option: Option) => {
    console.log("Clicked!", option);

    if (option.correct) {
      setStatus("correct");
    } else {
      setStatus("incorrect");
    }
  };

  useEffect(() => {
    if (pending) {
      setStatus("idle");
    }
  }, [pending]);

  if (pending) {
    return (
      <Container>
        <Message>⏳ Generating...</Message>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Message>😩 An error has occurred while generating your image</Message>
      </Container>
    );
  }

  return (
    <Container>
      {options && (
        <>
          <div className="grid grid-cols-2 gap-4">
            {options.map((item) => (
              <button
                aria-disabled={status !== "idle"}
                disabled={status !== "idle"}
                type="button"
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 sm:mt-0"
                key={item.text}
                onClick={() => handleClick(item)}
              >
                {item.text}
              </button>
            ))}
          </div>

          {status !== "idle" && (
            <Container>
              {status === "correct" ? (
                <Message>
                  ✅ Correct answer:{" "}
                  {options.filter((item) => item.correct)[0].text}
                </Message>
              ) : (
                <Message>
                  ❌ Incorrect answer. The correct answer is{" "}
                  {options.filter((item) => item.correct)[0].text}
                </Message>
              )}
            </Container>
          )}
        </>
      )}
    </Container>
  );
}

function Container({ children }: { children: ReactNode }) {
  return <div className="mt-10">{children}</div>;
}

function Message({ children }: { children: ReactNode }) {
  return <p className="text-white">{children}</p>;
}
