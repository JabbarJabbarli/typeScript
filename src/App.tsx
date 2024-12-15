import React, { useState } from "react";
import { useForm } from "react-hook-form";

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [result, setResult] = useState(null);

  type Person = {
    name: string;
    age: number;
    salary: number;
    isWorking: boolean;
    isMarried: boolean;
    speciality: string;
    children: boolean;
    initialPayment: number;
  };

  const canTakeIpoteca = (
    age: number,
    isWorking: boolean,
    salary: number
  ): boolean => {
    return age > 18 && isWorking && salary > 15000;
  };

  const checkFamilyStatus = (isMarried: boolean, children: boolean): string => {
    if (isMarried && children) {
      return "First";
    }
    if (isMarried && !children) {
      return "Second";
    } else {
      return "No";
    }
  };

  const checkProfession = (speciality: string): any => {
    if (speciality === "teacher") {
      return "Extra";
    }
    return false;
  };

  const calculateIpoteca = (client: Person): void => {
    let percent: number = 10;
    let month: number = 60;
    let initialPayment = client.initialPayment;

    const { age, isWorking, salary, isMarried, speciality, children } = client;

    const canTakeIpotecaResult = canTakeIpoteca(age, isWorking, salary);
    if (canTakeIpotecaResult) {
      let output = `You can take ipoteca with these credentials:\nMonth: ${month}\nPercent: ${percent}%\nInitial Payment: ${initialPayment}\n`;

      const discountStatus = checkFamilyStatus(isMarried, children);
      if (discountStatus === "First") {
        percent -= 2;
        month += 24;
        initialPayment -= 15000;
      } else if (discountStatus === "Second") {
        percent -= 1;
        month += 12;
        initialPayment -= 5000;
      }

      const profession = checkProfession(speciality);
      if (profession === "Extra") {
        percent -= 5;
        month -= 10;
        initialPayment -= 20000;
      }

      output += `Final Ipoteca Details:\nMonth: ${month}\nPercent: ${percent}%\nInitial Payment: ${initialPayment}`;
      setResult(output); // Update the result state
    } else {
      setResult("You are not eligible for ipoteca.");
    }
  };

  const onSubmit = (data: any) => {
    const person: Person = {
      name: data.name,
      age: parseInt(data.age),
      salary: parseInt(data.salary),
      isWorking: data.isWorking === "true",
      isMarried: data.isMarried === "true",
      speciality: data.speciality,
      children: data.children === "true",
      initialPayment: parseInt(data.initialPayment),
    };

    calculateIpoteca(person);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Ipoteca Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name:</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Age:</label>
          <input
            type="number"
            {...register("age", { required: "Age is required", min: 18 })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Salary:</label>
          <input
            type="number"
            {...register("salary", { required: "Salary is required" })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Speciality:</label>
          <input
            {...register("speciality", { required: "Speciality is required" })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Initial Payment:</label>
          <input
            type="number"
            {...register("initialPayment", {
              required: "Initial Payment is required",
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Is Working:</label>
          <select
            {...register("isWorking", { required: true })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Is Married:</label>
          <select
            {...register("isMarried", { required: true })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Has Children:</label>
          <select
            {...register("children", { required: true })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Calculate Ipoteca
        </button>
      </form>
      {result && (
        <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md">
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
