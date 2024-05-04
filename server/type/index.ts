import { EventHandlerRequest, H3Event } from "h3";

type ResponseData = {
  success: boolean;
  message: string;
  data?: unknown;
}

export type EventExecutorResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};
