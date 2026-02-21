import { api } from "../../../api/Api";
import AddAddress from "../../../checkout/modal_components/addAddress";
import { ShippingAddress } from "@repo/core/types/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ModalProps } from "@repo/core/types/modals";
import { Apps } from "@repo/core/types/general";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import { useSearchParams } from "next/navigation";
import { TRACK_CHANGES } from "@repo/core/constants/queryKeys";

type Props = ModalProps<{
  initialData: Partial<ShippingAddress> | null;
  app: Apps;
}>;

export const AddAddressModal = ({
  data: { initialData, app },
  closeModal,
}: Props) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const changeSearchParams = useChangeSearchParamsFilter();

  const mutation = useMutation({
    mutationFn: (data: Partial<ShippingAddress>) => {
      return data ? api.updateAddress(data.id!, data) : api.addAddress(data!);
    },
    retry: 0,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["addressList"] });

      const currentTC = Number(searchParams?.get(TRACK_CHANGES));
      setTimeout(() => {
        if (!isNaN(currentTC)) {
          changeSearchParams({
            [TRACK_CHANGES]: (currentTC + 1).toString(),
          });
        } else {
          changeSearchParams({
            [TRACK_CHANGES]: "0",
          });
        }
      }, 100);
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
      app={app}
    />
  );
};
