"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addCategory } from "@/lib/store/features/envelope-categories/envelopeCategoriesSlice";
import { addEnvelope } from "@/lib/store/features/envelopes/envelopes";

function Test() {
  const envelopeCategories = useAppSelector(
    (state) => state.envelopeCategories
  );
  const envelopes = useAppSelector((state) => state.envelopes);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="mb-3 space-x-4">
        <Button onClick={() => console.log(envelopeCategories)}>
          Log Categories
        </Button>
        <Button
          variant={"secondary"}
          onClick={() => dispatch(addCategory({ type: "add", payload: null }))}
        >
          Add Category
        </Button>
      </div>
      <div className="mb-5 space-x-4">
        <Button onClick={() => console.log(envelopes)}>Log Envelopes</Button>
        <Button
          variant={"secondary"}
          onClick={() => dispatch(addEnvelope({ type: "add", payload: null }))}
        >
          Add Envelope
        </Button>
      </div>
      <Badge variant="outline">
        Total Categories: {envelopeCategories.length}
      </Badge>
    </>
  );
}

export default Test;
