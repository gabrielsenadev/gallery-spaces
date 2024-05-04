import { EventHandlerRequest, H3Event } from "h3";

export type EventExecutorResponse = {
  success: boolean;
  message?: string;
  data?: unknown;
};

export type EventExecutorData = H3Event<EventHandlerRequest>;
