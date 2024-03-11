"use client";

import { clsx } from "clsx";
import { type HTMLAttributes} from "react";
import React from "react";
import { useForm, useWatch } from "react-hook-form";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {ParamBooleanControl, ParamNumberControl} from "@/components/wrappers/ControlParams";
import { type ConfigType} from "@/components/wrappers/param_type";

import { Form, FormField } from "../ui/form";

interface ComponentWrapperWithControlProps<P extends {}>
  extends HTMLAttributes<HTMLDivElement> {
  component: (props: P) => React.ReactNode;
  params: ConfigType<P>[];

  // render: (form: UseFormReturn<P>) => React.ReactNode;
}


const paramControlDict = {
  number: ParamNumberControl,
  boolean: ParamBooleanControl
}

export function ComponentWrapperWithControl<P extends {}>(
  props: ComponentWrapperWithControlProps<P>
) {
  const { children, className, component: Component, params, ...rest } = props;
  const form = useForm<P>();
  const componentProps = useWatch({ control: form.control }) as P;

  const renderControls = (item: ConfigType<P>) => {

    return (
      <FormField
        control={form.control}
        name={item.name}
        render={({ field }) => {

          switch (item.type) {
            case "number":
              return (
                <ParamNumberControl<P> field={field} {...item} />
              )
            case "boolean":
              return (
                <ParamBooleanControl<P> field={field} {...item} />
              )
          }
        }}
      />
    )
  }


  return (
    <div className="relative overflow-hidden rounded-xl not-prose">
      <div
        className={clsx(
          className,
          "relative w-full overflow-hidden bg-foreground/5"
        )}
        {...rest}
      >
        <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center">
          <Component {...componentProps} />
        </div>
        <AspectRatio ratio={16 / 9} />
      </div>
      <Form {...form}>
        <form className="px-4 not-prose divide-y">
          {params.map((param, index) => (
            <div
              key={param.name}
              className="py-1.5 flex flex-col items-stretch justify-center min-h-[60px]"
            >
              {renderControls(param)}
            </div>
          ))}
        </form>
      </Form>
      <div className="absolute w-full h-full top-0 left-0 rounded-xl ring-1 ring-inset ring-foreground/20 pointer-events-none" />
    </div>
  );
}
