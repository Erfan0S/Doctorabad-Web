import { Request } from "@repo/core";
import { defaultBaseUrl, isServerSide } from "@repo/core/constants";
import { toast } from "react-toastify";
import { PaginatedResponse, ResponseType } from "@repo/core/types";
import {
  CourseComents,
  CourseDataType,
  CourseListItemType,
  VideoType,
} from "@/types/courses";
import { CategoryType, ProviderType, SliderType } from "@/types/homePage";
import { SortType } from "@/types/filters";

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
  getProviders(
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<ProviderType[]>>> {
    return this.request.get("/user/v1/education/provider", {
      params: { page },
    });
  }

  getCategories(
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CategoryType[]>>> {
    return this.request.get("/user/v1/education/category", {
      params: { page },
    });
  }

  getNewestCourses(
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
    return this.request.get("/user/v1/education/course/newest", {
      params: { page },
    });
  }

  getBestSellerCourses(
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
    return this.request.get("/user/v1/education/course/bestselling", {
      params: { page },
    });
  }

  getSuggestedCourses(
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
    return this.request.get("/user/v1/education/course/suggest", {
      params: { page },
    });
  }

  getUserLastViewedCourses(
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
    return this.request.get("/user/v1/education/user/last-seen", {
      params: { page },
    });
  }

  getMainSlider(): Promise<ResponseType<{ data: SliderType[] }>> {
    return this.request.get("/user/v1/education/slider?location=1");
  }

  // filyer / search

  getSearchList(
    query: string,
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
    return query
      ? this.request.get("/user/v1/education/course/search", {
          params: { q: query, page },
        })
      : this.getNewestCourses(page);
  }

  getFilterList(
    sort?: SortType,
    fields?: number[],
    grades?: number[],
    categories?: number[],
    providers?: number[],
    minPrice?: number,
    maxPrice?: number,
    language?: 1 | 2 | null,
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
    return this.request.get("/user/v1/education/course/filter", {
      params: {
        sort,
        fields,
        grades,
        categories,
        providers,
        min_price: minPrice,
        max_price: maxPrice,
        language,
        page,
      },
    });
  }
  getLessonsCount(): Promise<ResponseType<{ data: number; status: string }>> {
    return this.request.get(`/user/v1/education/lesson/count`);
  }
}

export const api = new Api();
