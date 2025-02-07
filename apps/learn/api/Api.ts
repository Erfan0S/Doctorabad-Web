import { Request } from "@repo/core";
import { defaultBaseUrl, isServerSide } from "@repo/core/constants";
import { toast } from "react-toastify";
import { ResponseType } from "@repo/core/types";
import {
  CourseComents,
  CourseDataType,
  CourseListItemType,
  VideoType,
} from "@/types/courses";
import { CategoryType, ProviderType, SliderType } from "@/types/homePage";

class Api extends Request {
  constructor() {
    super({
      baseUrl: defaultBaseUrl,
      isServerSide: () => isServerSide,
      showToast: toast,
    });
  }

  // single course

  getCourse(id: number): Promise<ResponseType<{ data: CourseDataType }>> {
    return this.request.get<{ data: CourseDataType }>(
      `/user/v1/education/course/${id}`
    );
  }

  createComment(data: {
    id: number;
    text: string;
    rate: number;
  }): Promise<any> {
    return this.request.post("/user/shop/comment", data);
  }

  getCommentsList(
    productID: number,
    page: number
  ): Promise<ResponseType<CourseComents>> {
    return this.request.get<CourseComents>(
      `/user/shop/comment/new/${productID}`,
      { params: { page } }
    );
  }

  getRelatedCourses(
    id: number
  ): Promise<ResponseType<{ data: CourseListItemType[] }>> {
    return this.request.get<{ data: CourseListItemType[] }>(
      `/user/v1/education/course/${id}/related`
    );
  }

  shareCourse(id: number): Promise<any> {
    return this.request.get(`/user/v1/education/course/${id}/share`);
  }

  errorReport(data: { id: number; text: string }): Promise<any> {
    return this.request.post("/user/v1/education/error/report", data);
  }

  addFavorite(id: number): Promise<any> {
    return this.request.post(`/user/v1/education/favorite`, { id });
  }

  removeFavorite(id: number): Promise<any> {
    return this.request.delete(`/user/v1/education/favorite/${id}`);
  }

  // video
  getVideo(
    courseID: number,
    lessonID: number
  ): Promise<ResponseType<VideoType>> {
    return this.request.get<VideoType>(
      `/user/v1/education/course/${courseID}/lesson/${lessonID}/video`
    );
  }

  getVideowBookmark(courseID: number): Promise<ResponseType<VideoType>> {
    return this.request.get<VideoType>(
      `/user/v1/education/course/${courseID}/pins`
    );
  }

  createVideoBookmark(
    lessonID: number,
    data: { jump_time: number; title: string; description: string }
  ): Promise<ResponseType<VideoType>> {
    return this.request.post<VideoType>(
      `/user/v1/education/lesson/${lessonID}/pins`,
      data
    );
  }

  deleteVideoBookmark(
    lessonID: number,
    id: number
  ): Promise<ResponseType<VideoType>> {
    return this.request.delete<VideoType>(
      `/user/v1/education/lesson/${lessonID}/pins/${id}`
    );
  }

  getVideoBookmarkUsage(
    lessonID: number,
    id: number
  ): Promise<ResponseType<VideoType>> {
    return this.request.get<VideoType>(
      `/user/v1/education/lesson/${lessonID}/pins/${id}`
    );
  }

  // main page
  getProviders(): Promise<ResponseType<ProviderType>> {
    return this.request.get("/user/v1/education/providers");
  }

  getCategories(): Promise<ResponseType<CategoryType>> {
    return this.request.get("/user/v1/education/categories");
  }

  getNewestCourses(): Promise<ResponseType<CourseListItemType>> {
    return this.request.get("/user/v1/education/newest");
  }

  getBestSellerCourses(): Promise<ResponseType<CourseListItemType>> {
    return this.request.get("/user/v1/education/best-seller");
  }

  getUserLastViewedCourses(): Promise<ResponseType<CourseListItemType>> {
    return this.request.get("/user/v1/education/last-viewed");
  }

  getMainSlider(): Promise<ResponseType<SliderType>> {
    return this.request.get("/user/v1/education/main-slider");
  }
}

export const api = new Api();
