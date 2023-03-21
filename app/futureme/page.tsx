"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Header } from "./components/Header";

type InputProps = {
  label: string;
} & React.ComponentProps<"input">;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, ...rest } = props;
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-pink-500"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          ref={ref}
          className="block w-full rounded-md border-0 bg-transparent text-white py-3 px-4 shadow-sm ring-2 ring-inset ring-pink-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-500 outline-none sm:text-sm sm:leading-6"
          {...rest}
        />
      </div>
    </div>
  );
});

Input.displayName = "Input";

const schema = z.object({
  name: z.string(),
  age: z.number(),
  height: z.number(),
  weight: z.number(),
  activity: z.string(),
});

type Schema = z.infer<typeof schema>;

const Page = () => {
  const router = useRouter();
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const activity = methods.watch("activity");

  const onClick = (input: "low" | "med" | "high") => {
    methods.setValue("activity", input);
  };

  const onSubmit = (data: Schema) => {
    console.log('data', data)
    router.push(
      `/futureme/image?name=${data.name}&age=${data.age}&height=${data.height}&weight=${data.weight}&activity=${data.activity}`
    );
  };

  return (
    <div>
      <Header />
      <div className="px-6">
        <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-4">
          <Input
            label="Name"
            {...methods.register("name")}
            placeholder="What you called"
          />
          <Input
            type="number"
            label="Age"
            {...methods.register("age", {
              valueAsNumber: true,
            })}
            placeholder="How old you"
          />
          <Input
            type="number"
            label="Height (cm)"
            {...methods.register("height", {
              valueAsNumber: true,
            })}
            placeholder="How big you"
          />
          <Input
            type="number"
            label="Weight (kg)"
            {...methods.register("weight", {
              valueAsNumber: true,
            })}
            placeholder="How fat you"
          />
          <label className="text-pink-500">Activity Level</label>
          <div className="grid grid-cols-3 gap-6">
            <button
              type="button"
              className={`border-2 ${
                activity === "low" ? "bg-pink-500 text-white" : "text-pink-500"
              } border-pink-500  rounded-md w-full py-4`}
              onClick={() => onClick("low")}
            >
              Low
            </button>
            <button
              type="button"
              className={`border-2 ${
                activity === "med" ? "bg-pink-500 text-white" : "text-pink-500"
              } border-pink-500  rounded-md w-full py-4`}
              onClick={() => onClick("med")}
            >
              Medium
            </button>
            <button
              type="button"
              className={`border-2 ${
                activity === "high" ? "bg-pink-500 text-white" : "text-pink-500"
              } border-pink-500  rounded-md w-full py-4`}
              onClick={() => onClick("high")}
            >
              High
            </button>
          </div>
          <button
            type="submit"
            className="mt-6 shadow-lg w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-md font-extrabold"
          >
            GO
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
