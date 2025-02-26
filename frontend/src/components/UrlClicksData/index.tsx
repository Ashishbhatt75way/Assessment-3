import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useLocationClicks from "@/hooks/useLocationClicks";
import { useGetShortUrlsQuery } from "@/services/urlApi";

const chartConfig = {
  mobile: {
    label: "mobile",
    color: "hsl(var(--chart-1))",
  },
  clicks: {
    label: "clicks",
    color: "hsl(var(--chart-4))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function ClicksData() {
  const { data } = useGetShortUrlsQuery();
  if (!data) return null;
  const chartData = useLocationClicks(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Location Wise</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="clicks" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="clicks"
              layout="vertical"
              fill="var(--color-clicks)"
              radius={4}
            >
              <LabelList
                dataKey="location"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="clicks"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total clicks location wise.
        </div>
      </CardFooter>
    </Card>
  );
}
