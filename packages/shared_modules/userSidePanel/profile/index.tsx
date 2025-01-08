"use client";

import { SidePanelPageProps } from "../types/sidePanel";
import SidePanelHeader from "../header";
import avatarImage from "@/assets/img/avatars/01.png";
import "react-circular-progressbar/dist/styles.css";
import style from "./SidePanelProfile.module.scss";
import Image from "next/image";
import { useState } from "react";

import ProfileForm from "./form";
import ProfileAvatars from "./avatars";
import { api } from "../../api/Api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import Loading from "../../common/loading";
import { profileValidation } from "../constants/validators/userValidator";

import { toast } from "react-toastify";
import { ProfileProgress } from "./ProfileProgress";
import { UserAvatar } from "../types/user";

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
    PROFILE_COMPONENT.FORM
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
      <Form style={{ overflowX: "hidden", overflowY: "auto" }}>
        <SidePanelHeader setPage={setPage} title="اطلاعات‌من" />
        <div className={style.sidePanelProfile}>
          <div
            className={style.formFile}
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
            <div className={style.formButton}>
              <button disabled={mutation.isPending} type="submit">
                {mutation.isPending ? <Loading size={10} /> : "ویرایش"}
              </button>
            </div>
          )}
        </div>
      </Form>
    </Formik>
  );
};

export default SidePanelProfile;
