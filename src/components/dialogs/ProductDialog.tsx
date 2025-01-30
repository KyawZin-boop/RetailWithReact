import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/store";
import api from "@/api";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const formSchema = z.object({
  productCode: z.string().min(4, {
    message: "Product Code must be at least 4 characters.",
  }),
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  stock: z.number().min(0, {
    message: "Stock must be greater than zero number.",
  }),
  price: z.number().min(0, {
    message: "Price must be greater than zero number.",
  }),
  profitPerItem: z.number().min(0, {
    message: "Profit per item must be greater than zero number.",
  }),
});

const ProductDialog = () => {
  const isOpen = useAppSelector((state) => state.dialog.isOpen);
  const isEdit = useAppSelector((state) => state.dialog.isEdit);
  const editProduct = useAppSelector((state) => state.dialog.editProduct);

  const queryClient = useQueryClient();

  const { mutate: addProduct } = api.product.AddProduct.useMutation({
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Product added successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
    },
  });

  const { mutate: updateProduct } = api.product.UpdateProduct.useMutation({
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Product updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productCode: "",
      name: "",
      stock: 0,
      price: 0,
      profitPerItem: 0,
    },
  });

  useEffect(() => {
    if (isEdit && editProduct) {
      form.reset({
        productCode: editProduct.productCode || "",
        name: editProduct.name || "",
        stock: editProduct.stock || 0,
        price: editProduct.price || 0,
        profitPerItem: editProduct.profitPerItem || 0,
      });
    }
  }, [isEdit, editProduct, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEdit) {
      const payload = { id: editProduct?.id, ...values };
      updateProduct(payload);
    } else {
      addProduct(values);
    }
    console.log(values);
  }

  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-blue-500">
              {isEdit ? "Update " : "Add "}Product Info
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="productCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Code</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter product stock" {...field} 
                      onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profitPerItem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profit Per Item"</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDialog;
