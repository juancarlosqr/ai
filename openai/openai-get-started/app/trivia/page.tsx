"use client";

import { useFormState } from "react-dom";
import { generate } from "./actions";
import { Result } from "./Result";
import { GenerateButton } from "./GenerateButton";

const initialState = {
  prompt: "",
  content: null,
  error: false,
};

export default function DallE() {
  const [state, formAction] = useFormState(generate, initialState);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col px-6 py-32 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Trivia
          </h2>

          <div className="mt-5">
            <form action={formAction} className="mt-2 ">
              <div className="sm:flex sm:items-center">
                <div className="w-full sm:max-w-lg">
                  <label htmlFor="prompt" className="sr-only">
                    Question
                  </label>
                  <input
                    type="text"
                    name="prompt"
                    id="prompt"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    placeholder="When was the last time..."
                  />
                </div>

                <GenerateButton />
              </div>

              <Result content={state.content} error={state.error} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
