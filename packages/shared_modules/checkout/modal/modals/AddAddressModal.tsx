import { api } from "@/api/Api";
import AddAddress from "@/components/addAddress";
import { ShippingAddress } from "@repo/core/types";
import { ModalProps } from "@/types/modals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type Props = ModalProps<{
  initialData: Partial<ShippingAddress> | null;
}>;

export const AddAddressModal = ({
  data: { initialData },
  closeModal,
}: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Partial<ShippingAddress>) => {
      return data ? api.updateAddress(data.id!, data) : api.addAddress(data!);
    },
    retry: 0,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["addressList"] });
      closeModal();
      toast("آدرس با موفقیت ذخیره شد", {
        type: "success",
        position: "top-left",
      });
    },
  });

  return (
    <AddAddress
      initialData={initialData}
      submit={mutation.mutate}
      isLoading={mutation.isPending}
    />
  );
};
