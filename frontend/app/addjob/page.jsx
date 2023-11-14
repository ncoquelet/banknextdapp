"use client";

import React, { useState } from "react";
import { abi, contractAddress } from "../../constant/Jobs";
import { Text, Textarea } from "@chakra-ui/react";
import { prepareWriteContract, writeContract } from "@wagmi/core";

export default function AddJob() {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();

  const addJob = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "addJob",
        args: [description],
        value: price,
      });
      const { hash } = await writeContract(request);
      console.log(hash);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Add Job</h1>
      <form>
        <div>
          <Text mb="8px">Description</Text>
          <Textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="The description of the job"
            size="sm"
          >
            {description}
          </Textarea>
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="button" onClick={addJob}>
          Add
        </button>
      </form>
    </div>
  );
}
