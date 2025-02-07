import api from "@/api";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { zodResolver } from "@hookform/resolvers/zod";
import { format} from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TotalSaleCount } from "@/api/record/types";

const ApexChart = () => {
const [initialData,setInitialData] = useState<TotalSaleCount[]>([]);
const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const [topSeller, setTopSeller] = useState<{ count: number; name: string }>();
const [leastSeller, setLeastSeller] = useState<{ count: number; name: string }>();

  const { data: totalCount } =
    api.record.getTotalSaleCountForEachProduct.useQuery();

  const FormSchema = z.object({
    dob: z.date({
      required_error: "A date is required.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Fetch report by date using useQuery when selectedDate changes
  const { data: reportByDate } = api.record.getSaleReportByDate.useQuery(selectedDate || new Date(), {
    queryKey: ['getSaleReportByDate', selectedDate],
    enabled: !!selectedDate, // Only run the query if a date is selected
  });

  const [state, setState] = useState({
    series: [] as number[],
    options: {
      chart: {
        type: "polarArea" as const,
      },
      stroke: {
        colors: ["#fff"],
      },
      fill: {
        opacity: 0.8,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

 // Update chart data when totalCount or reportByDate changes
 useEffect(() => {
  if (selectedDate && reportByDate) {
    setInitialData(reportByDate);
  } else {
    setInitialData(totalCount!);
  }
}, [totalCount, reportByDate, selectedDate]);

// Update chart series and labels when initialData changes
useEffect(() => {
  setState((prevState) => ({
    ...prevState,
    series: initialData ? initialData.map((item) => item.saleCount) : [],
    options: {
      ...prevState.options,
      labels: initialData ? initialData.map((item) => item.productName) : [],
    },
  }));
  setTopSeller(initialData
    ?.map((item) => ({ count: item.saleCount, name: item.productName }))
    .sort((a, b) => b.count - a.count)[0]);
  setLeastSeller(initialData
    ?.map((item) => ({ count: item.saleCount, name: item.productName }))
    .sort((a, b) => b.count - a.count)[initialData.length - 1]);
}, [initialData]);

const handleReset = () => {
  setSelectedDate(null);
  form.reset({ dob: undefined });
};

const onSubmit = (data: z.infer<typeof FormSchema>) => {
  setSelectedDate(data.dob); // Set selected date when form is submitted
};

  return (
    <div>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-start items-center p-10">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal mr-3",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage  className="mr-3"/>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-lime-500 hover:bg-lime-600">Submit</Button>
          {selectedDate && (
            <Button type="button" onClick={handleReset} className="ms-3 bg-red-500 hover:bg-red-600">Reset</Button>
          )}
        </form>
      </Form>
      <div
        id="html-dist"
        className="flex justify-evenly items-center gap-10 mt-3"
      >
        <div className="font-bold">
          <span className="text-green-500">Top Seller - </span>
          <span className="text-blue-500 ">
            {topSeller && topSeller.name}({topSeller && topSeller.count}
            )
          </span>
        </div>
        <div className="font-bold">
          <span className="text-red-500">Least Seller - </span>
          <span className="text-blue-500 ">
            {leastSeller && leastSeller!.name}(
            {leastSeller && leastSeller!.count})
          </span>
        </div>
      </div>
      <div id="chart" className="mx-2">
        {initialData && initialData.length > 0 ? (
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="polarArea"
            height={"700px"}
          />
        ) : (
          <div className="h-96 flex justify-center items-center">
          <p className="text-red-500 text-2xl font-semibold">No data available for the selected date.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApexChart;
