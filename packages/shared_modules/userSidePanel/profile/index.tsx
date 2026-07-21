"use client";

import { SidePanelPageProps } from "@repo/core/types/sidePanel";
import SidePanelHeader from "../header";
// @ts-ignore
import avatarImage from "../../assets/img/avatars/01.png";
import "react-circular-progressbar/dist/styles.css";
import Image from "next/image";
import { useState } from "react";

import ProfileForm from "./form";
import ProfileAvatars from "./avatars";
import { api } from "../../api/Api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import Loading from "../../common/components/loading";
import { profileValidation } from "@repo/core/constants/validators/userValidator";

import { toast } from "react-toastify";
import { ProfileProgress } from "./ProfileProgress";
import { UserAvatar } from "@repo/core/types/user";

export enum PROFILE_COMPONENT {
  FORM = "form",
  AVATARS = "avatars",
}

const SidePanelProfile: React.FC<SidePanelPageProps> = ({ setPage }) => {
  const profileComponent = {
    [PROFILE_COMPONENT.FORM]: ProfileForm,
    [PROFILE_COMPONENT.AVATARS]: ProfileAvatars,
  };

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: api.getUser,
    staleTime: Infinity,
  });

  const [profileStatus, setProfileStatus] = useState<PROFILE_COMPONENT>(
    PROFILE_COMPONENT.FORM,
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: api.updateUser,
    retry: 0,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast("اطلاعات شما با موفقیت ویرایش شد", {
        type: "success",
        position: "top-left",
      });
    },
  });

  const onAvatarSelect = ({ url }: UserAvatar) => {
    setProfileStatus(PROFILE_COMPONENT.FORM);
    queryClient.setQueryData(["profile"], {
      data: { data: { ...profile?.data.data, avatar: url } },
    });
  };

  const Component = profileComponent[profileStatus];

  if (isLoading) return <Loading />;

  return (
    <Formik
      validationSchema={profileValidation}
      initialValues={profile?.data.data!}
      onSubmit={mutation.mutate}
    >
      <Form className="flex h-full flex-col overflow-x-hidden overflow-y-auto">
        <SidePanelHeader setPage={setPage} title="اطلاعات‌من" />
        <div className="relative h-full min-h-[calc(100%-61px)] overflow-y-auto px-4 pb-[100px] pt-4">
          <div
            className="relative mx-auto mb-6 mt-0 h-[90px] w-[90px] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)] [&_img]:h-full [&_img]:w-full [&_img]:rounded-full [&_svg]:absolute [&_svg]:start-0 [&_svg]:top-0 [&_svg]:h-full [&_svg]:w-full [&_svg]:cursor-pointer"
            onClick={() => setProfileStatus(PROFILE_COMPONENT.AVATARS)}
          >
            <ProfileProgress userData={profile?.data.data!} />
            <Image
              width={90}
              height={90}
              src={profile?.data.data.avatar || avatarImage}
              alt="avatarImage"
            />
          </div>
          <Component onAvatarSelect={onAvatarSelect} />
          {profileStatus === PROFILE_COMPONENT.FORM && (
            <div className="fixed bottom-0 -mx-4 mb-0 mt-auto w-full sm:w-[400px]">
              <button
                className="z-10 m-0 w-full cursor-pointer border-none bg-green-base p-0 text-center text-[14px] font-medium leading-10 text-white focus:outline-none active:outline-none"
                disabled={mutation.isPending}
                type="submit"
              >
                {mutation.isPending ? (
                  <Loading size={20} haveMargin />
                ) : (
                  "ویرایش"
                )}
              </button>
            </div>
          )}
        </div>
      </Form>
    </Formik>
  );
};

export default SidePanelProfile;
