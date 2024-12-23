export interface VerifyPhoneInput {
  mobile: string;
  code: string;
}

export interface User {
  name: string | null;
  mobile: string;
  field_id: number | null;
  field_title: string | null;
  grade_id: number | null;
  grade_title: string | null;
  province_id: number | null;
  province_title: string | null;
  city_id: number | null;
  city_title: string | null;
  address: string | null;
  avatar: null;
  improvement: number;
  birthday: string | null;
  postal_code: string | null;
  nickname: string | null;
  national_code: string | null;
  email: string | null;
  credit: number | null;
  coins: number | null;
  introductionCode: string | null;
}

export interface UserAvatar{
  url:string,filename:string
} 

export type AvatarList = UserAvatar[] 



export type MessageItem ={
  id: number;
  pic_url: string;
  title: string;
  summary: null | string;
  created_at: string;
  seen: 0 | 1;
}

export interface SingleMessage extends MessageItem{
body:string
}


export interface ShareToFriends{
  title: string;
  description: string;
  introduction_code: string;
  invite: string;
}

export interface LiveChatInformation{
  url:string,
  message:string
}