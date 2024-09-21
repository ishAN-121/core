"use client";

import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import useWorldId from "@/hooks/use-world-id";

const formSchema = z.object({
  serviceName: z.string().min(2, {
    message: "Service name must be at least 2 characters.",
  }),
  rating: z.number().min(1).max(5),
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  review: z.string().min(20, {
    message: "Review must be at least 20 characters.",
  }),
  recommendationLevel: z.string(),
});

export default function ServiceReviewPage({ params }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [connectionURL, setConnectionURL] = useState("");
  const { checkStatus, handleSign } = useWorldId();
  const [isHuman, setIsHuman] = useState(false);
  const handleWorldId = () => {
    window.location.assign(connectionURL);
  };
  useEffect(() => {
    const connURL: any = handleSign();
    // connectionURL.then((res)=>{
    //     window.location.assign(res);
    // })
    // console.log("CONNECTION URI",connectionURL);
    connURL.then((res: any) => {
      setConnectionURL(res);
    });
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: "",
      rating: 5,
      title: "",
      review: "",
      recommendationLevel: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("SUBMITTING REVIEW");
    setIsSubmitting(true);
    // Here you would typically send the data to your backend
    console.log(values);
    setTimeout(() => {
      setIsSubmitting(false);
      form.reset();
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      });
    }, 2000);
  }
  if (isHuman) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Submit Your Service Review
            </CardTitle>
            <CardDescription>
              We appreciate your feedback. Please share your experience with the
              service you used.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="serviceName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the name of the service"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-8 h-8 cursor-pointer ${
                                star <= field.value
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                              onClick={() => form.setValue("rating", star)}
                            />
                          ))}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Click on a star to rate the service
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Summarize your experience"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="review"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Review</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share details of your experience with this service"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recommendationLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Would you recommend this service?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your recommendation level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="highly">
                            Highly Recommend
                          </SelectItem>
                          <SelectItem value="recommend">Recommend</SelectItem>
                          <SelectItem value="neutral">Neutral</SelectItem>
                          <SelectItem value="not_recommend">
                            Do Not Recommend
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Review
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="h-screen w-screen flex align-middle items-center justify-center">
      <Button onClick={handleWorldId}>Verify You are Human</Button>
    </div>
);
}
