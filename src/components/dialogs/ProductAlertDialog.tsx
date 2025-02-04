import api from "@/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store";
import { clearCart } from "@/store/features/cartSlice";
import { closeDialog } from "@/store/features/dialogSlice";
import { hideLoader, openLoader } from "@/store/features/loaderSlice";
import { useQueryClient } from "@tanstack/react-query";

const ProductAlertDialog = ({ isDelete }: { isDelete: boolean }) => {
  const cartItmes = useAppSelector((state) => state.cart.cartItems);
  const isOpen = useAppSelector((state) => state.dialog.isAlertOpen);
  const deleteProduct = useAppSelector((state) => state.dialog.deleteProduct);
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const { mutate: deleteProductFn } = api.product.DeleteProduct.useMutation({
    onMutate: () => dispatch(openLoader()),
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProductWithPagination"] });
      toast({
        title: "Product deleted successfully",
      });
      dispatch(closeDialog());
    },
    onSettled: () => dispatch(hideLoader()),
  });

  const { mutate: checkOut } = api.cart.storeCart.useMutation({
    onMutate: () => dispatch(openLoader()),
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProductWithPagination"] });
      toast({
        title: "Successfully checked out",
        description: "Thank you for shopping with us",
      });
      dispatch(clearCart())
      dispatch(closeDialog());
    },
    onSettled: () => dispatch(hideLoader()),
  });

  const handleSubmit = () => {
    if (isDelete) {
      deleteProductFn(deleteProduct!.id);
    } else {
      checkOut(cartItmes);
    }
    dispatch(closeDialog());
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.{" "}
            {isDelete
              ? "Are you sure you want to delete this product?"
              : "Are you sure you want to check out?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => dispatch(closeDialog())}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProductAlertDialog;
